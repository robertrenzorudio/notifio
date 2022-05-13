import dotenv from 'dotenv';
import express from 'express';
import { get_signup } from '../controllers/auth';
import passport from 'passport';

dotenv.config({ path: `.env.${process.env.NODE_ENV}` });

const router = express.Router();

router.get(
  '/signup/google',
  passport.authenticate('google', {
    scope: ['email'],
    session: false,
  })
);

router.get(
  '/signup/google/callback',
  passport.authenticate('google', {
    session: false,
  }),
  get_signup
);

router.get('/temp/login', (req: express.Request, res: express.Response) => {
  res.send({ error: req.query.message });
});

export default router;
