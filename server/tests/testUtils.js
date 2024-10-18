import Notes from '../src/db/models/notes.model.js';
import Users from '../src/db/models/users.model.js';
import _ from 'lodash';
import testData from './testData.js';

const clearUsersFromDb = async () => {
  await Users.destroy({ where: {} });
};

const clearNotesFromDb = async () => {
  await Notes.destroy({ where: {} });
};

const createUser = async () => {
  const res = await Users.create(testData.users.michal);
  return res.dataValues;
};

const testResponseArray = (resData, expectedData, expectedStatus) => {
  expect(resData.statusCode).toEqual(expectedStatus);

  resData = _.sortBy(resData.body, 'id');
  expectedData = _.sortBy(expectedData, 'id');

  expect(resData.length).toEqual(expectedData.length);

  for (let i = 0; i < resData.length; ++i) {
    compareProperties(resData[i], expectedData[i]);
  }
};

const testResponseSingle = (resData, expectedData, expectedStatus) => {
  expect(resData.statusCode).toEqual(expectedStatus);
  compareProperties(resData.body, expectedData);
};

const testMessageResponse = (resData, expectedStatus, expectedMessage) => {
  expect(resData.statusCode).toEqual(expectedStatus);
  expect(resData.body.message).toEqual(expectedMessage);
};

const compareProperties = (res, expected) => {
  const keys = Object.keys(expected);

  for (const key of keys) {
    expect(res[key]).toEqual(expected[key]);
  }
};

export default {
  clearUsersFromDb,
  clearNotesFromDb,
  testResponseSingle,
  testResponseArray,
  testMessageResponse,
  compareProperties,
  createUser,
};
