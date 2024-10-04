import Axios from 'axios';
//TODO: needs to be updated to the new API
const back = Axios.create({
  //TODO not HC
  baseURL: 'http://localhost:3002',
});

const callBackAPI = async (functionToCall, route, params) => {
  const response = await back[functionToCall](route, params);
  return response.data;
};

const getNotes = async () => {
  return await callBackAPI('get', '/notes');
};

const postNote = async (note) => {
  return await callBackAPI('post', '/notes', note);
};

const updateNote = async (id, dataToUpdate) => {
  return await callBackAPI('put', `/notes/${id}`, dataToUpdate);
};
const removeNote = async (id) => {
  return await callBackAPI('delete', `/notes/${id}`);
};

export default {
  getNotes,
  removeNote,
  postNote,
  updateNote,
};
