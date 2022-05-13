import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const main = async () => {
  // await prisma.user.createMany({
  //   data: [
  //     {
  //       name: 'Thunder Jaw',
  //       email: 'thunderjaw@xyz.com',
  //     },
  //     {
  //       name: 'Storm Bird',
  //       email: 'stormbird@xyz.com',
  //     },
  //     {
  //       name: 'Shell Snapper',
  //       email: 'shellsnapper@xyz.com',
  //     },
  //     {
  //       name: 'Tide Ripper',
  //       email: 'tideripper@xyz.com',
  //     },
  //   ],
  // });
  // await prisma.notification.create({
  //   data: {
  //     productId: 100,
  //     minsBeforeEnd: 3,
  //     users: {
  //       connect: [
  //         {
  //           id: 1,
  //         },
  //         {
  //           id: 2,
  //         },
  //       ],
  //     },
  //     sent: false,
  //     notifyAt: new Date(),
  //   },
  // });
  // await prisma.notification.create({
  //   data: {
  //     productId: 100,
  //     minsBeforeEnd: 5,
  //     users: {
  //       connect: {
  //         id: 1,
  //       },
  //     },
  //     sent: false,
  //     notifyAt: new Date(),
  //   },
  // });
  // await prisma.notification.create({
  //   data: {
  //     productId: 200,
  //     minsBeforeEnd: 10,
  //     users: {
  //       connect: [
  //         {
  //           id: 1,
  //         },
  //         {
  //           id: 3,
  //         },
  //         { id: 4 },
  //       ],
  //     },
  //     sent: false,
  //     notifyAt: new Date(),
  //   },
  // });
  // await prisma.notification.create({
  //   data: {
  //     productId: 400,
  //     minsBeforeEnd: 15,
  //     users: {
  //       connect: [{ id: 4 }],
  //     },
  //     sent: false,
  //     notifyAt: new Date(),
  //   },
  // });
  // const user = await prisma.user.findUnique({
  //   where: {
  //     id: 1,
  //   },
  //   select: {
  //     name: true,
  //     email: true,
  //     notifications: {
  //       where: {
  //         sent: false,
  //         productId: 100,
  //       },
  //     },
  //   },
  // });
  // console.log(user);
  await prisma.user.create({
    data: {
      email: 'TE',
    },
  });
};

main().catch((err) => {
  console.log(err.message);
});
