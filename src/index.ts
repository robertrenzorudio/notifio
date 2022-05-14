import app from './app';
import dotenv from 'dotenv';

dotenv.config({ path: `.env.${process.env.NODE_ENV}` });

const main = async () => {
  app.listen(parseInt(process.env.PORT!), () => {
    console.log(`Server ready at: http://localhost:${process.env.PORT}`);
  });
};

main().catch((err) => {
  console.log(err.message);
});
