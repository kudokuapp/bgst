import type { NextApiRequest, NextApiResponse } from 'next';
import {
  brickUrl,
  brickPublicAccessToken,
  getAccountDetail,
} from '$utils/brick';
import axios from 'axios';
import { decodeAuthHeader } from '$utils/auth';
import { PrismaClient } from '@prisma/client';
import moment from 'moment';

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Check if HTTP POST and have a bearer token
  if (req.method !== 'POST' || !req.headers.authorization) {
    res.status(500).json({ Error: 'Method not allowed' });
    throw new Error('Method not allowed');
  }

  // Decode the bearer token and get the whatsapp
  const { whatsapp } = decodeAuthHeader(req.headers.authorization);

  if (!whatsapp) {
    res.status(500).json({ Error: 'Not allowed to do this operation' });
    throw new Error('Not allowed to do this operation');
  }

  //   Find the user in our database
  const user = await prisma.user.findFirst({ where: { whatsapp } });

  if (!user) {
    res.status(500).json({ Error: 'Cannot find user' });
    throw new Error('Cannot find user');
  }

  // REQUIRED BODY DATA
  const {
    username,
    refId,
    deviceId,
    otpNumber,
    pin,
    redirectRefId,
    clientId,
  }: {
    username: string;
    refId: string;
    deviceId: string;
    otpNumber: string;
    pin: string;
    redirectRefId: string;
    clientId: number;
  } = req.body;

  if (
    !username ||
    !refId ||
    !deviceId ||
    !otpNumber ||
    !pin ||
    !redirectRefId ||
    !clientId
  ) {
    res.status(500).json({ Error: 'Data invalid' });
    throw new Error('Data invalid');
  }

  /**
   * Get access token
   */

  const tokenUrl = brickUrl(`/v1/auth/ovo/${clientId}`);

  const tokenOptions = {
    method: 'POST',
    url: tokenUrl.href,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${brickPublicAccessToken}`,
    },
    data: {
      username,
      refId,
      deviceId,
      otpNumber,
      pin,
      redirectRefId,
      clientId,
    },
  };

  const {
    data: { data: tokenData },
  }: { data: { data: BrickTokenData } } = await axios
    .request(tokenOptions)
    .catch((e) => {
      console.error(e);
      res.status(500).json(e);
      throw new Error('Error dari brick, see console');
    });

  const { accessToken } = tokenData;

  /**
   * Get account detail
   */

  const accountDetailArr = await getAccountDetail(accessToken).catch((e) => {
    console.error(e);
    res.status(500).json(e);
    throw new Error('Error dari brick, see console');
  });

  let accountDetail: BrickAccountDetail | undefined | null;

  accountDetailArr.forEach((value, index) => {
    if (value.type === 'Wallet') {
      accountDetail = accountDetailArr[index];
    }
  });

  const accountNumber =
    accountDetail!.accountNumber ?? accountDetailArr[0].accountNumber;
  const accountId = accountDetail!.accountId ?? accountDetailArr[0].accountId;

  /**
   * Avoid duplication in the account
   */

  const searchAccount = await prisma.account.findFirst({
    where: { AND: [{ kudosId: user.id }, { accountNumber }] },
  });

  if (searchAccount) {
    res.status(500).json({ Error: 'Account already exist' });
    throw new Error('Account already exist');
  }

  const account = await prisma.account.create({
    data: {
      createdAt: new Date(),
      institutionId: 12,
      accessToken,
      kudosId: user.id,
      brick_account_id: accountId,
      accountNumber,
    },
  });

  /**
   * Get the initial transaction and push it to our database
   * For OVO, the maximum is 6 months,
   * so we pull 5 months back
   */

  const transactionUrl = brickUrl(`/v1/transaction/list`);

  const from = moment().subtract(5, 'M').startOf('M').format('YYYY-MM-DD');

  const to = moment().subtract(1, 'M').endOf('M').format('YYYY-MM-DD');

  const transactionOptions = {
    method: 'GET',
    url: transactionUrl.href,
    params: { from, to },
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${account.accessToken}`,
    },
  };

  const {
    data: { data: transactionData },
  }: { data: { data: BrickTransactionData[] } } = await axios
    .request(transactionOptions)
    .catch((e) => {
      console.error(e);
      res.status(500).json(e);
      throw new Error('Error dari brick, see console');
    });

  const renderNull = (value: BrickTransactionData['category']) => {
    if (value === null) {
      return false;
    } else {
      return true;
    }
  };

  for (let i = 0; i < transactionData.length; i++) {
    const value = transactionData[i];

    const category = renderNull(value.category);

    try {
      await prisma.oVOTransaction.create({
        data: {
          dateTimestamp: value.dateTimestamp
            ? new Date(value.dateTimestamp)
            : null,
          brick_id: value.id ?? null,
          brick_account_id: value.account_id ?? null,
          account_number: value.account_number ?? null,
          account_currency: value.account_currency ?? null,
          institution_id: value.institution_id ?? null,
          merchant_id: value.merchant_id ?? null,
          outlet_outlet_id: value.outlet_outlet_id ?? null,
          location_city_id: value.location_city_id ?? null,
          location_country_id: value.location_country_id ?? null,
          date: value.date ? new Date(value.date) : null,
          amount: value.amount ?? null,
          description: value.description ?? null,
          status: value.status ?? null,
          direction: value.direction ?? null,
          reference_id: value.reference_id ?? null,
          transaction_type: value.transaction_type ?? null,
          category_id: category ? value.category.category_id : null,
          category_name: category ? value.category.category_name : null,
          classification_group_id: category
            ? value.category.classification_group_id
            : null,
          classification_group: category
            ? value.category.classification_group
            : null,
          classification_subgroup_id: category
            ? value.category.classification_subgroup_id
            : null,
          classification_subgroup: category
            ? value.category.classification_subgroup
            : null,
          accountId: account.id,
        },
      });
    } catch (e: any) {
      res.status(500).json(e);
      throw new Error(e);
    }
  }

  if (!user.hasAccount) {
    await prisma.user.update({
      where: { id: user.id },
      data: { hasAccount: true },
    });
  }

  res.status(200).json({
    status: 200,
    message: 'Successfully call Brick and push to database',
  });
}
