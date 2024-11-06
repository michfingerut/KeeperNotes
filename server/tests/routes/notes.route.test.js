import '../../src/dotenv.config.js';

import request from 'supertest';
import testData from '../testData.js';
import testUtils from '../testUtils.js';

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
  let group;
  const groupName = 'self';

  //
  let michalUser;

  beforeAll(async () => {
    await testUtils.clearUsersFromDb();
    await testUtils.clearGroupsFromDb();
    michalUser = await testUtils.createUser(testData.users.michal);
    route = `/users/${michalUser.uuid}/notes`;

    group = await testUtils.createGroup({
      name: groupName,
      ownerId: michalUser.uuid,
    });
  });

  beforeEach(async () => {
    await testUtils.clearNotesFromDb();
  });

  describe('test /notes', () => {
    test('.GET notes of user validation', async () => {
      const notValidReq = [
        {}, //empty param 400
        undefined, //undefined 400
        321, //number
        'michal', //not valid uuid
      ];

      for (let i of notValidReq) {
        let res = await req.get(`/users/${i}/notes`);

        expect(res.statusCode).toBe(BAD_REQUEST);
      }
    });

    test('basic .GET notes of user and .POST', async () => {
      const expectedData = testData.notes;
      expectedData[0].groupId = group.groupId;
      expectedData[1].groupId = group.groupId;

      //post new note
      const postRes = await req.post(route).send(expectedData[0]);

      testUtils.testResponseSingle(postRes, expectedData[0], CREATED);

      //get the note
      const getRes = await req.get(route);

      testUtils.testResponseArray(getRes, [expectedData[1]], OK);
    });

    test('.POST notes validation', async () => {
      const validNote = testData.notes[0];
      const groupId = testData.randomUUID;

      const notValidUserId = [
        {}, //empty param 400
        undefined, //undefined 400
        321, //number
        'michal', //not valid uuid
      ];

      for (let i of notValidUserId) {
        let res = await req.post(`/users/${i}/notes`).send(validNote);

        expect(res.statusCode).toBe(BAD_REQUEST);
      }

      const notValidNote = [
        {}, //empty param 400
        undefined, //undefined 400
        { title: 'hello', content: [123], groupId: groupId }, //not valid content
        { title: [123], content: 'hello', groupId: groupId }, //not valid content
        { title: 'a', content: 'c', groupId: true },
        { title: 'a', content: 'c', michal: groupId },

        { title: 'hello', michal: true, groupId: groupId }, //not valid param
        { michal: true, content: 'hello', groupId: groupId }, //not valid param
        { isDone: 'hello' },
        { isFavorite: 'hello' },
        { schedualTime: 'hello' },
        { pariority: 'hello' },
      ];

      for (let i of notValidNote) {
        let res = await req.post(route).send(i);

        expect(res.statusCode).toBe(BAD_REQUEST);
      }
    });

    test('.POST non existing groupId', async () => {
      const expectedData = testData.notes;
      expectedData[0].groupId = testData.randomUUID;
      //post new note
      const postRes = await req
        .post(`/users/${michalUser.uuid}/notes`)
        .send(expectedData[0]);

      testUtils.testMessageResponse(
        postRes,
        NOT_FOUND,
        testData.messages.NOT_FOUND.groupNotFound,
      );
    });

    test('.POST non existing userId', async () => {
      const expectedData = testData.notes;
      expectedData[0].groupId = group.groupId;

      //post new note
      const postRes = await req
        .post(`/users/${testData.randomUUID}/notes`)
        .send(expectedData[0]);

      testUtils.testMessageResponse(
        postRes,
        NOT_FOUND,
        testData.messages.NOT_FOUND.userNotFound,
      );
    });

    test('.GET notes of groups validation', async () => {
      const notValidReq = [
        {}, //empty param 400
        undefined, //undefined 400
        321, //number
        'michal', //not valid uuid
      ];

      for (let i of notValidReq) {
        let res = await req.get(`/groups/${i}/notes`);

        expect(res.statusCode).toBe(BAD_REQUEST);
      }
    });

    test('basic .GET notes of groups', async () => {
      const expectedData = testData.notes;
      expectedData[0].groupId = group.groupId;
      expectedData[1].groupId = group.groupId;

      const getRes1 = await req.get(`/groups/${group.groupId}/notes`);
      testUtils.testResponseArray(getRes1, [], OK);

      //post new note
      await req.post(route).send(expectedData[0]);

      const getRes2 = await req.get(`/groups/${group.groupId}/notes`);
      testUtils.testResponseArray(getRes2, [expectedData[1]], OK);

      await req.post(route).send(expectedData[0]);

      const getRes3 = await req.get(`/groups/${group.groupId}/notes`);
      testUtils.testResponseArray(
        getRes3,
        [expectedData[1], expectedData[1]],
        OK,
      );
    });

    test('.GET notes of non existing group', async () => {
      const getRes = await req.get(`/groups/${testData.randomUUID}/notes`);

      testUtils.testMessageResponse(
        getRes,
        NOT_FOUND,
        testData.messages.NOT_FOUND.groupNotFound,
      );
    });

    test('.PUT notes validation', async () => {
      const validNote = testData.notes[0];
      const notValidUserId = [
        {}, //empty param 400
        undefined, //undefined 400
        321, //number
        'michal', //not valid uuid
      ];

      for (let i of notValidUserId) {
        let res = await req.put(`/users/${i}/notes/1`).send(validNote);

        expect(res.statusCode).toBe(BAD_REQUEST);
      }

      const notValidId = [
        {}, //empty param 400
        undefined, //undefined 400
        'michal', //not valid string
        [1, 1], //not valid, array
      ];

      for (let i of notValidId) {
        let res = await req
          .put(`/users/${michalUser.uuid}/notes/${i}`)
          .send(validNote);

        expect(res.statusCode).toBe(BAD_REQUEST);
      }

      const notValidNote = [
        { title: 'hello', content: [123] }, //not valid content
        { title: [123], content: 'hello' }, //not valid content
        { title: 'hello', michal: true }, //not valid param
        { michal: true, content: 'hello' }, //not valid param
        { isDone: 'hello' },
        { isFavorite: 'hello' },
        { schedualTime: 'hello' },
        { pariority: 'hello' },
      ];

      for (let i of notValidNote) {
        let res = await req.put(`${route}/1`).send(i);

        expect(res.statusCode).toBe(BAD_REQUEST);
      }
    });

    test('basic .PUT (one parameter)', async () => {
      const sendData = testData.notes[0];
      const expectedData = { ...testData.notes[1] };
      expectedData.groupId = group.groupId;
      sendData.groupId = group.groupId;

      //post new note
      const postRes = await req.post(route).send(sendData);

      const id = postRes.body.id;
      const time = new Date().toISOString();
      expectedData.schedualTime = time;

      //update note
      const putRes = await req
        .put(`${route}/${id}`)
        .send({ schedualTime: expectedData.schedualTime });

      testUtils.testResponseSingle(putRes, expectedData, OK);
    });

    test('.PUT (more than one parameter)', async () => {
      const expectedDataToPost = testData.notes[0];
      expectedDataToPost.groupId = group.groupId;

      const expectedData = testData.notes[1];
      expectedData.groupId = group.groupId;
      expectedData.isDone = true;
      expectedData.title = 'another title';

      //post new note
      const postRes = await req.post(route).send(expectedDataToPost);
      const id = postRes.body.id;

      const dataToPut = {
        title: 'another title',
        isDone: true,
      };

      //update note
      const putRes = await req.put(`${route}/${id}`).send(dataToPut);

      testUtils.testResponseSingle(putRes, expectedData, OK);
    });

    test('.PUT (all parameter)', async () => {
      const expectedDataToPost = testData.notes[0];
      expectedDataToPost.groupId = group.groupId;

      //post new note
      const postRes = await req.post(route).send(expectedDataToPost);
      const id = postRes.body.id;

      const dataToPut = {
        title: 'another title',
        content: 'another content',
        isDone: true,
        isFavorite: true,
        schedualTime: new Date().toISOString(),
        priority: testData.priorityEnum[1],
      };

      //update note
      const putRes = await req.put(`${route}/${id}`).send(dataToPut);

      dataToPut.groupId = group.groupId;
      dataToPut.id = id;

      testUtils.testResponseSingle(putRes, dataToPut, OK);
    });

    test('.PUT on non existing note', async () => {
      const expectedData = {
        title: 'another title',
        content: 'anoter content',
      };
      const putRes = await req.put(`${route}/2000`).send(expectedData);

      testUtils.testMessageResponse(
        putRes,
        NOT_FOUND,
        testData.messages.NOT_FOUND.noteNotFound,
      );
    });

    test('.PUT on non existing userId', async () => {
      const expectedData = testData.notes[0];
      expectedData.groupId = group.groupId;

      const postRes = await req.post(route).send(expectedData);
      const id = postRes.body.id;

      const putRes = await req
        .put(`/users/${testData.randomUUID}/notes/${id}`)
        .send({ title: expectedData.title });

      testUtils.testMessageResponse(
        putRes,
        NOT_FOUND,
        testData.messages.NOT_FOUND.noteNotFound,
      );
    });

    test('.DELETE notes validation', async () => {
      const notValidReq = [
        {}, //empty param 400
        undefined, //undefined 400
        321, //number
        'michal', //not valid uuid
      ];

      for (let i of notValidReq) {
        let res = await req.delete(`/users/${i}`);

        expect(res.statusCode).toBe(BAD_REQUEST);
      }
    });

    test('basic .DELETE', async () => {
      const expectedData = testData.notes;

      //post new note
      const postRes = await req.post(route).send(expectedData[0]);
      const id = postRes.body.id;

      const deleteRes = await req.delete(`${route}/${id}`);

      testUtils.testMessageResponse(
        deleteRes,
        OK,
        `note -> ${id} was deleted successfuly`,
      );
    });

    test('.DELETE on non existing note', async () => {
      const id = 200;

      const deleteRes = await req.delete(`${route}/${id}`);

      testUtils.testMessageResponse(
        deleteRes,
        FORBIDDEN,
        testData.messages.FORBIDDEN.doesntBelong,
      );
    });

    test('.DELETE on non existing userId', async () => {
      const expectedData = testData.notes;

      const postRes = await req.post(route).send(expectedData[0]);
      const id = postRes.body.id;

      const deleteRes = await req.delete(
        `/users/${testData.randomUUID}/notes/${id}`,
      );

      testUtils.testMessageResponse(
        deleteRes,
        FORBIDDEN,
        testData.messages.FORBIDDEN.doesntBelong,
      );
    });
  });
});
