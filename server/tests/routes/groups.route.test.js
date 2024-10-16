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
  const route = testData.routes.groups;

  //
  let michalUser;

  beforeAll(async () => {});

  beforeEach(async () => {
    await testUtils.clearGroupsFromDb();
  });

  describe('test /groups', () => {
    test('basic .POST', async () => {
      const postRes = await req.post(route);

      expect(postRes.body.groupId).not.toBe(undefined);
      expect(postRes.statusCode).toBe(CREATED);
    });

    test('.DELETE validation', async () => {
      const notValidReq = [
        {}, //empty param 400
        undefined, //undefined 400
        321, //number
        'michal', //not valid uuid
      ];

      for (let i of notValidReq) {
        let res = await req.delete(`${route}/${i}`);
        expect(res.statusCode).toBe(BAD_REQUEST);
      }
    });

    test('basic .DELETE', async () => {
      const postRes = await req.post(route);
      const groupId = postRes.body.groupId;

      const deleteRes = await req.delete(`${route}/${groupId}`);

      testUtils.testMessageResponse(
        deleteRes,
        OK,
        `group -> ${groupId} was deleted successfuly`,
      );
    });

    test('.DELETE on non existing group', async () => {
      const groupId = testData.randomUUID;

      const deleteRes = await req.delete(`${route}/${groupId}`);

      testUtils.testMessageResponse(
        deleteRes,
        OK,
        `group -> ${groupId} was deleted successfuly`,
      );
    });
  });
});
