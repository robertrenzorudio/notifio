import dotenv from 'dotenv';
import express from 'express';
import { get_authGoogle } from '../controllers/auth';
import passport from 'passport';

dotenv.config({ path: `.env.${process.env.NODE_ENV}` });

const router = express.Router();
router.get(
  '/google',
  passport.authenticate('google', {
    scope: ['email'],
    session: false,
  })
);

router.get(
  '/google/callback',
  passport.authenticate('google', {
    scope: ['email'],
    session: false,
  }),
  get_authGoogle
);

router.get(
  '/temp/create-account',
  (req: express.Request, res: express.Response) => {
    res.send({ error: req.query.message });
  }
);

export default router;
