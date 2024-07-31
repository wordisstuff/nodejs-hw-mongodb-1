import express from 'express';
import cors from 'cors';
import pino from 'pino-http';
import { getAllContacts, getContactById } from './services/contacts.js';

import { env } from './utils/env.js';
const PORT = Number(env('PORT', '3000'));

// export function setupServer() {
//   const app = express();
//   app.use(cors());
//   app.use(pino());

//   app.get('/contacts', getAllContacts);
//   app.get('/contacts/:contactId', getContactById);

//   app.listen(PORT, () => {
//     console.log(`Server is running on port ${PORT}`);
//   });

//   app.use((req, res, next) => {
//     res.status(404).json({ message: 'Not found' });
//   });

//   app.use((err, req, res, next) => {
//     res.status(500).json({
//       message: 'Something went wrong',
//       error: err.message,
//     });
//   });
// }

// // export default setupServer;


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
  // eslint-disable-next-line no-unused-vars
  app.get('/contacts', async (req, res, next) => {
    try {
      const contacts = await getAllContacts();
      res.status(200).json({
        status: 200,
        message: 'Successfully found contacts!',
        data: contacts,
      });
    } catch (error) {
      next(error);
    }
  });
  // eslint-disable-next-line no-unused-vars
  app.get('/contacts/:contactId', async (req, res, next) => {
    try {
      const { contactId } = req.params;
      const contact = await getContactById(contactId);
      if (!contact) {
        return res.status(404).json({
          status: 404,
          message: 'Contact not found',
          data: null,
        });
      }
      res.status(200).json({
        status: 200,
        message: `Successfully found contact with id ${contactId}!`,
        data: contact,
      });
    } catch (error) {
      next(error);
    }
  });
  // eslint-disable-next-line no-unused-vars
  app.use((req, res, next) => {
    res.status(404).json({
      status: 404,
      message: 'Not found',
      data: null,
    });
  });
  // eslint-disable-next-line no-unused-vars
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