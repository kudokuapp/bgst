import axios from 'axios';

export async function checkUserBgst(whatsapp: string) {
  return new Promise((resolve, reject) => {
    (async () => {
      try {
        const response = await axios.get('/api/check/bgstuser', {
          params: { whatsapp },
        });
        resolve(response);
      } catch (e) {
        reject(e);
      }
    })();
  });
}

export async function checkKudos(whatsapp: string) {
  return new Promise((resolve, reject) => {
    (async () => {
      try {
        const response = await axios.get('/api/check/kudos', {
          params: { whatsapp },
        });
        resolve(response);
      } catch (e) {
        reject(e);
      }
    })();
  });
}

export async function kirimOtp(whatsapp: string) {
  return new Promise((resolve, reject) => {
    (async () => {
      // try {
      //   const { data } = await axios.post('/api/verify/getcode', {
      //     receiver: whatsapp,
      //     type: 'sms',
      //   });
      //   resolve(data);
      // } catch (e) {
      //   reject(e);
      // }

      setTimeout(() => {
        resolve('success');
        // reject();
      }, 2000);
    })();
  });
}

export async function verifyOtp(otp: string, whatsapp: string) {
  return new Promise((resolve, reject) => {
    (async () => {
      // try {
      //   const { data } = await axios.post('/api/verify/confirmcode', {
      //     receiver: whatsapp,
      //     code: otp,
      //   });

      //   if (!data.valid || Object.keys(data).length === 0) {
      //     reject('OTP Not valid');
      //   }

      //   resolve(data);
      // } catch (e) {
      //   reject(e);
      // }

      setTimeout(() => {
        if (otp === '111111') {
          resolve('success');
        } else {
          reject();
        }
      }, 2000);
    })();
  });
}
