import { ButtonLanjut, LottieSuccess } from './client';
import { cookies } from 'next/headers';
import * as jwt from 'jsonwebtoken';
import { AuthTokenPayload } from '$utils/auth';
import { PrismaClient } from '@prisma/client';
import { redirect } from 'next/navigation';
import Link from 'next/link';

const prisma = new PrismaClient();

export default async function Page() {
  const nextCookies = cookies();
  const token = nextCookies.get('token');

  let isBca: boolean = false,
    isMandiri: boolean = false,
    isBni: boolean = false,
    isBsi: boolean = false,
    isGopay: boolean = false,
    isOvo: boolean = false,
    isDana: boolean = false,
    isShopeePay: boolean = false,
    responseArr: any[] = [];

  if (!token) redirect('/');

  const { whatsapp } = jwt.verify(
    token.value,
    process.env.APP_SECRET as string
  ) as AuthTokenPayload;

  const user = await prisma.user.findFirst({ where: { whatsapp } });

  if (!user) redirect('/');

  const { id: kudosId } = user;

  const response = await prisma.account.findMany({ where: { kudosId } });

  for (let i = 0; i < response.length; i++) {
    const value = response[i];

    const transaction = await prisma.transaction.findFirst({
      where: { accountId: value.id },
    });

    if (!transaction) {
      responseArr.push(value.institutionId);
    }

    if (
      value.institutionId === 2 ||
      value.institutionId === 37 ||
      value.institutionId === 38
    ) {
      isBca = true;
    }

    if (value.institutionId === 3 || value.institutionId === 17) {
      isMandiri = true;
    }

    if (value.institutionId === 4) {
      isBni = true;
    }

    if (value.institutionId === 26 || value.institutionId === 34) {
      isBsi = true;
    }

    if (value.institutionId === 11) {
      isGopay = true;
    }

    if (value.institutionId === 12) {
      isOvo = true;
    }

    if (value.institutionId === 46) {
      isDana = true;
    }

    if (value.institutionId === 33) {
      isShopeePay = true;
    }
  }

  const disabled =
    isBca &&
    isMandiri &&
    isBni &&
    isBsi &&
    isGopay &&
    isOvo &&
    isDana &&
    isShopeePay;

  return (
    <section className="flex flex-col items-center justify-center">
      <LottieSuccess />

      <div className="w-full h-fit flex flex-col gap-4 mt-10">
        <Link href="/account/connect" className="w-full h-fit">
          <button
            className={`text-onPrimary dark:text-onPrimaryDark text-lg rounded-md py-1.5 shadow-lg w-full h-fit font-medium ${
              disabled
                ? 'bg-gray-600 dark:bg-gray-300 cursor-not-allowed'
                : 'bg-primary dark:bg-primaryDark cursor-pointer'
            }`}
            disabled={disabled}
          >
            Connect akun lain
          </button>
        </Link>

        <ButtonLanjut response={responseArr} token={token.value} />
      </div>
    </section>
  );
}
