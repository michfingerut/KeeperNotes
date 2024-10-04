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

  //
  let michalUser;

  beforeAll(async () => {
    await testUtils.clearUsersFromDb();
    michalUser = await testUtils.createUser();
    route = `/users/${michalUser.uuid}/notes`;
  });

  beforeEach(async () => {
    await testUtils.clearNotesFromDb();
  });

  describe('test /notes', () => {
    test('basic .GET and .POST', async () => {
      const expectedData = testData.notes;

      //post new note
      const postRes = await req.post(route).send(expectedData[0]);

      testUtils.testResponseSingle(postRes, expectedData[0], CREATED);

      //get the note
      const getRes = await req.get(route);

      testUtils.testResponseArray(getRes, expectedData, OK);
    });

    test('basic .PUT (one parameter)', async () => {
      const expectedData = testData.notes[0];

      //post new note
      const postRes = await req.post(route).send(expectedData);
      const id = postRes.body.id;

      expectedData.title = 'another title';

      //update note
      const putRes = await req
        .put(`${route}/${id}`)
        .send({ title: expectedData.title });

      testUtils.testResponseSingle(putRes, expectedData, OK);
    });

    test('.PUT (more than one parameter)', async () => {
      const expectedData = testData.notes[0];

      //post new note
      const postRes = await req.post(route).send(expectedData);
      const id = postRes.body.id;

      expectedData.title = 'another title';
      expectedData.content = 'anoter content';

      //update note
      const putRes = await req.put(`${route}/${id}`).send(expectedData);

      testUtils.testResponseSingle(putRes, expectedData, OK);
    });

    test('.PUT on non existing note', async () => {
      const expectedData = testData.notes;

      const putRes = await req.put(`${route}/200`).send(expectedData);

      testUtils.testMessageResponse(
        putRes,
        NOT_FOUND,
        testData.messages.NOT_FOUND.noteNotFound,
      );
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
        OK,
        `note -> ${id} was deleted successfuly`,
      );
    });
  });
});
