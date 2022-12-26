import axios from 'axios';

export async function checkUserBgst(whatsapp: string) {
  return new Promise((resolve, reject) => {
    (async () => {
      try {
        const response = await axios.get('/api/db/bgstuser', {
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
        const response = await axios.get('/api/db/kudos', {
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
      try {
        const { data } = await axios.post('/api/verify/getcode', {
          receiver: whatsapp,
          type: 'sms',
        });
        resolve(data);
      } catch (e) {
        reject(e);
      }

      // setTimeout(() => {
      //   resolve('success');
      //   // reject();
      // }, 2000);
    })();
  });
}

export async function verifyOtp(otp: string, whatsapp: string) {
  return new Promise((resolve, reject) => {
    (async () => {
      try {
        const { data } = await axios.post('/api/verify/confirmcode', {
          receiver: whatsapp,
          code: otp,
        });

        resolve(data);
      } catch (e) {
        reject(e);
      }

      // setTimeout(() => {
      //   if (otp === '111111') {
      //     resolve('success');
      //   } else {
      //     reject();
      //   }
      // }, 2000);
    })();
  });
}

export async function createUser(whatsapp: string) {
  return new Promise((resolve, reject) => {
    (async () => {
      try {
        const { data } = await axios.get('/api/db/kudos', {
          params: { whatsapp },
        });

        const response = await axios.post('/api/db/create', {
          firstName: data.firstname,
          whatsapp: data.whatsapp,
          id: data.id,
          email: data.email,
        });
        resolve(response);
      } catch (e) {
        reject(e);
      }
    })();
  });
}
