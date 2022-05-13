import { AuthProvider, User } from '@prisma/client';
import dotenv from 'dotenv';
import express from 'express';
import findOrCreateUser from './findOrCreateUser';
import passport from 'passport';
import passportGoogle from 'passport-google-oauth20';

dotenv.config({ path: `.env.${process.env.NODE_ENV}` });

const GoogleStrategy = passportGoogle.Strategy;

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      callbackURL: 'http://localhost:7070/auth/signup/google/callback',
    },
    async (_, __, profile, done) => {
      try {
        const id = profile.id;
        const email = profile.emails![0].value;
        console.log(profile.emails![0]);
        const emailVerified = (profile.emails![0].verified as any) === true;
        const user = await findOrCreateUser(
          id,
          email!,
          emailVerified,
          AuthProvider.GOOGLE
        );
        return done(null, user);
      } catch (err) {
        if (err.code === 'P2002') {
          return done(null, {
            error:
              'Sorry, that email address is already associated with an account.',
          });
        }
        return done(null, undefined);
      }
    }
  )
);

const get_signup = (req: express.Request, res: express.Response) => {
  if ((req as any).user.error) {
    console.log((req as any).user.error);
    return res.redirect(`/auth/temp/login?message=${(req as any).user.error}`);
  }

  res.send({ user: (req.user as User).email });
};

export default get_signup;
