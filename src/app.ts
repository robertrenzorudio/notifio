import dotenv from 'dotenv';
dotenv.config({ path: `.env.${process.env.NODE_ENV}` });
import express from 'express';
import { findRouter, shopRouter } from './routes/index.js';

const app = express();
app.use('/find', findRouter);
app.use('/shop', shopRouter);
app.get('/', (_, res) => {
  res.send('Hello World!');
});

export default app;
