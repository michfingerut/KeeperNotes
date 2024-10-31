//External modules
import Axios from 'axios';

const back = Axios.create({
  //TODO not HC
  baseURL: 'http://localhost:3002',
});

const callBackAPI = async (functionToCall, route, params) => {
  const response = await back[functionToCall](route, params);
  return response.data;
};

/******************************************************************************/
const getNotesOfUser = async (userId) => {
  return await callBackAPI('get', `/users/${userId}/notes`);
};

const getNotesOfGroup = async (groupId) => {
  //TODO: not in use
  return await callBackAPI('get', `/groups/${groupId}/notes`);
};

const postNote = async (note, userId) => {
  return await callBackAPI('post', `/users/${userId}/notes`, note);
};

const updateNote = async (id, userId, dataToUpdate) => {
  return await callBackAPI('put', `/users/${userId}/notes/${id}`, dataToUpdate);
};

const removeNote = async (id, userId) => {
  return await callBackAPI('delete', `/users/${userId}/notes/${id}`);
};

/******************************************************************************/

const getUser = async (email, password) => {
  return await callBackAPI('get', `/users?email=${email}&password=${password}`);
};

const postUser = async (userInfo) => {
  return await callBackAPI('post', `/users`, userInfo);
};

const putUser = async (userId, userInfo) => {
  //TODO: as for now, not in use
  return await callBackAPI('put', `/users/${userId}`, userInfo);
};

const deleteUser = async (userId) => {
  return await callBackAPI('delete', `/users/${userId}`);
};

/******************************************************************************/
const getGroupsOfUser = async (userId) => {
  return await callBackAPI('get', `/groups/users/${userId}`);
};

const postGroup = async (name, ownerId) => {
  return await callBackAPI('post', '/groups', { name: name, ownerId: ownerId });
};

const deleteGroup = async (groupId) => {
  //TODO: as for now, not in use
  return await callBackAPI('delete', `/groups/${groupId}`);
};

/******************************************************************************/

const getMembersOfGroup = async (groupId) => {
  //TODO: as for now, not in use
  return await callBackAPI('get', `/groups/${groupId}/members`);
};

const addMember = async (groupId, userId) => {
  //TODO: as for now, not in use
  return await callBackAPI('post', `/groups/${groupId}/members`, userId);
};

const deleteMember = async (groupId, userId) => {
  //TODO: as for now, not in use
  return await callBackAPI('delete', `/groups/${groupId}/members/${userId}`);
};

export default {
  getNotesOfUser,
  getNotesOfGroup,
  removeNote,
  postNote,
  updateNote,

  getUser,
  postUser,
  putUser,
  deleteUser,

  getGroupsOfUser,
  postGroup,
  deleteGroup,

  getMembersOfGroup,
  addMember,
  deleteMember,
};
