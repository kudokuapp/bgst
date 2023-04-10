import renderFromDateInit, {
  renderFromDateRefresh,
} from '$utils/helper/renderFromDate';
import { kudokuxbrickUrl } from '$utils/kudokuxbrick';
import { BCATransaction } from '@prisma/client';
import axios from 'axios';

export function connectBcaOne({
  institutionId,
  username,
  password,
  token,
}: {
  institutionId: number;
  username: string;
  password: string;
  token: string;
}) {
  return () => {
    return new Promise((resolve, reject) => {
      const url = kudokuxbrickUrl('/bca/token');

      const options = {
        method: 'POST',
        url: url.href,
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        data: {
          type: 'BGST',
          brickInstitutionId: institutionId,
          username,
          password,
        },
      };

      (async () => {
        try {
          const { data }: { data: BrickTokenData } = await axios.request(
            options
          );
          resolve({ accessToken: data.accessToken, institutionId, token });
        } catch (e) {
          reject(e);
        }
      })();
    });
  };
}

export function connectBcaTwo({
  accessToken,
  institutionId,
  token,
}: {
  accessToken: string;
  institutionId: number;
  token: string;
}) {
  return new Promise((resolve, reject) => {
    const url = kudokuxbrickUrl('/bca/account');

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
        const { data }: { data: BrickAccountDetail } = await axios.request(
          options
        );
        resolve({
          accessToken,
          accountNumber: data.accountNumber,
          brick_account_id: data.accountId,
          institutionId,
          token,
        });
      } catch (e) {
        reject(e);
      }
    })();
  });
}

export function connectBcaThree({
  accessToken,
  accountNumber,
  brick_account_id,
  institutionId,
  token,
}: {
  institutionId: number;
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
          '/api/bank/bca/init',
          { accountNumber, accessToken, brick_account_id, institutionId },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        resolve({
          accessToken: data.accessToken,
          institutionId,
          accountId: data.accountId,
          token,
        });
      } catch (e) {
        reject(e);
      }
    })();
  });
}

export function connectBcaFour({
  accessToken,
  institutionId,
  accountId,
  token,
}: {
  accessToken: string;
  institutionId: number;
  accountId: number;
  token: string;
}) {
  return new Promise((resolve, reject) => {
    const url = kudokuxbrickUrl('/bca/transactionto');

    const { from, to } = renderFromDateInit(institutionId);

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

export function connectBcaFive({
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
          '/api/bank/bca/transaction',
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

export function expiredBcaOne({
  accountId,
  institutionId,
  username,
  password,
  token,
}: {
  accountId: number;
  institutionId: number;
  username: string;
  password: string;
  token: string;
}) {
  return () => {
    return new Promise((resolve, reject) => {
      const url = kudokuxbrickUrl('/bca/token');

      const options = {
        method: 'POST',
        url: url.href,
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        data: {
          type: 'BGST',
          brickInstitutionId: institutionId,
          username,
          password,
        },
      };

      (async () => {
        try {
          const { data }: { data: BrickTokenData } = await axios.request(
            options
          );
          resolve({
            accessToken: data.accessToken,
            institutionId,
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

export function expiredBcaTwo({
  accessToken,
  institutionId,
  token,
  accountId,
}: {
  accessToken: string;
  institutionId: number;
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
            latestTransaction: BCATransaction;
          };
        } = await axios.post(
          '/api/bank/bca/updateexpiry',
          { accountId, accessToken },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        resolve({
          accessToken: data.accessToken,
          institutionId,
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

export function expiredBcaThree({
  accessToken,
  institutionId,
  accountId,
  token,
  latestTransaction,
}: {
  accessToken: string;
  institutionId: number;
  accountId: number;
  token: string;
  latestTransaction: BCATransaction;
}) {
  return new Promise((resolve, reject) => {
    const url = kudokuxbrickUrl('/bca/transactionto');

    const { from, to } = renderFromDateRefresh(
      institutionId,
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

export function expiredBcaFour({
  latestTransaction,
  transactions,
  token,
}: {
  latestTransaction: BCATransaction;
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
          '/api/bank/bca/refresh',
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
