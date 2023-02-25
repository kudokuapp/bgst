import axios from 'axios';

export function connectGopayOne({
  username,
  token,
}: {
  username: string;
  token: string;
}) {
  return new Promise((resolve, reject) => {
    (async () => {
      try {
        const { data } = await axios.post(
          '/api/ewallet/gopay/otp',
          { username },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        resolve(data);
      } catch (e) {
        reject(e);
      }
    })();
  });
}

export function connectGopayTwo({
  redirectRefId,
  clientId,
  sessionId,
  uniqueId,
  otpToken,
  otp,
  username,
  token,
}: {
  redirectRefId: string;
  clientId: string;
  sessionId: string;
  uniqueId: string;
  otpToken: string;
  otp: string;
  username: string;
  token: string;
}) {
  return new Promise((resolve, reject) => {
    (async () => {
      try {
        const options = {
          method: 'POST',
          url: '/api/ewallet/gopay/token',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          data: {
            redirectRefId,
            clientId,
            username,
            sessionId,
            uniqueId,
            otpToken,
            otp,
          },
        };

        const { data } = await axios.request(options);
        resolve(data);
      } catch (e) {
        reject(e);
      }
    })();
  });
}

export function connectGopayThree({
  userId,
  accessToken,
  institutionId,
  token,
}: {
  userId: number;
  accessToken: string;
  institutionId: number;
  token: string;
}) {
  return new Promise((resolve, reject) => {
    (async () => {
      try {
        const { data } = await axios.post(
          '/api/ewalletdetail',
          { userId, accessToken, institutionId },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        resolve(data);
      } catch (e) {
        reject(e);
      }
    })();
  });
}

export function connectGopayFour({
  accountId,
  accessToken,
  token,
}: {
  accountId: number;
  accessToken: string;
  token: string;
}) {
  return new Promise((resolve, reject) => {
    (async () => {
      try {
        const { data } = await axios.post(
          '/api/ewallet/gopay/init',
          { accountId, accessToken },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        resolve(data);
      } catch (e) {
        reject(e);
      }
    })();
  });
}

export function refreshGopayOne({
  accountId,
  redirectRefId,
  clientId,
  sessionId,
  uniqueId,
  otpToken,
  otp,
  username,
  token,
}: {
  accountId: number;
  redirectRefId: string;
  clientId: string;
  sessionId: string;
  uniqueId: string;
  otpToken: string;
  otp: string;
  username: string;
  token: string;
}) {
  return new Promise((resolve, reject) => {
    (async () => {
      try {
        const options = {
          method: 'POST',
          url: '/api/ewallet/gopay/refreshtoken',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          data: {
            accountId,
            redirectRefId,
            clientId,
            username,
            sessionId,
            uniqueId,
            otpToken,
            otp,
          },
        };

        const { data } = await axios.request(options);
        resolve(data);
      } catch (e) {
        reject(e);
      }
    })();
  });
}

export function refreshGopayTwo({
  accountId,
  accessToken,
  token,
}: {
  accountId: number;
  accessToken: string;
  token: string;
}) {
  return new Promise((resolve, reject) => {
    (async () => {
      try {
        const { data } = await axios.post(
          '/api/ewallet/gopay/refresh',
          { accountId, accessToken },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        resolve(data);
      } catch (e) {
        reject(e);
      }
    })();
  });
}
