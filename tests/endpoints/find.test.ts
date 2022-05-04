import app from '../../src/app';
import request from 'supertest';

describe('Test GET /findItemsByProduct', () => {
  const invalidCases = [
    [400, '', '0722674130202'],
    [400, 'INVALID_ID_TYPE', '0722674130202'],
    [400, 'UPC', ''],
    [400, 'UPC', 'INVALID_ID'],
  ];
  it.each(invalidCases)(
    'should return a status code of %s when productIdType=%s and productId=%s',
    async (expected, productIdType, productId) => {
      const res = await request(app).get(
        `/find/findItemsByProduct?productIdType=${productIdType}&productId=${productId}`
      );
      expect(res.statusCode).toBe(expected);
    }
  );

  const validCases = [
    [200, 'UPC', '0722674130202'],
    [200, 'ISBN', '9780984782857'],
    [200, 'ReferenceID', '7045318866'],
  ];

  it.each(validCases)(
    'should return a status code of %s when productIdType=%s and productId=%s',
    async (expected, productIdType, productId) => {
      const res = await request(app).get(
        `/find/findItemsByProduct?productIdType=${productIdType}&productId=${productId}`
      );
      expect(res.statusCode).toBe(expected);
    }
  );
});
