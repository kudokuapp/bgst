import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '$utils/prisma';
import axios, { AxiosError } from 'axios';
import moment from 'moment';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    res.status(500).json({ Error: 'Method not allowed' });
    throw new Error('method not allowed');
  }

  const { secret } = req.body;

  const isValid = secret === process.env.UPDATE_SECRET;

  if (!secret || !isValid) {
    res.status(500).json({ Error: 'Invalid token' });
    throw new Error('Invalid token');
  }

  console.log('Starting checking if accesstoken is expired or not operation');

  const allAccount = await prisma.account.findMany({
    where: { expired: false },
  });

  console.log('Successfully retrieve all account with expired=false');

  console.log('Now checking if the accesstoken is expired or not...');

  for (const account of allAccount) {
    await getAccountDetail(account.accessToken).catch(async (e) => {
      const error = e as AxiosError;

      if (error.response?.status === 401) {
        await prisma.account.update({
          where: { id: account.id },
          data: { expired: true },
        });

        console.log(`accoundId:${account.id} is expired`);
      }
    });
  }

  console.log('Successfully updating accesstoken expiry');

  const accounts = await prisma.account.findMany({
    where: {
      expired: false,
      createdAt: { lt: new Date(moment().startOf('M').format('YYYY-MM-DD')) },
    },
    orderBy: { id: 'asc' },
  });

  console.log(
    `Successfuly retrieve all accounts with un-expired accesstoken and created date is not in ${moment().format(
      'MMMM YYYY'
    )}`
  );

  for (const account of accounts) {
    const str = institutionIdToString(account.institutionId);

    if (str === 'BCA') {
      const transactions = await updateTransaction({
        accessToken: account.accessToken,
      });

      for (const transaction of transactions) {
        const category = renderNull(transaction.category);
        await prisma.bCATransaction.create({
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
            category_id: category ? transaction.category.category_id : null,
            category_name: category ? transaction.category.category_name : null,
            classification_group_id: category
              ? transaction.category.classification_group_id
              : null,
            classification_group: category
              ? transaction.category.classification_group
              : null,
            classification_subgroup_id: category
              ? transaction.category.classification_subgroup_id
              : null,
            classification_subgroup: category
              ? transaction.category.classification_subgroup
              : null,
            accountId: account.id,
          },
        });
      }
    } else if (str === 'BNI') {
      const transactions = await updateTransaction({
        accessToken: account.accessToken,
      });

      for (const transaction of transactions) {
        const category = renderNull(transaction.category);
        await prisma.bNITransaction.create({
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
            category_id: category ? transaction.category.category_id : null,
            category_name: category ? transaction.category.category_name : null,
            classification_group_id: category
              ? transaction.category.classification_group_id
              : null,
            classification_group: category
              ? transaction.category.classification_group
              : null,
            classification_subgroup_id: category
              ? transaction.category.classification_subgroup_id
              : null,
            classification_subgroup: category
              ? transaction.category.classification_subgroup
              : null,
            accountId: account.id,
          },
        });
      }
    } else if (str === 'BRI') {
      const transactions = await updateTransaction({
        accessToken: account.accessToken,
      });

      for (const transaction of transactions) {
        const category = renderNull(transaction.category);
        await prisma.bRITransaction.create({
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
            category_id: category ? transaction.category.category_id : null,
            category_name: category ? transaction.category.category_name : null,
            classification_group_id: category
              ? transaction.category.classification_group_id
              : null,
            classification_group: category
              ? transaction.category.classification_group
              : null,
            classification_subgroup_id: category
              ? transaction.category.classification_subgroup_id
              : null,
            classification_subgroup: category
              ? transaction.category.classification_subgroup
              : null,
            accountId: account.id,
          },
        });
      }
    } else if (str === 'BSI') {
      const transactions = await updateTransaction({
        accessToken: account.accessToken,
      });

      for (const transaction of transactions) {
        const category = renderNull(transaction.category);
        await prisma.bSITransaction.create({
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
            category_id: category ? transaction.category.category_id : null,
            category_name: category ? transaction.category.category_name : null,
            classification_group_id: category
              ? transaction.category.classification_group_id
              : null,
            classification_group: category
              ? transaction.category.classification_group
              : null,
            classification_subgroup_id: category
              ? transaction.category.classification_subgroup_id
              : null,
            classification_subgroup: category
              ? transaction.category.classification_subgroup
              : null,
            accountId: account.id,
          },
        });
      }
    } else if (str === 'Mandiri') {
      const transactions = await updateTransaction({
        accessToken: account.accessToken,
      });

      for (const transaction of transactions) {
        const category = renderNull(transaction.category);
        await prisma.mandiriTransaction.create({
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
            category_id: category ? transaction.category.category_id : null,
            category_name: category ? transaction.category.category_name : null,
            classification_group_id: category
              ? transaction.category.classification_group_id
              : null,
            classification_group: category
              ? transaction.category.classification_group
              : null,
            classification_subgroup_id: category
              ? transaction.category.classification_subgroup_id
              : null,
            classification_subgroup: category
              ? transaction.category.classification_subgroup
              : null,
            accountId: account.id,
          },
        });
      }
    } else if (str === 'Gopay') {
      const transactions = await updateTransaction({
        accessToken: account.accessToken,
      });

      for (const transaction of transactions) {
        const category = renderNull(transaction.category);
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
            category_id: category ? transaction.category.category_id : null,
            category_name: category ? transaction.category.category_name : null,
            classification_group_id: category
              ? transaction.category.classification_group_id
              : null,
            classification_group: category
              ? transaction.category.classification_group
              : null,
            classification_subgroup_id: category
              ? transaction.category.classification_subgroup_id
              : null,
            classification_subgroup: category
              ? transaction.category.classification_subgroup
              : null,
            accountId: account.id,
          },
        });
      }
    } else if (str === 'OVO') {
      const transactions = await updateTransaction({
        accessToken: account.accessToken,
      });

      for (const transaction of transactions) {
        const category = renderNull(transaction.category);
        await prisma.oVOTransaction.create({
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
            category_id: category ? transaction.category.category_id : null,
            category_name: category ? transaction.category.category_name : null,
            classification_group_id: category
              ? transaction.category.classification_group_id
              : null,
            classification_group: category
              ? transaction.category.classification_group
              : null,
            classification_subgroup_id: category
              ? transaction.category.classification_subgroup_id
              : null,
            classification_subgroup: category
              ? transaction.category.classification_subgroup
              : null,
            accountId: account.id,
          },
        });
      }
    } else if (str === 'Shopee Pay') {
      const transactions = await updateTransaction({
        accessToken: account.accessToken,
      });

      for (const transaction of transactions) {
        const category = renderNull(transaction.category);
        await prisma.shopeePayTransaction.create({
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
            category_id: category ? transaction.category.category_id : null,
            category_name: category ? transaction.category.category_name : null,
            classification_group_id: category
              ? transaction.category.classification_group_id
              : null,
            classification_group: category
              ? transaction.category.classification_group
              : null,
            classification_subgroup_id: category
              ? transaction.category.classification_subgroup_id
              : null,
            classification_subgroup: category
              ? transaction.category.classification_subgroup
              : null,
            accountId: account.id,
          },
        });
      }
    }

    console.log(
      `successfully retrieve brick and create transaction for accountId:${account.id}`
    );
  }

  console.log('Operation complete');

  res.status(200).json({ Success: 'Sukses' });
}

async function updateTransaction({
  accessToken,
}: {
  accessToken: string;
}): Promise<any[]> {
  const from = moment().subtract(1, 'M').startOf('M').format('YYYY-MM-DD');

  const to = moment().subtract(1, 'M').endOf('M').format('YYYY-MM-DD');

  const url = new URL('/v1/transaction/list', 'https://api.onebrick.io');

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

  return new Promise(async (resolve, reject) => {
    try {
      const {
        data: { data },
      }: { data: { data: any } } = await axios.request(options);

      resolve(data);
    } catch (e) {
      reject(e);
    }
  });
}

const renderNull = (value: BrickTransactionData['category']) => {
  if (value === null) {
    return false;
  } else {
    return true;
  }
};

/**
 * Summary. Convert brick institutionId to a readable string.
 * Example. "11" or 11 to "Gopay"
 * @returns {string} readable string.
 */
export function institutionIdToString(institutionId: number) {
  switch (institutionId) {
    case 2:
      return 'BCA';

    case 3:
      return 'Mandiri';

    case 4:
      return 'BNI';

    case 5:
      return 'BRI';

    case 11:
      return 'Gopay';

    case 12:
      return 'OVO';

    case 16:
      return 'BRI';

    case 17:
      return 'Mandiri';

    case 26:
      return 'BSI';

    case 33:
      return 'Shopee Pay';

    case 34:
      return 'BSI';

    case 37:
      return 'BCA';

    case 38:
      return 'BCA';

    default:
      return 'BCA';
  }
}

export async function getAccountDetail(accessToken: string) {
  const url = new URL('/v1/account/list', 'https://api.onebrick.io');

  const options = {
    method: 'GET',
    url: url.href,
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
  };

  return new Promise((resolve, reject) => {
    (async () => {
      try {
        const {
          data: { data },
        }: { data: { data: any } } = await axios.request(options);

        resolve(data);
      } catch (e) {
        reject(e);
      }
    })();
  });
}
