import '../../src/dotenv.config.js';

import request from 'supertest';
import testData from '../testData.js';
import testUtils from '../testUtils.js';

//TODO: bug- when run those tests together with users route but users route runs first, notes tests fails
describe('Route tests', () => {
  const req = request(`${process.env.SERVER_URL}`);

  //err codes
  const OK = testData.errorCode.OK;
  const CREATED = testData.errorCode.CREATED;
  const BAD_REQUEST = testData.errorCode.BAD_REQUEST;
  const FORBIDDEN = testData.errorCode.FORBIDDEN;
  const NOT_FOUND = testData.errorCode.NOT_FOUND;
  const INTERNAL = testData.errorCode.INTERNAL;

  //
  let route;

  //
  let michalUser;

  beforeAll(async () => {});

  beforeEach(async () => {});

  describe('test /members', () => {
    test('.POST validation', async () => {});
    test('basic .POST', async () => {});
    test('.POST on non existing groupId', async () => {});
    test('.POST on non existing userId', async () => {});
    test('.DELETE validation', async () => {});
    test('basic .DELETE', async () => {});
    test('.DELETE on non existing groupId', async () => {});
    test('.DELETE on non existing userId', async () => {});
    test('.GET validation', async () => {});
    test('basic .GET', async () => {});
    test('.GET on non existing groupId', async () => {});
  });
});
