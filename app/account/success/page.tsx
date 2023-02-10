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
    isBri: boolean = false,
    isGopay: boolean = false,
    isOvo: boolean = false,
    isShopeePay: boolean = false;

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
    const { institutionId } = response[i];

    if (institutionId === 2 || institutionId === 37 || institutionId === 38) {
      isBca = true;
    }

    if (institutionId === 3 || institutionId === 17) {
      isMandiri = true;
    }

    if (institutionId === 4) {
      isBni = true;
    }

    if (institutionId === 26 || institutionId === 34) {
      isBsi = true;
    }

    if (institutionId === 5 || institutionId === 16) {
      isBri = true;
    }

    if (institutionId === 11) {
      isGopay = true;
    }

    if (institutionId === 12) {
      isOvo = true;
    }

    if (institutionId === 33) {
      isShopeePay = true;
    }
  }

  const disabled =
    isBca &&
    isMandiri &&
    isBni &&
    isBsi &&
    isBri &&
    isGopay &&
    isOvo &&
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

        <ButtonLanjut />
      </div>
    </section>
  );
}
