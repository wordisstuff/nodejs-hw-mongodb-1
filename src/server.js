// В ньому буде знаходитись логіка роботи вашого express-серверу.
import express from 'express';
import cors from 'cors';
import pino from 'pino';
import expressPino from 'express-pino-logger';

function setupServer() {
    const app = express();
    const logger = pino();
    const expressLogger = expressPino({ logger });


    app.use(cors());
    app.use(expressLogger);

    app.use((req, res, next) => {
      res.status(404).json({
        message: 'Not found',
      });
    });

    const port = process.env.PORT || 3000;
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });

    return app;
  }

  module.exports = { setupServer };