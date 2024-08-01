import express from 'express';
import cors from 'cors';
import pino from 'pino-http';
import { getAllContacts, getContactById } from './controllers/contactsController.js'; // Використовуємо функції з контролера

import { env } from './utils/env.js';
const PORT = Number(env('PORT', '3000'));

export const setupServer = () => {
  const app = express();
  app.use(express.json());
  app.use(cors());
  app.use(
    pino({
      transport: {
        target: 'pino-pretty',
      },
    }),
  );

  app.get('/contacts', getAllContacts); // Використовуємо функції контролера
  app.get('/contacts/:contactId', getContactById); // Використовуємо функції контролера

  app.use((req, res, next) => {
    res.status(404).json({
      status: 404,
      message: 'Not found',
      data: null,
    });
  });

  app.use((err, req, res, next) => {
    res.status(500).json({
      status: 500,
      message: 'Something went wrong',
      data: { error: err.message },
    });
  });

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};
