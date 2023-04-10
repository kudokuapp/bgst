import type { NextApiRequest, NextApiResponse } from 'next';
import { decodeAuthHeader } from '$utils/auth';
import prisma from '$utils/prisma';
import { GopayTransaction } from '@prisma/client';
import _ from 'lodash';
import { findBrickTransactionIndex } from '$utils/brick';

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
  const {
    transactions,
    latestTransaction,
  }: {
    transactions: ExtendedBrickTransactionData[];
    latestTransaction: GopayTransaction;
  } = req.body;

  if (!transactions || !latestTransaction) {
    res.status(500).json({ Error: 'Data is required or invalid' });
    throw new Error('Data is required or invalid');
  }

  const transactionData = _.sortBy(transactions, ['date', 'reference_id']);

  const index = findBrickTransactionIndex(
    latestTransaction.reference_id ?? '',
    transactionData
  );

  const newTransaction = transactionData.splice(
    index + 1,
    transactionData.length
  );

  for (let i = 0; i < newTransaction.length; i++) {
    const transaction = newTransaction[i];

    const { category } = transaction;

    try {
      await prisma.gopayTransaction.create({
        data: {
          dateTimestamp: transaction.dateTimestamp
            ? new Date(transaction.dateTimestamp)
            : null,
          brick_id: transaction.id ?? null,
          brick_account_id: transaction.account_id ?? null,
          account_number: transaction.account_number ?? null,
          account_currency: transaction.account_currency ?? null,
          institution_id: transaction.institution_id ?? null,
          merchant_id: transaction.merchant_id ?? null,
          outlet_outlet_id: transaction.outlet_outlet_id ?? null,
          location_city_id: transaction.location_city_id ?? null,
          location_country_id: transaction.location_country_id ?? null,
          date: transaction.date ? new Date(transaction.date) : null,
          amount: transaction.amount ?? null,
          description: transaction.description ?? null,
          status: transaction.status ?? null,
          direction: transaction.direction ?? null,
          reference_id: transaction.reference_id ?? null,
          transaction_type: transaction.transaction_type ?? null,
          category_id: category ? category.category_id : null,
          category_name: category ? category.category_name : null,
          classification_group_id: category
            ? category.classification_group_id
            : null,
          classification_group: category ? category.classification_group : null,
          classification_subgroup_id: category
            ? category.classification_subgroup_id
            : null,
          classification_subgroup: category
            ? category.classification_subgroup
            : null,
          accountId: transaction.accountId,
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
