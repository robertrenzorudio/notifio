import express from 'express';
import UserInputError from '../custom-errors/UserInputError.js';

const validateParameters = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    if (req.path === '/findItemsByProduct') {
      validateFindItemsByProductParams(req);
    } else if (req.path === '/getSingleItem') {
      validateGetSingleItemParams(req);
    }
  } catch (error) {
    if (error.name === 'UserInputError') {
      res.status(400).json({ errorMessage: error.message });
      return;
    }
    res
      .status(500)
      .json({ errorMessage: 'Server error, please try again later' });
  }
  next();
};

const validateFindItemsByProductParams = (req: express.Request) => {
  const productIdType = req.query.productIdType;
  const productId = req.query.productId;
  if (!productIdType || !isValidProductIdType(productIdType as string)) {
    throw new UserInputError(
      'Invalid or missing productIdType. Value must be ReferenceID, ISBN, UPC, or EAN'
    );
  }

  if (!productId || typeof productId !== 'string') {
    throw new UserInputError('Invalid or missing productId, must be a string');
  }
};

const validateGetSingleItemParams = (req: express.Request) => {
  const itemId = req.query.itemId;
  if (!itemId || isNaN(Number(itemId))) {
    throw new UserInputError(
      'Invalid or missing itemId. Value must be a numeric string'
    );
  }
};

const isValidProductIdType = (productIdType: string) => {
  if (
    productIdType === 'ReferenceID' ||
    productIdType === 'ISBN' ||
    productIdType === 'UPC' ||
    productIdType === 'EAN'
  ) {
    return true;
  }
  return false;
};
export default validateParameters;
