import nodemailer from 'nodemailer';
import { SMTP } from '../constants/index.js';
import { env } from './env.js';
const options = {
  host: env(SMTP.HOST),
  port: env(SMTP.PORT),
  auth: {
    user: env(SMTP.USER),
    pass: env(SMTP.PASSWORD),
  },
};
const transport = nodemailer.createTransport(options);

export async function sendMail(message) {
  console.log('BBBBBB', options);

  return await transport.sendMail(message);
}
