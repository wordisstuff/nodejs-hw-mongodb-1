import express from 'express';
import cors from 'cors';
import pino from 'express-pino-logger';
import { getAllContacts, getContactById } from './services/contacts.js';

import { env } from './utils/env.js';
const PORT = Number(env('PORT', '3000'));

function setupServer() {
  const app = express();
  app.use(cors());
  app.use(pino());

  app.get('/contacts', getAllContacts);
  app.get('/contacts/:contactId', getContactById);

  app.use((req, res, next) => {
    res.status(404).json({ message: 'Not found' });
  });

  app.use((err, req, res, next) => {
    res.status(500).json({
      message: 'Something went wrong',
      error: err.message,
    });
  });

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

export default setupServer;
