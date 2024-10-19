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

  beforeAll(async () => {
    await testUtils.clearUsersFromDb();
    michalUser = await testUtils.createUser(testData.users.michal);
  });

  beforeEach(async () => {
    await testUtils.clearGroupsFromDb();
  });

  describe('test /groups', () => {
    test('.GET validation', async () => {
      const notValidReq = [
        {}, //empty param 400
        undefined, //undefined 400
        321, //number
        'michal', //not valid uuid
      ];

      for (let i of notValidReq) {
        let res = await req.get(`/groups/users/${i}`);
        expect(res.statusCode).toBe(BAD_REQUEST);
      }
    });

    test('.POST validation', async () => {
      const notValidReq = [
        {}, //empty param 400
        undefined, //undefined 400
        { name: true }, //not valid type
        { michal: 'michal' },
      ];

      for (let i of notValidReq) {
        let res = await req.post(route).send(i);
        expect(res.statusCode).toBe(BAD_REQUEST);
      }
    });

    test('basic .GET + .POST', async () => {
      const getRes1 = await req.get(`/groups/users/${michalUser.uuid}`);

      testUtils.testResponseSingle(getRes1, [], OK);
      const groupName = 'self';
      const postRes = await req.post(route).send({ name: groupName });

      expect(postRes.body.groupId).not.toBe(undefined);
      expect(postRes.body.name).toBe(groupName);
      expect(postRes.statusCode).toBe(CREATED);

      const groupId = postRes.body.groupId;

      const expectedData = [
        {
          groupId: groupId,
          name: groupName,
        },
      ];

      await req
        .post(`${route}/${groupId}/members`)
        .send({ userId: michalUser.uuid });

      const getRes2 = await req.get(`/groups/users/${michalUser.uuid}`);

      testUtils.testGroupsResponse(getRes2, expectedData, OK);
    });

    test('.GET on non existing userId', async () => {
      const randomUUID = testData.randomUUID;

      const res = await req.get(`/groups/users/${randomUUID}`);
      testUtils.testResponseSingle(res, [], OK);
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
      const postRes = await req.post(route).send({ name: 'self' });
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
