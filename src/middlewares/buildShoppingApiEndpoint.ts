import dotenv from 'dotenv';
dotenv.config({ path: `.env.${process.env.NODE_ENV}` });
import express from 'express';

const buildShoppingApiEndpoint = (req: express.Request) => {
  const baseURL = process.env.EBAY_SHOPPING_API_ENDPOINT;
  const callNameQS = buildCallNameQS(req);
  const formatQS = buildFormatQS();
  const siteIdQS = buildSiteIdQS(req);
  const versionQS = buildVersionQS('1199');

  let callSpecificParams = '';
  switch (req.path) {
    case '/getSingleItem':
      callSpecificParams = buildGetSingleItemQS(req);
      break;
  }

  const includeSelectorQS = buildIncludeSelectorQS();

  const qs = [
    callNameQS,
    formatQS,
    siteIdQS,
    versionQS,
    callSpecificParams,
    includeSelectorQS,
  ].join('&');
  const endpoint = `${baseURL}?${qs}`;
  return endpoint;
};

const buildCallNameQS = (req: express.Request) => {
  const name = req.path.slice(1);
  return `callname=${name.charAt(0).toUpperCase() + name.slice(1)}`;
};

const buildFormatQS = (format = 'JSON') => {
  return `responseencoding=${format}`;
};

const buildSiteIdQS = (req: express.Request) => {
  return `siteid=${req.query.siteId || 0}`;
};

const buildVersionQS = (version = '1247') => {
  return `version=${version}`;
};

const buildGetSingleItemQS = (req: express.Request) => {
  const itemId = `ItemID=${req.query.itemId}`;
  return itemId;
};

const buildIncludeSelectorQS = (includes = ['Details']) => {
  return `IncludeSelector=${includes.join(',')}`;
};

export default buildShoppingApiEndpoint;
