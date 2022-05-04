import express from 'express';
const router = express.Router();
import {
  get_findItemsByKeywords,
  get_findItemsByProduct,
} from '../controllers/find';
import { getEbayApiEndpoint, validateParameters } from '../middlewares';

router.get(
  '/findItemsByKeywords',
  validateParameters,
  getEbayApiEndpoint,
  get_findItemsByKeywords
);

router.get(
  '/findItemsByProduct',
  validateParameters,
  getEbayApiEndpoint,
  get_findItemsByProduct
);

export default router;
