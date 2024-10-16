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
  const route = testData.routes.users;

  beforeAll(async () => {});

  beforeEach(async () => {
    await testUtils.clearUsersFromDb();
  });

  describe('test /users', () => {
    test('.GET users validation', async () => {
      const validUser = testData.users.michal;
      const notValidEmail = [
        {}, //empty param 400
        undefined, //undefined 400
        12,
        'mich', //not valid email
        'micha@', //not valid email
      ];

      for (let i of notValidEmail) {
        let res = await req.get(
          `${route}?email=${i}&password=${validUser.password}`,
        );

        expect(res.statusCode).toBe(BAD_REQUEST);
      }

      const notValidPassword = [
        {}, //empty param 400
        undefined, //undefined 400
        'michakaaaa',
        'Michalaaa',
        '12345678',
        'aA1',
      ];

      for (let i of notValidPassword) {
        let res = await req.get(
          `${route}?email=${validUser.email}&password=${i}`,
        );

        expect(res.statusCode).toBe(BAD_REQUEST);
      }
    });

    test('basic .GET and .POST', async () => {
      const expectedData = testData.users.michal;

      //post new user
      const postRes = await req.post(route).send(expectedData);

      testUtils.testMessageResponse(
        postRes,
        CREATED,
        testData.messages.CREATED.user,
      );

      //get the user
      const getRes = await req.get(
        `${route}?email=${expectedData.email}&password=${expectedData.password}`,
      );

      testUtils.testResponseSingle(getRes, expectedData, OK);
    });

    test('.GET on non existing user', async () => {
      const getRes = await req.get(
        `${route}?email=123@gmail.com&password=aA123456788`,
      );

      testUtils.testMessageResponse(
        getRes,
        NOT_FOUND,
        testData.messages.NOT_FOUND.userNotFound,
      );
    });

    test('.GET with wrong password', async () => {
      const expectedData = testData.users.michal;

      //post new user
      await req.post(route).send(expectedData);

      const getRes = await req.get(
        `${route}?email=${expectedData.email}&password=bB12345678`,
      );

      testUtils.testMessageResponse(
        getRes,
        FORBIDDEN,
        testData.messages.FORBIDDEN.invalidPass,
      );
    });

    test('.POST users validation', async () => {
      const validUser = testData.users.michal;
      const notValidReq = [
        {}, //empty param 400
        undefined, //undefined 400
        {
          firstName: validUser.firstName,
          lastName: validUser.lastName,
          password: validUser.password,
        }, //missing param
        {
          firstName: validUser.firstName,
          lastName: validUser.lastName,
          email: validUser.email,
        }, //missing param
        {
          firstName: validUser.firstName,
          password: validUser.password,
          email: validUser.email,
        }, //missing param
        {
          lastName: validUser.lastName,
          password: validUser.password,
          email: validUser.email,
        }, //missing param
        {
          firstName: validUser.firstName,
          lastName: validUser.lastName,
          password: validUser.password,
          michal: 'michal',
        }, //not valid param
        {
          firstName: validUser.firstName,
          lastName: validUser.lastName,
          email: validUser.email,
          michal: 'michal',
        }, //not valid param
        {
          firstName: validUser.firstName,
          password: validUser.password,
          email: validUser.email,
          michal: 'michal',
        }, //not valid param
        {
          lastName: validUser.lastName,
          password: validUser.password,
          email: validUser.email,
          michal: 'michal',
        }, //not valid param
        {
          firstName: true,
          lastName: validUser.lastName,
          password: validUser.password,
          email: validUser.email,
        }, //not valid firstName
        {
          firstName: validUser.firstName,
          lastName: true,
          password: validUser.password,
          email: validUser.email,
        }, //not valid lastName

        {
          firstName: validUser.firstName,
          lastName: validUser.lastName,
          password: true,
          email: validUser.email,
        }, //not valid password
        {
          firstName: validUser.firstName,
          lastName: validUser.lastName,
          password: 'Aa1',
          email: validUser.email,
        }, //not valid password
        {
          firstName: validUser.firstName,
          lastName: validUser.lastName,
          password: '12345678',
          email: validUser.email,
        }, //not valid password
        {
          firstName: validUser.firstName,
          lastName: validUser.lastName,
          password: validUser.password,
          email: 'mich',
        }, //not valid email
      ];

      for (let i of notValidReq) {
        let res = await req.post(route).send(i);

        expect(res.statusCode).toBe(BAD_REQUEST);
      }
    });

    test('.POST on already existing email', async () => {
      const expectedData = testData.users.michal;

      //post new user
      const postRes1 = await req.post(route).send(expectedData);

      testUtils.testMessageResponse(
        postRes1,
        CREATED,
        testData.messages.CREATED.user,
      );

      const postRes2 = await req.post(route).send(expectedData);
      testUtils.testMessageResponse(
        postRes2,
        FORBIDDEN,
        testData.messages.FORBIDDEN.userExist,
      );
    });

    test('.PUT users validation', async () => {
      const validUser = testData.users.michal;
      const uuid = testData.randomUUID;

      const notValidUserId = [
        {}, //empty param 400
        undefined, //undefined 400
        321, //number
        'michal', //not valid uuid
      ];

      for (let i of notValidUserId) {
        let res = await req.put(`${route}/${i}`).send(validUser);

        expect(res.statusCode).toBe(BAD_REQUEST);
      }

      const notValidReq = [
        {
          firstName: validUser.firstName,
          lastName: validUser.lastName,
          password: validUser.password,
          michal: 'michal',
        }, //not valid param
        {
          firstName: validUser.firstName,
          lastName: validUser.lastName,
          email: validUser.email,
          michal: 'michal',
        }, //not valid param
        {
          firstName: validUser.firstName,
          password: validUser.password,
          email: validUser.email,
          michal: 'michal',
        }, //not valid param
        {
          lastName: validUser.lastName,
          password: validUser.password,
          email: validUser.email,
          michal: 'michal',
        }, //not valid param
        {
          firstName: true,
          lastName: validUser.lastName,
          password: validUser.password,
          email: validUser.email,
        }, //not valid firstName
        {
          firstName: validUser.firstName,
          lastName: true,
          password: validUser.password,
          email: validUser.email,
        }, //not valid lastName

        {
          firstName: validUser.firstName,
          lastName: validUser.lastName,
          password: true,
          email: validUser.email,
        }, //not valid password
        {
          firstName: validUser.firstName,
          lastName: validUser.lastName,
          password: 'Aa1',
          email: validUser.email,
        }, //not valid password
        {
          firstName: validUser.firstName,
          lastName: validUser.lastName,
          password: '12345678',
          email: validUser.email,
        }, //not valid password
        {
          firstName: validUser.firstName,
          lastName: validUser.lastName,
          password: validUser.password,
          email: 'mich',
        }, //not valid email
      ];

      for (let i of notValidReq) {
        let res = await req.put(`${route}/${uuid}`).send(i);

        expect(res.statusCode).toBe(BAD_REQUEST);
      }
    });

    test('basic .PUT (one parameter)', async () => {
      const expectedData = testData.users.michal;

      //post new user
      const postRes = await req.post(route).send(expectedData);
      const userId = postRes.body.userId;
      expectedData.firstName = 'Mich';

      // update user
      const putRes = await req.put(`${route}/${userId}`).send({
        firstName: expectedData.firstName,
      });

      testUtils.testResponseSingle(putRes, expectedData, OK);
    });

    test('.PUT (more than one parameter)', async () => {
      const expectedData = testData.users.michal;

      //post new user
      const postRes = await req.post(route).send(expectedData);
      const userId = postRes.body.userId;
      expectedData.firstName = 'Mich';
      expectedData.lastName = 'finger';

      // update user
      const putRes1 = await req.put(`${route}/${userId}`).send({
        firstName: expectedData.firstName,
        lastName: expectedData.lastName,
      });

      testUtils.testResponseSingle(putRes1, expectedData, OK);
    });

    test('.PUT with the same data', async () => {
      const expectedData = testData.users.michal;

      //post new user
      const postRes = await req.post(route).send(expectedData);
      const userId = postRes.body.userId;

      // update user
      const putRes = await req.put(`${route}/${userId}`).send(expectedData);

      testUtils.testResponseSingle(putRes, expectedData, OK);
    });

    test('.PUT on non existing user', async () => {
      const expectedData = testData.users.michal;
      const nonExistantUUID = testData.randomUUID;

      const putRes = await req
        .put(`${route}/${nonExistantUUID}`)
        .send(expectedData);

      testUtils.testMessageResponse(
        putRes,
        NOT_FOUND,
        testData.messages.NOT_FOUND.userNotFound,
      );
    });

    test('.PUT on already existing email', async () => {
      const expectedData = testData.users.michal;
      const res = await req.post(route).send(expectedData);
      const userId = res.body.userId;
      await req.post(route).send(testData.users.israel);

      expectedData.email = testData.users.israel.email;

      const putRes = await req.put(`${route}/${userId}`).send(expectedData);

      testUtils.testMessageResponse(
        putRes,
        FORBIDDEN,
        testData.messages.FORBIDDEN.emailExist,
      );
    });

    test('.DELETE users validation', async () => {
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
      const expectedData = testData.users.michal;

      //post new user
      const postRes = await req.post(route).send(expectedData);

      expect(postRes.statusCode).toEqual(CREATED);

      const userId = postRes.body.userId;

      //delete the user
      const deleteRes = await req.delete(`${route}/${userId}`);

      expect(deleteRes.statusCode).toEqual(OK);

      //get the deleted user
      const getRes = await req.get(
        `${route}?email=${expectedData.email}&password=${expectedData.password}`,
      );

      testUtils.testMessageResponse(
        getRes,
        NOT_FOUND,
        testData.messages.NOT_FOUND.userNotFound,
      );
    });

    test('.DELETE on non existing user', async () => {
      const deleteRes = await req.delete(`${route}/${testData.randomUUID}`);
      testUtils.testMessageResponse(
        deleteRes,
        OK,
        'user was deleted successfully',
      );
    });
  });
});
