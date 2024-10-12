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
const getNotes = async (userId) => {
  return await callBackAPI('get', `/users/${userId}/notes`);
};

const postNote = async (note, userId) => {
  return await callBackAPI('post', `/users/${userId}/notes`, note);
};

const updateNote = async (id, userId, dataToUpdate) => {
  //TODO: as for now, not in use
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
  //TODO: as for now, not in use
  return await callBackAPI('delete', `/users/${userId}`);
};

export default {
  getNotes,
  removeNote,
  postNote,
  updateNote,
  getUser,
  postUser,
  putUser,
  deleteUser,
};
