import express from 'express';
const router = express.Router();
import {
  get_findItemsByKeywords,
  get_findItemsByProduct,
} from '../controllers/find/index.js';
import {
  getEbayApiEndpoint,
  validateParameters,
} from '../middlewares/index.js';

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
