import express from 'express';
import { get_getSingleItem } from '../controllers/shop';
import {
  getEbayApiEndpoint,
  validateParameters,
} from '../middlewares/index.js';

const router = express.Router();

router.get(
  '/getSingleItem',
  validateParameters,
  getEbayApiEndpoint,
  get_getSingleItem
);

export default router;
