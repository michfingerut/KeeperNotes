import Notes from '../src/db/models/notes.model.js';
import Users from '../src/db/models/users.model.js';
import _ from 'lodash';
import testData from './testData.js';
import Groups from '../src/db/models/groups.model.js';
import Members from '../src/db/models/members.model.js';

const clearUsersFromDb = async () => {
  await Users.destroy({ where: {} });
};

const clearNotesFromDb = async () => {
  await Notes.destroy({ where: {} });
};

const clearGroupsFromDb = async () => {
  await Groups.destroy({ where: {} });
};

const clearMembersFromDb = async () => {
  await Members.destroy({ where: {} });
};

const createUser = async (userInfo) => {
  return await Users.create(userInfo);
};

const createGroup = async () => {
  return await Groups.create();
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

const testGroupsResponse = (resData, expectedData, expectedStatus) => {
  expect(resData.statusCode).toEqual(expectedStatus);

  resData = _.sortBy(resData.body, 'groupId');
  expectedData = _.sortBy(expectedData, 'groupId');

  expect(resData.length).toEqual(expectedData.length);

  for (let i = 0; i < resData.length; ++i) {
    expect(resData[i].groupId).toEqual(expectedData[i].groupId);
    const resMembers = _.sortBy(resData[i].members, 'uuid');
    const expectedMembers = _.sortBy(expectedData[i].members, 'uuid');

    for (let j = 0; j < resMembers.length; ++j) {
      expect(resMembers[j].firstName).toEqual(expectedMembers[j].firstName);
      expect(resMembers[j].lastName).toEqual(expectedMembers[j].lastName);
      expect(resMembers[j].email).toEqual(expectedMembers[j].email);
      expect(resMembers[j].uuid).toEqual(expectedMembers[j].uuid);
    }
  }
};

const compareProperties = (res, expected) => {
  const keys = Object.keys(expected);

  for (const key of keys) {
    if (key !== 'createdAt' && key !== 'updatedAt') {
      expect(res[key]).toEqual(expected[key]);
    }
  }
};

export default {
  clearUsersFromDb,
  clearNotesFromDb,
  clearGroupsFromDb,
  clearMembersFromDb,
  testResponseSingle,
  testResponseArray,
  testMessageResponse,
  testGroupsResponse,
  compareProperties,
  createUser,
  createGroup,
};
