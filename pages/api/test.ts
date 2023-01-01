import type { NextApiRequest, NextApiResponse } from 'next';
import moment from 'moment';
import axios from 'axios';
import * as jwt from 'jsonwebtoken';
import { AuthTokenPayload } from '$utils/auth';
import { PrismaClient, Transaction } from '@prisma/client';
import _, { Dictionary } from 'lodash';
import { shortMonth, year } from '$utils/helper/dateArray';
import { TransactionToneDown } from '$lib/Metrics/BarangPalingMahal';
import { IData } from '$lib/Metrics/Heatmap';

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const params = { month: '12', year: '1' };
  const monthBPM = Number(params.month);
  const yearBPM = year[Number(params.year) - 1];

  const startDateMoment = moment([yearBPM, monthBPM - 1]).format('YYYY-MM-DD');

  const endDateMoment = moment(startDateMoment)
    .endOf('month')
    .format('YYYY-MM-DD');

  const endDate = new Date(endDateMoment);

  const howManyDays = new Array(endDate.getDate()).fill(0);

  const test = [
    { year: '2022', month: '12', date: '08', count: 1 },
    { year: '2022', month: '12', date: '10', count: 2 },
    { year: '2022', month: '12', date: '12', count: 3 },
    { year: '2022', month: '12', date: '15', count: 8 },
    { year: '2022', month: '12', date: '16', count: 4 },
    { year: '2022', month: '12', date: '17', count: 1 },
    { year: '2022', month: '12', date: '18', count: 1 },
    { year: '2022', month: '12', date: '19', count: 3 },
    { year: '2022', month: '12', date: '21', count: 1 },
    { year: '2022', month: '12', date: '25', count: 1 },
    { year: '2022', month: '12', date: '26', count: 2 },
    { year: '2022', month: '12', date: '29', count: 1 },
  ];

  test.forEach((value) => {
    const id = Number(value.date) - 1;
    howManyDays[id] = value.count;
  });

  res.status(200).json(howManyDays);
}
