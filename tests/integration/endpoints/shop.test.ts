import app from '../../../src/app';
import request from 'supertest';

describe('Test GET /getSingleItem', () => {
  const invalidCases = [
    [400, 'INVALID_TYPE'],
    [404, '000000000000'],
  ];
  it.each(invalidCases)(
    'should return a status code of %s when itemId=%s',
    async (expected, itemId) => {
      const res = await request(app).get(
        `/shop/getSingleItem?itemId=${itemId}`
      );
      expect(res.statusCode).toBe(expected);
    }
  );

  it('should return a status code of 200 when itemId exists', async () => {
    const findRes = await request(app).get('/find/findItemsByKeywords');
    const productId = findRes.body.data.searchResult[0].item[0].itemId[0];
    const res = await request(app).get(
      `/shop/getSingleItem?itemId=${productId}`
    );
    expect(res.statusCode).toBe(200);
  });
});
