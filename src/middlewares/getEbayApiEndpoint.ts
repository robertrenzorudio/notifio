import buildFindingApiEndpoint from './buildFindingApiEndpoint';
import buildShoppingApiEndpoint from './buildShoppingApiEndpoint';
import express from 'express';

const getEbayApiEndpoint = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  let ebayApiEndpoint = '';
  switch (req.baseUrl) {
    case '/find':
      ebayApiEndpoint = buildFindingApiEndpoint(req);
      break;
    case '/shop':
      ebayApiEndpoint = buildShoppingApiEndpoint(req);
      break;
  }

  res.locals.ebayApiEndpoint = ebayApiEndpoint;
  next();
};

export default getEbayApiEndpoint;
