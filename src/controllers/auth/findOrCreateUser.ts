import { AuthProvider } from '@prisma/client';
import db from '../../db';

const findOrCreateUser = async (
  id: string,
  email: string,
  emailVerified: boolean,
  authProvider: AuthProvider
) => {
  let authId;
  switch (authProvider) {
    case 'GOOGLE':
      authId = { googleId: id };
  }

  const user = await db.user.findUnique({
    where: {
      email,
    },
  });

  if (!user) {
    const newUser = await db.user.create({
      data: {
        ...authId,
        email,
        emailVerified,
        authProvider,
      },
    });
    return newUser;
  }

  if (user.authProvider === authProvider) {
    return user;
  }

  return null;
};

export default findOrCreateUser;
