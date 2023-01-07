import { Navbar, Footer, NavCard } from './client';
import '$styles/globals.css';
import * as jwt from 'jsonwebtoken';
import { AuthTokenPayload } from '$utils/auth';
import _ from 'lodash';
import { PrismaClient } from '@prisma/client';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

const prisma = new PrismaClient();

export default async function Layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { account: string; month: string; year: string };
}) {
  const nextCookies = cookies();
  const token = nextCookies.get('token')?.value;

  if (!token) redirect('/');

  const { whatsapp } = jwt.verify(
    token,
    process.env.APP_SECRET as string
  ) as AuthTokenPayload;

  const user = await prisma.user.findFirst({ where: { whatsapp } });

  if (!user || !user.hasAccount) redirect('/');

  const accounts = (
    await prisma.account.findMany({
      where: { kudosId: user.id },
    })
  ).map((value) => {
    return {
      id: value.id,
      institutionId: value.institutionId,
      accountNumber: value.accountNumber,
    };
  });

  let monthOptions2022BCA: any[] | undefined = undefined,
    monthOptions2023BCA: any[] | undefined = undefined,
    monthOptions2022Mandiri: any[] | undefined = undefined,
    monthOptions2023Mandiri: any[] | undefined = undefined,
    monthOptions2022Bni: any[] | undefined = undefined,
    monthOptions2023Bni: any[] | undefined = undefined,
    monthOptions2022Bsi: any[] | undefined = undefined,
    monthOptions2023Bsi: any[] | undefined = undefined,
    monthOptions2022Gopay: any[] | undefined = undefined,
    monthOptions2023Gopay: any[] | undefined = undefined,
    monthOptions2022Ovo: any[] | undefined = undefined,
    monthOptions2023Ovo: any[] | undefined = undefined,
    monthOptions2022Dana: any[] | undefined = undefined,
    monthOptions2023Dana: any[] | undefined = undefined,
    monthOptions2022Shopeepay: any[] | undefined = undefined,
    monthOptions2023Shopeepay: any[] | undefined = undefined,
    availableYearBCA = [
      {
        id: 1,
        value: '2022',
        available: false,
      },
      {
        id: 2,
        value: '2023',
        available: false,
      },
    ],
    availableYearMandiri = [
      {
        id: 1,
        value: '2022',
        available: false,
      },
      {
        id: 2,
        value: '2023',
        available: false,
      },
    ],
    availableYearBni = [
      {
        id: 1,
        value: '2022',
        available: false,
      },
      {
        id: 2,
        value: '2023',
        available: false,
      },
    ],
    availableYearBsi = [
      {
        id: 1,
        value: '2022',
        available: false,
      },
      {
        id: 2,
        value: '2023',
        available: false,
      },
    ],
    availableYearGopay = [
      {
        id: 1,
        value: '2022',
        available: false,
      },
      {
        id: 2,
        value: '2023',
        available: false,
      },
    ],
    availableYearOvo = [
      {
        id: 1,
        value: '2022',
        available: false,
      },
      {
        id: 2,
        value: '2023',
        available: false,
      },
    ],
    availableYearDana = [
      {
        id: 1,
        value: '2022',
        available: false,
      },
      {
        id: 2,
        value: '2023',
        available: false,
      },
    ],
    availableYearShopeepay = [
      {
        id: 1,
        value: '2022',
        available: false,
      },
      {
        id: 2,
        value: '2023',
        available: false,
      },
    ];

  for (let i = 0; i < accounts.length; i++) {
    const element = accounts[i];

    if (
      element.institutionId === 2 ||
      element.institutionId === 37 ||
      element.institutionId === 38
    ) {
      monthOptions2022BCA = await getAvailableMonth(
        element.institutionId,
        element.id,
        2022
      );

      monthOptions2023BCA = await getAvailableMonth(
        element.institutionId,
        element.id,
        2023
      );
    } else if (element.institutionId === 11) {
      monthOptions2022Gopay = await getAvailableMonth(
        element.institutionId,
        element.id,
        2022
      );

      monthOptions2023Gopay = await getAvailableMonth(
        element.institutionId,
        element.id,
        2023
      );
    } else if (element.institutionId === 3 || element.institutionId === 17) {
      monthOptions2022Mandiri = await getAvailableMonth(
        element.institutionId,
        element.id,
        2022
      );

      monthOptions2023Mandiri = await getAvailableMonth(
        element.institutionId,
        element.id,
        2023
      );
    } else if (element.institutionId === 4) {
      monthOptions2022Bni = await getAvailableMonth(
        element.institutionId,
        element.id,
        2022
      );

      monthOptions2023Bni = await getAvailableMonth(
        element.institutionId,
        element.id,
        2023
      );
    } else if (element.institutionId === 26 || element.institutionId === 34) {
      monthOptions2022Bsi = await getAvailableMonth(
        element.institutionId,
        element.id,
        2022
      );

      monthOptions2023Bsi = await getAvailableMonth(
        element.institutionId,
        element.id,
        2023
      );
    } else if (element.institutionId === 12) {
      monthOptions2022Ovo = await getAvailableMonth(
        element.institutionId,
        element.id,
        2022
      );

      monthOptions2023Ovo = await getAvailableMonth(
        element.institutionId,
        element.id,
        2023
      );
    } else if (element.institutionId === 46) {
      monthOptions2022Dana = await getAvailableMonth(
        element.institutionId,
        element.id,
        2022
      );

      monthOptions2023Dana = await getAvailableMonth(
        element.institutionId,
        element.id,
        2023
      );
    } else if (element.institutionId === 33) {
      monthOptions2022Shopeepay = await getAvailableMonth(
        element.institutionId,
        element.id,
        2022
      );

      monthOptions2023Shopeepay = await getAvailableMonth(
        element.institutionId,
        element.id,
        2023
      );
    }
  }

  if (monthOptions2022BCA !== undefined) {
    if (monthOptions2022BCA.length > 0) {
      availableYearBCA[0].available = true;
    }
  }

  if (monthOptions2023BCA !== undefined) {
    if (monthOptions2023BCA!.length > 0) {
      availableYearBCA[1].available = true;
    }
  }

  if (monthOptions2022Gopay !== undefined) {
    if (monthOptions2022Gopay.length > 0) {
      availableYearGopay[0].available = true;
    }
  }

  if (monthOptions2023Gopay !== undefined) {
    if (monthOptions2023Gopay.length > 0) {
      availableYearGopay[1].available = true;
    }
  }

  if (monthOptions2022Mandiri !== undefined) {
    if (monthOptions2022Mandiri.length > 0) {
      availableYearMandiri[0].available = true;
    }
  }

  if (monthOptions2023Mandiri !== undefined) {
    if (monthOptions2023Mandiri.length > 0) {
      availableYearMandiri[1].available = true;
    }
  }

  if (monthOptions2022Bni !== undefined) {
    if (monthOptions2022Bni.length > 0) {
      availableYearBni[0].available = true;
    }
  }

  if (monthOptions2023Bni !== undefined) {
    if (monthOptions2023Bni.length > 0) {
      availableYearBni[1].available = true;
    }
  }

  if (monthOptions2022Bsi !== undefined) {
    if (monthOptions2022Bsi.length > 0) {
      availableYearBsi[0].available = true;
    }
  }

  if (monthOptions2023Bsi !== undefined) {
    if (monthOptions2023Bsi.length > 0) {
      availableYearBsi[1].available = true;
    }
  }

  if (monthOptions2022Ovo !== undefined) {
    if (monthOptions2022Ovo.length > 0) {
      availableYearOvo[0].available = true;
    }
  }

  if (monthOptions2023Ovo !== undefined) {
    if (monthOptions2023Ovo.length > 0) {
      availableYearOvo[1].available = true;
    }
  }

  if (monthOptions2022Dana !== undefined) {
    if (monthOptions2022Dana.length > 0) {
      availableYearDana[0].available = true;
    }
  }

  if (monthOptions2023Dana !== undefined) {
    if (monthOptions2023Dana.length > 0) {
      availableYearDana[1].available = true;
    }
  }

  if (monthOptions2022Shopeepay !== undefined) {
    if (monthOptions2022Shopeepay.length > 0) {
      availableYearShopeepay[0].available = true;
    }
  }

  if (monthOptions2023Shopeepay !== undefined) {
    if (monthOptions2023Shopeepay.length > 0) {
      availableYearShopeepay[1].available = true;
    }
  }

  return (
    <div className="bg-background dark:bg-onBackground">
      <Navbar params={params} />
      <NavCard
        account={params.account}
        connectedAccounts={accounts}
        monthParam={params.month}
        yearParam={params.year}
        availableMonth2022BCA={monthOptions2022BCA ?? []}
        availableMonth2023BCA={monthOptions2023BCA ?? []}
        availableMonth2022Mandiri={monthOptions2022Mandiri ?? []}
        availableMonth2023Mandiri={monthOptions2023Mandiri ?? []}
        availableMonth2022Bni={monthOptions2022Bni ?? []}
        availableMonth2023Bni={monthOptions2023Bni ?? []}
        availableMonth2022Bsi={monthOptions2022Bsi ?? []}
        availableMonth2023Bsi={monthOptions2023Bsi ?? []}
        availableMonth2022Gopay={monthOptions2022Gopay ?? []}
        availableMonth2023Gopay={monthOptions2023Gopay ?? []}
        availableMonth2022Ovo={monthOptions2022Ovo ?? []}
        availableMonth2023Ovo={monthOptions2023Ovo ?? []}
        availableMonth2022Dana={monthOptions2022Dana ?? []}
        availableMonth2023Dana={monthOptions2023Dana ?? []}
        availableMonth2022Shopeepay={monthOptions2022Shopeepay ?? []}
        availableMonth2023Shopeepay={monthOptions2023Shopeepay ?? []}
        availableYearBCA={availableYearBCA}
        availableYearMandiri={availableYearMandiri}
        availableYearBni={availableYearBni}
        availableYearBsi={availableYearBsi}
        availableYearGopay={availableYearGopay}
        availableYearOvo={availableYearOvo}
        availableYearDana={availableYearDana}
        availableYearShopeepay={availableYearShopeepay}
      />
      <main className="w-full h-fit">{children}</main>
      <Footer />
    </div>
  );
}

async function getAvailableMonth(
  institutionId: number,
  accountId: number,
  year: number
) {
  const transactions = await prisma.transaction.findMany({
    where: {
      institution_id: institutionId,
      accountId,
    },
  });

  const yearArray = _.filter(transactions, ({ dateTimestamp }) => {
    return new Date(dateTimestamp as Date).getFullYear() === year;
  });

  return Object.keys(
    _.groupBy(yearArray, ({ dateTimestamp }) => {
      return new Date(dateTimestamp as Date).getMonth();
    })
  );
}
