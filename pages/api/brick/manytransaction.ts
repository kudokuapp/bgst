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

  const user = await prisma.user.findFirst({ where: { whatsapp } });

  if (!user) {
    res.status(500).json({ Error: 'Cannot find user' });
    throw new Error('Cannot find user');
  }

  // REQUIRED BODY DATA
  const { from, to }: { from: string; to: string } = req.body;

  const data = await prisma.account.findMany({
    where: { kudosId: user.id },
  });

  if (!data) {
    res.status(500).json({ Error: "Cannot find user's accout" });
    throw new Error("Cannot find user's accout");
  }

  const url = brickUrl(`/v1/transaction/list`);

  const renderNull = (value: BrickTransactionData['category']) => {
    if (value === null) {
      return false;
    } else {
      return true;
    }
  };

  for (let i = 0; i < data.length; i++) {
    const accountBank = data[i];

    const options = {
      method: 'GET',
      url: url.href,
      params: { from, to },
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accountBank.accessToken}`,
      },
    };

    const {
      data: { data: transactionData },
    }: { data: { data: BrickTransactionData[] } } = await axios.request(
      options
    );

    if (!transactionData) {
      res.status(500).json({ Error: 'Error dari brick' });
      throw new Error('Error dari brick');
    }

    for (let i = 0; i < transactionData.length; i++) {
      const value = transactionData[i];

      const category = renderNull(value.category);

      try {
        await prisma.transaction.create({
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
            accountId: accountBank.id,
          },
        });
      } catch (e: any) {
        res.status(500).json(e);
        throw new Error(e);
      }
    }
  }

  res.status(200).json({
    status: 200,
    message: 'Successfully call Brick and push to database',
  });
}
