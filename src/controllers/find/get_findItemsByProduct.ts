import express from 'express';
import extractData from './extractData.js';
import fetch from 'node-fetch';
import { UserInputError } from '../../custom-errors/index.js';

const get_findItemsByProduct = async (
  _: express.Request,
  res: express.Response
) => {
  try {
    const raw = await fetch(res.locals.ebayApiEndpoint);
    const data = ((await raw.json()) as any).findItemsByProductResponse;

    if (data[0].ack[0] === 'Failure') {
      throw new UserInputError(data[0].errorMessage[0].error[0].message[0]);
    }

    const resData = extractData(data);
    res.send({ data: resData });
  } catch (error) {
    if (error.name === 'UserInputError') {
      res.status(error.errorCode).json({ errorMessage: error.message });
    } else {
      res
        .status(500)
        .json({ errorMessage: 'Server error, please try again later' });
    }
  }
};

export default get_findItemsByProduct;
