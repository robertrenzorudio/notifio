import 'dotenv/config';
import express from 'express';
import { findRouter, shopRouter } from './routes/index.js';

(async () => {
  const app = express();
  app.use('/find', findRouter);
  app.use('/shop', shopRouter);
  app.get('/', (_, res) => {
    res.send('Hello World!');
  });

  app.listen(parseInt(process.env.PORT!), () => {
    console.log(`Server ready at: http://localhost:${process.env.PORT}`);
  });
})();
