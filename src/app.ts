import { authRouter, findRouter, shopRouter } from './routes';
import connectRedis from 'connect-redis';
import dotenv from 'dotenv';
import express from 'express';
import cache from './cache';
import session from 'express-session';

dotenv.config({ path: `.env.${process.env.NODE_ENV}` });

declare module 'express-session' {
  interface Session {
    userId: number;
    email: string;
    emailVerfied: boolean;
  }
}

const app = express();
const RedisStore = connectRedis(session);
app.set('trust proxy', 1);
app.use(
  session({
    name: process.env.SESSION_NAME!,
    store: new RedisStore({
      client: cache,
      disableTouch: true,
    }),
    secret: process.env.SESSION_SECRET!,
    cookie: {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      domain:
        process.env.NODE_ENV === 'production'
          ? process.env.SESSION_DOMAIN!
          : undefined,
    },
    saveUninitialized: false,
    resave: false,
  })
);
app.use('/auth', authRouter);
app.use('/find', findRouter);
app.use('/shop', shopRouter);
app.get('/', (_, res) => {
  res.send('Hello World!');
});

export default app;
