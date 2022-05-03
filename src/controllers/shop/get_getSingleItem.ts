import { EbayAccessToken } from '../../utils/index.js';
import express from 'express';
import fetch from 'node-fetch';
import { ItemNotFoundError } from '../../custom-errors/index.js';

const ebayToken = new EbayAccessToken();

const get_getSingleItem = async (_: express.Request, res: express.Response) => {
  try {
    let data = await fetchData(res.locals.ebayApiEndpoint);
    if (data['Ack'] === 'Failure') {
      throw new ItemNotFoundError(data['Errors'][0].LongMessage);
    }

    const resData = { Item: data['Item'] };
    res.json({ data: resData });
  } catch (error) {
    if (error.name === 'ItemNotFoundError') {
      res.status(error.errorCode).json({ errorMessage: error.message });
    } else {
      res
        .status(500)
        .json({ errorMessage: 'Server error, please try again later' });
    }
  }
};

const fetchData = async (url: string) => {
  const raw = await fetch(url, {
    method: 'GET',
    headers: {
      'X-EBAY-API-IAF-TOKEN': await ebayToken.getEbayAccessToken(),
    },
  });

  const data = (await raw.json()) as any;
  return data;
};

export default get_getSingleItem;
