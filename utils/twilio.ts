import twilio from 'twilio';

const client = twilio(
  process.env.ACCOUNT_SID as string,
  process.env.AUTH_TOKEN as string
);

export default client;
