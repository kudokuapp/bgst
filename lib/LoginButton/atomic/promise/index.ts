import axios from 'axios';

export async function checkUserBgst(email: string) {
  return new Promise((resolve, reject) => {
    (async () => {
      try {
        const response = await axios.get('/api/db/bgstuser', {
          params: { email },
        });
        resolve(response);
      } catch (e) {
        reject(e);
      }
    })();
  });
}

export async function checkKudos(email: string) {
  return new Promise((resolve, reject) => {
    (async () => {
      try {
        const response = await axios.get('/api/db/kudos', {
          params: { email },
        });
        resolve(response);
      } catch (e) {
        reject(e);
      }
    })();
  });
}

export async function kirimOtp(email: string) {
  return new Promise((resolve, reject) => {
    (async () => {
      try {
        const { data } = await axios.post('/api/verify/getcode', {
          receiver: email,
          type: 'email',
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

export async function verifyOtp(otp: string, email: string) {
  return new Promise((resolve, reject) => {
    (async () => {
      try {
        const { data } = await axios.post('/api/verify/confirmcode', {
          receiver: email,
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

export async function createUser(email: string) {
  return new Promise((resolve, reject) => {
    (async () => {
      try {
        const { data } = await axios.get('/api/db/kudos', {
          params: { email },
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
