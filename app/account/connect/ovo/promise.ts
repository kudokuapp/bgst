import axios from 'axios';

export function connectOvoOne({
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
          '/api/ewallet/ovo/otp',
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

export function connectOvoTwo({
  token,
  username,
  refId,
  deviceId,
  otpNumber,
  pin,
  redirectRefId,
  clientId,
}: {
  token: string;
  username: string;
  refId: string;
  deviceId: string;
  otpNumber: string;
  pin: string;
  redirectRefId: string;
  clientId: number;
}) {
  return new Promise((resolve, reject) => {
    (async () => {
      try {
        const options = {
          method: 'POST',
          url: '/api/ewallet/ovo/token',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          data: {
            username,
            refId,
            deviceId,
            otpNumber,
            pin,
            redirectRefId,
            clientId,
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

export function connectOvoThree({
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

export function connectOvoFour({
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
          '/api/ewallet/ovo/init',
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

export function refreshOvoOne({
  accountId,
  token,
  username,
  refId,
  deviceId,
  otpNumber,
  pin,
  redirectRefId,
  clientId,
}: {
  accountId: number;
  token: string;
  username: string;
  refId: string;
  deviceId: string;
  otpNumber: string;
  pin: string;
  redirectRefId: string;
  clientId: number;
}) {
  return new Promise((resolve, reject) => {
    (async () => {
      try {
        const options = {
          method: 'POST',
          url: '/api/ewallet/ovo/refreshtoken',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          data: {
            accountId,
            username,
            refId,
            deviceId,
            otpNumber,
            pin,
            redirectRefId,
            clientId,
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

export function refreshOvoTwo({
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
          '/api/ewallet/ovo/refresh',
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
