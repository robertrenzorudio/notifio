import dotenv from 'dotenv';
import Redis from 'ioredis';

dotenv.config({ path: `.env.${process.env.NODE_ENV}` });

const cache = new Redis(process.env.CACHE_URL!);

export default cache;
