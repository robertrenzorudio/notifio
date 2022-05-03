import express from 'express';
import encodeUrl from 'encodeurl';

const buildFindingApiEndpoint = (req: express.Request) => {
  const baseURL = process.env.EBAY_FINDING_API_ENDPOINT;
  const versionQS = buildVersionQS();
  const appNameQS = buildAppNameQS();
  const callNameQS = `OPERATION-NAME=${req.path.slice(1)}`;

  let callSpecificParams = '';
  switch (req.path) {
    case '/findItemsByProduct':
      callSpecificParams = buildFindItemsByProductQS(req);
      break;
    case '/findItemsByKeywords':
      callSpecificParams = buildFindItemsByKeywordsQS(req);
      break;
  }

  const formatQS = buildFormatQS();
  const filtersQS = buildFiltersQS();
  const paginationQS = buildPaginationQS(req);

  const qs = [
    versionQS,
    appNameQS,
    callNameQS,
    callSpecificParams,
    formatQS,
    filtersQS,
    paginationQS,
  ].join('&');

  const endpoint = `${baseURL}?${qs}`;
  return endpoint;
};

const buildVersionQS = (version = '1.0.0') => {
  return `SERVICE-VERSION=${version}`;
};

const buildAppNameQS = () => {
  return `SECURITY-APPNAME=${process.env.EBAY_CLIENT_ID}`;
};

const buildFindItemsByProductQS = (req: express.Request) => {
  const pidType = `productId.@type=${req.query.productIdType}`;
  const pid = `productId=${req.query.productId}`;
  const qs = [pidType, pid].join('&');
  return qs;
};

const buildFindItemsByKeywordsQS = (req: express.Request) => {
  const keywords = `keywords=${
    req.query.keywords || '(Games,Home,Automotive,Clothing)'
  }`;
  const keywordsEncoded = encodeUrl(keywords);
  return keywordsEncoded;
};

const buildFormatQS = (format = 'JSON') => {
  return `RESPONSE-DATA-FORMAT=${format}&REST-PAYLOAD`;
};

const buildFiltersQS = () => {
  return 'itemFilter(0).name=ListingType&itemFilter(0).value(0)=Auction&itemFilter(0).value(1)=AuctionWithBIN';
};

const buildPaginationQS = (req: express.Request) => {
  const entriesPerPage = `paginationInput.entriesPerPage=${
    req.query.paginationEntriesPerPage || 10
  }`;
  const pageNum = `paginationInput.pageNumber=${
    req.query.paginationPageNumber || 1
  }`;

  const qs = [entriesPerPage, pageNum].join('&');
  return qs;
};

export default buildFindingApiEndpoint;
