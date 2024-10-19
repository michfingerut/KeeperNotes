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
  let israelUser;
  let group;
  const groupName = 'self';

  beforeAll(async () => {
    await testUtils.clearUsersFromDb();
    await testUtils.clearGroupsFromDb();

    michalUser = await testUtils.createUser(testData.users.michal);
    israelUser = await testUtils.createUser(testData.users.israel);
    group = await testUtils.createGroup({
      name: groupName,
      ownerId: michalUser.uuid,
    });
    route = `/groups/${group.groupId}/members`;
  });

  beforeEach(async () => {
    await testUtils.clearMembersFromDb();
  });

  describe('test /members', () => {
    test('.POST validation', async () => {
      const userId = michalUser.uuid;
      const notValidReq = [
        {}, //empty param 400
        undefined, //undefined 400
        321, //number
        'michal', //not valid uuid
      ];

      for (let i of notValidReq) {
        let res = await req.post(`/groups/${i}/members`).send({ userId });

        expect(res.statusCode).toBe(BAD_REQUEST);
      }

      const notValidBody = [
        {}, //empty param 400
        undefined, //undefined 400
        { title: 'hello' }, //not valid params
        { userId: 'hello' }, //not valid userId
        { userId: 312 }, //not valid userId
      ];

      for (let i of notValidBody) {
        let res = await req.post(route).send(i);

        expect(res.statusCode).toBe(BAD_REQUEST);
      }
    });

    test('basic .POST', async () => {
      const res = await req.post(route).send({ userId: michalUser.uuid });

      testUtils.testMessageResponse(
        res,
        CREATED,
        `user -> ${michalUser.uuid} was added to group ${group.groupId}`,
      );
    });

    test('.POST on non existing groupId', async () => {
      const randomGroupId = testData.randomUUID;

      const res = await req
        .post(`/groups/${randomGroupId}/members`)
        .send({ userId: michalUser.uuid });

      testUtils.testMessageResponse(
        res,
        NOT_FOUND,
        testData.messages.NOT_FOUND.groupNotFound,
      );
    });

    test('.POST on non existing userId', async () => {
      const randomUserId = testData.randomUUID;

      const res = await req.post(route).send({ userId: randomUserId });
      testUtils.testMessageResponse(
        res,
        FORBIDDEN,
        testData.messages.FORBIDDEN.userNotInGroup,
      );
    });

    test('.POST on already existing userId', async () => {
      const res1 = await req.post(route).send({ userId: michalUser.uuid });
      expect(res1.statusCode).toBe(CREATED);

      const res2 = await req.post(route).send({ userId: michalUser.uuid });
      testUtils.testMessageResponse(
        res2,
        FORBIDDEN,
        testData.messages.FORBIDDEN.userExist,
      );
    });

    test('.DELETE validation', async () => {
      const notValidReq = [
        {}, //empty param 400
        undefined, //undefined 400
        321, //number
        'michal', //not valid uuid
      ];

      for (let i of notValidReq) {
        const res = await req.delete(`${route}/${i}`);

        expect(res.statusCode).toBe(BAD_REQUEST);
      }

      for (let i of notValidReq) {
        const res = await req.delete(`/groups/${i}/members/${michalUser.uuid}`);

        expect(res.statusCode).toBe(BAD_REQUEST);
      }
    });

    test('basic .DELETE', async () => {
      await req.post(route).send({ userId: michalUser.uuid });
      const deleteRes = await req.delete(`${route}/${michalUser.uuid}`);

      testUtils.testMessageResponse(
        deleteRes,
        OK,
        `user -> ${michalUser.uuid} was deleted successfuly from group ${group.groupId}`,
      );
    });

    test('.DELETE on non existing groupId', async () => {
      const randomGuid = testData.randomUUID;
      const res = await req.delete(
        `/groups/${randomGuid}/members/${michalUser.uuid}`,
      );

      testUtils.testMessageResponse(
        res,
        OK,
        `user -> ${michalUser.uuid} was deleted successfuly from group ${randomGuid}`,
      );
    });

    test('.DELETE on non existing userId', async () => {
      const randomUuid = testData.randomUUID;
      const res = await req.delete(`${route}/${randomUuid}`);

      testUtils.testMessageResponse(
        res,
        OK,
        `user -> ${randomUuid} was deleted successfuly from group ${group.groupId}`,
      );
    });

    test('.GET validation', async () => {
      const notValidReq = [
        {}, //empty param 400
        undefined, //undefined 400
        321, //number
        'michal', //not valid uuid
      ];

      for (let i of notValidReq) {
        const res = await req.get(`/groups/${i}/members`);

        expect(res.statusCode).toBe(BAD_REQUEST);
      }
    });

    test('basic .GET', async () => {
      const expectedData = {
        groupId: group.groupId,
        name: groupName,
        ownerId: michalUser.uuid,
        members: [
          {
            firstName: michalUser.firstName,
            lastName: michalUser.lastName,
            email: michalUser.email,
            uuid: michalUser.uuid,
          },
          {
            firstName: israelUser.firstName,
            lastName: israelUser.lastName,
            email: israelUser.email,
            uuid: israelUser.uuid,
          },
        ],
      };
      const getRes1 = await req.get(route);

      testUtils.testSingleGroupResponse(
        getRes1,
        {
          groupId: group.groupId,
          name: groupName,
          ownerId: michalUser.uuid,
          members: [],
        },
        OK,
      );

      await req.post(route).send({ userId: michalUser.uuid });
      const getRes2 = await req.get(route);

      testUtils.testSingleGroupResponse(
        getRes2,
        {
          groupId: group.groupId,
          ownerId: michalUser.uuid,
          name: groupName,
          members: [expectedData.members[0]],
        },
        OK,
      );

      await req.post(route).send({ userId: israelUser.uuid });
      const getRes3 = await req.get(route);

      testUtils.testSingleGroupResponse(getRes3, expectedData, OK);
    });

    test('.GET on non existing groupId', async () => {
      const randomGuid = testData.randomUUID;
      const res = await req.get(`/groups/${randomGuid}/members`);

      testUtils.testMessageResponse(
        res,
        NOT_FOUND,
        testData.messages.NOT_FOUND.groupNotFound,
      );
    });
  });
});
