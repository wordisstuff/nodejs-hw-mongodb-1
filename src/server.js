import express from 'express';
import cors from 'cors';
import pino from 'express-pino-logger';
import { getAllContacts, getContactById } from './controllers/contactsController.js';

function setupServer() {
  const app = express();
  app.use(cors());
  app.use(pino());

  app.get('/contacts', getAllContacts);
  app.get('/contacts/:contactId', getContactById);

  app.use((req, res, next) => {
    res.status(404).json({ message: 'Not found' });
  });

  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

export default setupServer;
