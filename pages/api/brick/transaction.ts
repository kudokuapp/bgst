import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import { decodeAuthHeader } from '$utils/auth';
import { brickUrl } from '$utils/brick';
import axios from 'axios';

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Check if HTTP POST and have a bearer token
  if (req.method !== 'GET' || !req.headers.authorization) {
    res.status(500).json({ Error: 'Method not allowed' });
    throw new Error('Method not allowed');
  }

  // Decode the bearer token and get the whatsapp
  const { whatsapp } = decodeAuthHeader(req.headers.authorization);

  if (!whatsapp) {
    res.status(500).json({ Error: 'Not allowed to do this operation' });
    throw new Error('Not allowed to do this operation');
  }

  const user = await prisma.user.findFirst({ where: { whatsapp } });

  if (!user) {
    res.status(500).json({ Error: 'Cannot find user' });
    throw new Error('Cannot find user');
  }

  // REQUIRED BODY DATA
  const {
    institutionId,
    from,
    to,
  }: { institutionId: number; from: string | Date; to: string | Date } =
    req.body;

  const data = await prisma.account.findFirst({
    where: { institutionId, kudosId: user.id },
  });

  if (!data) {
    res.status(500).json({ Error: "Cannot find user's accout" });
    throw new Error("Cannot find user's accout");
  }

  const { accessToken, id: accountId } = data;

  const url = brickUrl(`/v1/transaction/list`);

  const options = {
    method: 'GET',
    url: url.href,
    params: { from, to },
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
  };

  const {
    data: { data: transactionData },
  }: { data: { data: BrickTransactionData[] } } = await axios.request(options);

  if (!transactionData) {
    res.status(500).json({ Error: 'Error dari brick' });
    throw new Error('Error dari brick');
  }

  transactionData.forEach(async (value) => {
    const { category } = value;
    try {
      await prisma.transaction.create({
        data: {
          dateTimestamp: new Date(value.dateTimestamp),
          brick_id: value.id,
          brick_account_id: value.account_id,
          account_number: value.account_number,
          account_currency: value.account_currency,
          institution_id: value.institution_id,
          merchant_id: value.merchant_id,
          outlet_outlet_id: value.outlet_outlet_id,
          location_city_id: value.location_city_id,
          location_country_id: value.location_country_id,
          date: new Date(value.date),
          amount: value.amount,
          description: value.description,
          status: value.status,
          direction: value.direction,
          reference_id: value.reference_id,
          transaction_type: value.transaction_type,
          category_id: category.category_id,
          category_name: category.category_name,
          classification_group_id: category.classification_group_id,
          classification_group: category.classification_group,
          classification_subgroup_id: category.classification_subgroup_id,
          classification_subgroup: category.classification_subgroup,
          accountId,
        },
      });
      res.status(200).json({
        status: 200,
        message: 'Successfully call Brick and push to database',
      });
    } catch (e: any) {
      res.status(500).json(e);
      throw new Error(e);
    }
  });
}
