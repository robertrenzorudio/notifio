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
      callbackURL: process.env.GOOGLE_CALLBACK_URL!,
    },
    async (_, __, profile, done) => {
      try {
        const id = profile.id;
        const email = profile.emails![0].value;
        const emailVerified = (profile.emails![0].verified as any) === true;
        const user = await findOrCreateUser(
          id,
          email!,
          emailVerified,
          AuthProvider.GOOGLE
        );
        if (!user) {
          return done(null, {
            error:
              'Sorry, that email address is already associated with an account.' +
              ' Please continue by singing up using a different method.',
          });
        }

        return done(null, user);
      } catch (err) {
        return done(null, {
          error: 'An error occured in the server. Please try again.',
        });
      }
    }
  )
);

const get_signup = (req: express.Request, res: express.Response) => {
  if ((req as any).user.error) {
    console.log((req as any).user.error);
    return res.redirect(
      `/auth/temp/create-account?message=${(req as any).user.error}`
    );
  }

  const user = req.user as User;
  req.session.userId = user.id;
  req.session.email = user.email;
  req.session.emailVerfied = user.emailVerified;
  res.send({ user: (req.user as User).email });
};

export default get_signup;
