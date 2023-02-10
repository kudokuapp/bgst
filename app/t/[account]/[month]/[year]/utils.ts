import {
  Account,
  BCATransaction,
  BNITransaction,
  BRITransaction,
  BSITransaction,
  GopayTransaction,
  MandiriTransaction,
  OVOTransaction,
  PrismaClient,
  ShopeePayTransaction,
  User,
} from '@prisma/client';
import moment from 'moment';

const prisma = new PrismaClient();

export async function getTransaction(
  account: Account,
  params: { account: string; month: string; year: string }
) {
  const range = getRange({ params });

  let unfiltered:
    | BCATransaction[]
    | BNITransaction[]
    | BRITransaction[]
    | BSITransaction[]
    | MandiriTransaction[]
    | GopayTransaction[]
    | OVOTransaction[]
    | ShopeePayTransaction[];

  switch (params.account) {
    case 'bca':
      unfiltered = await prisma.bCATransaction.findMany({
        where: {
          accountId: account.id,
          date: { lte: range.lte, gte: range.gte },
        },
      });
      break;

    case 'bni':
      unfiltered = await prisma.bNITransaction.findMany({
        where: {
          accountId: account.id,
          date: { lte: range.lte, gte: range.gte },
        },
      });
      break;

    case 'bsi':
      unfiltered = await prisma.bSITransaction.findMany({
        where: {
          accountId: account.id,
          date: { lte: range.lte, gte: range.gte },
        },
      });
      break;

    case 'bri':
      unfiltered = await prisma.bRITransaction.findMany({
        where: {
          accountId: account.id,
          date: { lte: range.lte, gte: range.gte },
        },
      });
      break;

    case 'mandiri':
      unfiltered = await prisma.mandiriTransaction.findMany({
        where: {
          accountId: account.id,
          date: { lte: range.lte, gte: range.gte },
        },
      });
      break;

    case 'gopay':
      unfiltered = await prisma.gopayTransaction.findMany({
        where: {
          accountId: account.id,
          date: { lte: range.lte, gte: range.gte },
        },
      });
      break;

    case 'ovo':
      unfiltered = await prisma.oVOTransaction.findMany({
        where: {
          accountId: account.id,
          date: { lte: range.lte, gte: range.gte },
        },
      });
      break;

    case 'shopeepay':
      unfiltered = await prisma.shopeePayTransaction.findMany({
        where: {
          accountId: account.id,
          date: { lte: range.lte, gte: range.gte },
        },
      });
      break;

    default:
      unfiltered = [];
      break;
  }

  const response = unfiltered.map((value) => {
    return {
      id: value.id,
      dateTimestamp: value.dateTimestamp,
      brick_id: value.brick_id,
      brick_account_id: value.brick_account_id,
      account_number: value.account_number,
      account_currency: value.account_currency,
      institution_id: value.institution_id,
      merchant_id: value.merchant_id,
      outlet_outlet_id: value.outlet_outlet_id,
      location_city_id: value.location_city_id,
      location_country_id: value.location_country_id,
      date: value.date,
      amount: Number(value.amount),
      description: value.description,
      status: value.status,
      direction: value.direction,
      reference_id: value.reference_id,
      transaction_type: value.transaction_type,
      category_id: value.category_id,
      category_name: value.category_name,
      classification_group_id: value.classification_group_id,
      classification_group: value.classification_group,
      classification_subgroup_id: value.classification_subgroup_id,
      classification_subgroup: value.classification_subgroup,
      accountId: value.accountId,
    };
  });

  if (unfiltered.length === 0) {
    return null;
  } else {
    return response;
  }
}

function getRange({
  params,
}: {
  params: { account: string; month: string; year: string };
}) {
  let date: Date;

  switch (params.year) {
    case '1':
      date = new Date(`2022-${params.month}-01`);
      break;

    case '2':
      date = new Date(`2023-${params.month}-01`);
      break;

    default:
      date = new Date(`2022-${params.month}-01`);
      break;
  }

  const lte = moment(date).endOf('M').format('YYYY-MM-DD');

  const gte = moment(date).startOf('M').format('YYYY-MM-DD');

  return {
    lte: new Date(lte),
    gte: new Date(gte),
  };
}

export async function getAccountFromParams(
  account: string,
  user: User
): Promise<Account | null | undefined> {
  switch (account) {
    case 'bca':
      return await prisma.account.findFirst({
        where: {
          OR: [
            { institutionId: 2 },
            { institutionId: 37 },
            { institutionId: 38 },
          ],
          kudosId: user.id,
        },
      });

    case 'mandiri':
      return await prisma.account.findFirst({
        where: {
          OR: [{ institutionId: 3 }, { institutionId: 17 }],
          kudosId: user.id,
        },
      });

    case 'bni':
      return await prisma.account.findFirst({
        where: {
          kudosId: user.id,
          institutionId: 4,
        },
      });

    case 'bsi':
      return await prisma.account.findFirst({
        where: {
          OR: [{ institutionId: 26 }, { institutionId: 34 }],
          kudosId: user.id,
        },
      });

    case 'bri':
      return await prisma.account.findFirst({
        where: {
          OR: [{ institutionId: 5 }, { institutionId: 16 }],
          kudosId: user.id,
        },
      });

    case 'gopay':
      return await prisma.account.findFirst({
        where: {
          kudosId: user.id,
          institutionId: 11,
        },
      });

    case 'ovo':
      return await prisma.account.findFirst({
        where: {
          kudosId: user.id,
          institutionId: 12,
        },
      });

    case 'shopeepay':
      return await prisma.account.findFirst({
        where: {
          kudosId: user.id,
          institutionId: 33,
        },
      });

    default:
      return null;
  }
}
