import dotenv from 'dotenv';
dotenv.config({ path: `.env.${process.env.NODE_ENV}` });
import EbayAuthToken from 'ebay-oauth-nodejs-client';

class EbayAccessToken {
  ebayAuthToken: any;
  scope: string[];
  tokenFetchDate: Date;
  tokenTTL: number;
  accessToken: null | string;

  constructor(scope = ["'https://api.ebay.com/oauth/api_scope'"]) {
    this.ebayAuthToken = new EbayAuthToken({
      clientId: process.env.EBAY_CLIENT_ID,
      clientSecret: process.env.EBAY_CLIENT_SECRET,
      redirectUri: process.env.EBAY_AUTH_REDIRECT_URL,
    });
    this.scope = scope;
    this.tokenFetchDate = new Date(0);
    this.tokenTTL = 0;
    this.accessToken = null;
  }

  async getEbayAccessToken() {
    if (!this.accessToken || this.#isTokenExpired()) {
      const data = JSON.parse(
        await this.ebayAuthToken.getApplicationToken('PRODUCTION', this.scope)
      );
      this.tokenFetchDate = new Date();
      this.tokenTTL = (parseInt(data['expires_in']) - 200) * 1000;
      this.accessToken = data['access_token'] as string;
      return this.accessToken;
    }

    return this.accessToken;
  }

  #isTokenExpired() {
    return this.tokenFetchDate.getTime() + this.tokenTTL < new Date().getTime();
  }
}

export default EbayAccessToken;
