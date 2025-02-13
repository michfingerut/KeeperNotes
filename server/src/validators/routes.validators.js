import validateElement from './validatorUtils.js';

/*****************************************************/
const getNoteOfUser = (req, res, next) => {
  validateElement('getNoteOfUser', req.params.userId);
  next();
};

const getNoteOfGroup = (req, res, next) => {
  validateElement('getNoteOfGroup', req.params.groupId);
  next();
};

const postNote = (req, res, next) => {
  req.body.userId = req.params.userId;

  validateElement('postNote', req.body);
  next();
};

const putNote = (req, res, next) => {
  req.body.userId = req.params.userId;
  req.body.id = req.params.id;

  validateElement('putNote', req.body);
  next();
};

const deleteNote = (req, res, next) => {
  validateElement('deleteNote', {
    userId: req.params.userId,
    id: req.params.id,
  });
  next();
};

/*****************************************************/

const putUser = (req, res, next) => {
  req.body.userId = req.params.userId;

  validateElement('putUser', req.body);
  next();
};

const deleteUser = (req, res, next) => {
  validateElement('deleteUser', req.params.userId);
  next();
};

const getUser = (req, res, next) => {
  validateElement('getUser', {
    email: req.query.email,
    password: req.query.password,
  });
  next();
};

const postUser = (req, res, next) => {
  validateElement('postUser', req.body);
  next();
};

/*****************************************************/
const postGroup = (req, res, next) => {
  validateElement('postGroup', req.body);
  next();
};

const deleteGroup = (req, res, next) => {
  validateElement('deleteGroup', req.params.groupId);
  next();
};

const getGroupsOfUser = (req, res, next) => {
  validateElement('getGroupsOfUser', req.params.userId);
  next();
};

/*****************************************************/
const addMember = (req, res, next) => {
  req.body.groupId = req.params.groupId;
  validateElement('addMember', req.body);
  next();
};

const deleteMember = (req, res, next) => {
  validateElement('deleteMember', {
    groupId: req.params.groupId,
    userId: req.params.userId,
  });
  next();
};

const getMembersOfGroup = (req, res, next) => {
  validateElement('getMembersOfGroup', req.params.groupId);
  next();
};

/*****************************************************/

export default {
  getNoteOfUser,
  getNoteOfGroup,
  postNote,
  putNote,
  deleteNote,

  putUser,
  deleteUser,
  getUser,
  postUser,

  deleteGroup,
  postGroup,
  getGroupsOfUser,

  addMember,
  deleteMember,
  getMembersOfGroup,
};
