import type { NextApiRequest, NextApiResponse } from 'next';
import { decodeAuthHeader } from '$utils/auth';
import { brickUrl, findBrickTransactionIndex } from '$utils/brick';
import axios from 'axios';
import moment from 'moment';
import prisma from '$utils/prisma';
import _ from 'lodash';

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
  const { email } = decodeAuthHeader(req.headers.authorization);

  if (!email) {
    res.status(500).json({ Error: 'Not allowed to do this operation' });
    throw new Error('Not allowed to do this operation');
  }

  // REQUIRED BODY DATA
  const { accessToken, accountId }: { accessToken: string; accountId: number } =
    req.body;

  if (!accessToken || !accountId) {
    res.status(500).json({ Error: 'Data is required or invalid' });
    throw new Error('Data is required or invalid');
  }

  const account = await prisma.account.findFirst({ where: { id: accountId } });

  if (!account) {
    res.status(500).json({ Error: 'Cannot find the account' });
    throw new Error('Cannot find the account');
  }

  //Ganti disini
  const debitTransaction = await prisma.bNITransaction.findMany({
    where: { accountId: account.id },
    orderBy: [{ date: 'desc' }, { reference_id: 'desc' }],
  });

  const { date, reference_id } = debitTransaction[0];

  if (!date || !reference_id) throw new Error('date or reference id is null');

  const today = moment();
  const latestTransaction = moment(date);

  const diff = today.diff(latestTransaction, 'month');

  let from: string;

  // Ganti disini
  if (diff >= 6) {
    from = moment().subtract(5, 'M').startOf('M').format('YYYY-MM-DD');
  } else {
    from = latestTransaction.add(1, 'M').startOf('M').format('YYYY-MM-DD');
  }

  const to = moment().subtract(1, 'M').endOf('M').format('YYYY-MM-DD');

  const transactionUrl = brickUrl(`/v1/transaction/list`);

  const transactionOptions = {
    method: 'GET',
    url: transactionUrl.href,
    params: { from, to },
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
  };

  const {
    data: { data },
  }: { data: { data: BrickTransactionData[] } } = await axios
    .request(transactionOptions)
    .catch((e) => {
      console.error(e);
      res.status(500).json(e);
      throw new Error('Error dari brick, see console');
    });

  const transactionData = _.sortBy(data, ['date', 'reference_id']);

  const index = findBrickTransactionIndex(reference_id, transactionData);

  const newTransaction = transactionData.splice(
    index + 1,
    transactionData.length
  );

  const renderNull = (value: BrickTransactionData['category']) => {
    if (value === null) {
      return false;
    } else {
      return true;
    }
  };

  for (let i = 0; i < newTransaction.length; i++) {
    const value = newTransaction[i];

    const category = renderNull(value.category);

    try {
      //Ganti disini
      await prisma.bNITransaction.create({
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
          accountId,
        },
      });
    } catch (e: any) {
      res.status(500).json(e);
      throw new Error(e);
    }
  }

  res.status(200).json({
    status: 200,
    message: 'Successfully call Brick and push to database',
  });
}
