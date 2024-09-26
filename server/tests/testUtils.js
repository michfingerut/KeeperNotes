import Notes from '../src/db/notes.model.js';
import _ from 'lodash';

const clearUsersFromDb = async () => {
  await Notes.destroy({ where: {} });
};

const testResponseArray = (resData, expectedData, expectedStatus) => {
  expect(resData.statusCode).toEqual(expectedStatus);

  resData = _.sortBy(resData.body, 'id');
  expectedData = _.sortBy(expectedData, 'id');

  expect(resData.length).toEqual(expectedData.length);

  for (let i = 0; i < resData.length; ++i) {
    compareNote(resData[i], expectedData[i]);
  }
};

const testResponseSingle = (resData, expectedData, expectedStatus) => {
  expect(resData.statusCode).toEqual(expectedStatus);
  compareNote(resData.body, expectedData);
};

const testMessageResponse = (resData, expectedStatus, expectedMessage) => {
  expect(resData.statusCode).toEqual(expectedStatus);
  expect(resData.body.message).toEqual(expectedMessage);
};

const compareNote = (resNote, expectedNote) => {
  expect(resNote.title).toEqual(expectedNote.title);
  expect(resNote.content).toEqual(expectedNote.content);
};

export default {
  clearUsersFromDb,
  compareNote,
  testResponseSingle,
  testResponseArray,
  testMessageResponse,
};
