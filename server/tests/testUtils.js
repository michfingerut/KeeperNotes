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

const createGroup = async (req) => {
  return await Groups.create(req);
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
  resData = resData.body;

  expect(resData.length).toEqual(expectedData.length);

  resData.forEach((obj) => {
    const expectedObj = expectedData.find((ex) => {
      return ex.groupId === obj.groupId;
    });

    expect(obj.groupId).toEqual(expectedObj.groupId);
    expect(obj.name).toEqual(expectedObj.name);
  });
};

const testSingleGroupResponse = (resData, expectedData, expectedStatus) => {
  expect(resData.statusCode).toEqual(expectedStatus);
  resData = resData.body;

  compareGroup(resData, expectedData);
};

const compareGroup = (resGroup, expectedGroup) => {
  expect(resGroup.groupId).toEqual(expectedGroup.groupId);
  expect(resGroup.name).toEqual(expectedGroup.name);
  expect(resGroup.ownerId).toEqual(expectedGroup.ownerId);

  expect(resGroup.members.length).toEqual(expectedGroup.members.length);

  resGroup.members.forEach((resGroupMembers) => {
    const expectedGroupMembers = expectedGroup.members.find((mem) => {
      return mem.uuid === resGroupMembers.uuid;
    });

    expect(resGroupMembers.firstName).toEqual(expectedGroupMembers.firstName);
    expect(resGroupMembers.lastName).toEqual(expectedGroupMembers.lastName);
    expect(resGroupMembers.email).toEqual(expectedGroupMembers.email);
    expect(resGroupMembers.uuid).toEqual(expectedGroupMembers.uuid);
  });
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
  testSingleGroupResponse,
  compareProperties,
  compareGroup,
  createUser,
  createGroup,
};
