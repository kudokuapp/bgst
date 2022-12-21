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
          '/api/brick/gopaymfa/one',
          { institutionId: 11, username },
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
        const { data } = await axios.post(
          '/api/brick/gopaymfa/two',
          {
            institutionId: 11,
            redirectRefId,
            clientId,
            username,
            sessionId,
            uniqueId,
            otpToken,
            otp,
          },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        resolve(data);
      } catch (e) {
        reject(e);
      }
    })();
  });
}
