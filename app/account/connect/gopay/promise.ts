import renderFromDateInit, {
  renderFromDateRefresh,
} from '$utils/helper/renderFromDate';
import { kudokuxbrickUrl } from '$utils/kudokuxbrick';
import { GopayTransaction } from '@prisma/client';
import axios from 'axios';

export function kirimOtpGopay({
  username,
  token,
}: {
  username: string;
  token: string;
}): Promise<ExtendedBrickGojekOTPData> {
  return new Promise((resolve, reject) => {
    const url = kudokuxbrickUrl('/gopay/sendotp');

    const options = {
      method: 'POST',
      url: url.href,
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      data: { type: 'BGST', phoneNumber: username },
    };

    (async () => {
      try {
        const { data }: { data: ExtendedBrickGojekOTPData } =
          await axios.request(options);
        resolve(data);
      } catch (e) {
        reject(e);
      }
    })();
  });
}

export function connectGopayOne({
  otpData,
  otp,
  token,
}: {
  otpData: ExtendedBrickGojekOTPData;
  otp: string;
  token: string;
}) {
  return () => {
    return new Promise((resolve, reject) => {
      const url = kudokuxbrickUrl('/gopay/token');

      const options = {
        method: 'POST',
        url: url.href,
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        data: {
          type: 'BGST',
          ...otpData,
          otp,
        },
      };

      (async () => {
        try {
          const { data }: { data: BrickTokenData } = await axios.request(
            options
          );
          resolve({ accessToken: data.accessToken, token });
        } catch (e) {
          reject(e);
        }
      })();
    });
  };
}

export function connectGopayTwo({
  accessToken,
  token,
}: {
  accessToken: string;
  token: string;
}) {
  return new Promise((resolve, reject) => {
    const url = kudokuxbrickUrl('/gopay/account');

    const options = {
      method: 'POST',
      url: url.href,
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      data: {
        type: 'BGST',
        accessToken,
      },
    };

    (async () => {
      try {
        const {
          data,
        }: {
          data: { eWallet: BrickAccountDetail; payLater: BrickAccountDetail };
        } = await axios.request(options);
        resolve({
          accessToken,
          accountNumber: data.eWallet.accountNumber,
          brick_account_id: data.eWallet.accountId,
          token,
        });
      } catch (e) {
        reject(e);
      }
    })();
  });
}

export function connectGopayThree({
  accessToken,
  accountNumber,
  brick_account_id,
  token,
}: {
  accessToken: string;
  accountNumber: string;
  brick_account_id: string;
  token: string;
}) {
  return new Promise((resolve, reject) => {
    (async () => {
      try {
        const {
          data,
        }: {
          data: { status: number; accountId: number; accessToken: string };
        } = await axios.post(
          '/api/ewallet/gopay/init',
          { accountNumber, accessToken, brick_account_id },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        resolve({
          accessToken: data.accessToken,
          accountId: data.accountId,
          token,
        });
      } catch (e) {
        reject(e);
      }
    })();
  });
}

export function connectGopayFour({
  accessToken,
  accountId,
  token,
}: {
  accessToken: string;
  accountId: number;
  token: string;
}) {
  return new Promise((resolve, reject) => {
    const url = kudokuxbrickUrl('/gopay/transactionto');

    const { from, to } = renderFromDateInit(11);

    const options = {
      method: 'POST',
      url: url.href,
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      data: {
        type: 'BGST',
        accessToken,
        from,
        to,
      },
    };

    (async () => {
      try {
        const { data }: { data: BrickTransactionData[] } = await axios.request(
          options
        );

        const response = data as ExtendedBrickTransactionData[];

        for (let i = 0; i < response.length; i++) {
          response[i].accountId = accountId;
        }

        resolve({ transactions: [...response], token });
      } catch (e) {
        reject(e);
      }
    })();
  });
}

export function connectGopayFive({
  transactions,
  token,
}: {
  transactions: ExtendedBrickTransactionData[];
  token: string;
}) {
  return new Promise((resolve, reject) => {
    (async () => {
      try {
        const {
          data,
        }: {
          data: { status: number; message: string };
        } = await axios.post(
          '/api/ewallet/gopay/transaction',
          { transactions },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        resolve({ ...data });
      } catch (e) {
        reject(e);
      }
    })();
  });
}

export function expiredGopayOne({
  otpData,
  otp,
  token,
  accountId,
}: {
  otpData: ExtendedBrickGojekOTPData;
  otp: string;
  token: string;
  accountId: number;
}) {
  return () => {
    return new Promise((resolve, reject) => {
      const url = kudokuxbrickUrl('/gopay/token');

      const options = {
        method: 'POST',
        url: url.href,
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        data: {
          type: 'BGST',
          ...otpData,
          otp,
        },
      };

      (async () => {
        try {
          const { data }: { data: BrickTokenData } = await axios.request(
            options
          );
          resolve({
            accessToken: data.accessToken,
            token,
            accountId,
          });
        } catch (e) {
          reject(e);
        }
      })();
    });
  };
}

export function expiredGopayTwo({
  accessToken,
  token,
  accountId,
}: {
  accessToken: string;
  token: string;
  accountId: number;
}) {
  return new Promise((resolve, reject) => {
    (async () => {
      try {
        const {
          data,
        }: {
          data: {
            status: number;
            accountId: number;
            accessToken: string;
            latestTransaction: GopayTransaction;
          };
        } = await axios.post(
          '/api/ewallet/gopay/updateexpiry',
          { accountId, accessToken },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        resolve({
          accessToken: data.accessToken,
          accountId: data.accountId,
          token,
          latestTransaction: data.latestTransaction,
        });
      } catch (e) {
        reject(e);
      }
    })();
  });
}

export function expiredGopayThree({
  accessToken,
  accountId,
  token,
  latestTransaction,
}: {
  accessToken: string;
  accountId: number;
  token: string;
  latestTransaction: GopayTransaction;
}) {
  return new Promise((resolve, reject) => {
    const url = kudokuxbrickUrl('/gopay/transactionto');

    const { from, to } = renderFromDateRefresh(
      11,
      latestTransaction.dateTimestamp ?? new Date()
    );

    const options = {
      method: 'POST',
      url: url.href,
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      data: {
        type: 'BGST',
        accessToken,
        from,
        to,
      },
    };

    (async () => {
      try {
        const { data }: { data: BrickTransactionData[] } = await axios.request(
          options
        );

        const response = data as ExtendedBrickTransactionData[];

        for (let i = 0; i < response.length; i++) {
          response[i].accountId = accountId;
        }

        resolve({ transactions: [...response], token, latestTransaction });
      } catch (e) {
        reject(e);
      }
    })();
  });
}

export function expiredGopayFour({
  latestTransaction,
  transactions,
  token,
}: {
  latestTransaction: GopayTransaction;
  transactions: ExtendedBrickTransactionData[];
  token: string;
}) {
  return new Promise((resolve, reject) => {
    (async () => {
      try {
        const {
          data,
        }: {
          data: { status: number; message: string };
        } = await axios.post(
          '/api/ewallet/gopay/refresh',
          { transactions, latestTransaction },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        resolve({ ...data });
      } catch (e) {
        reject(e);
      }
    })();
  });
}
