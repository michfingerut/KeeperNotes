import validateElement from './validatorUtils.js';

const getNoteOfUser = (req, res, next) => {
  validateElement('getNoteOfUser', req.params.userId);
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

export default {
  getNoteOfUser,
  postNote,
  putNote,
  deleteNote,

  putUser,
  deleteUser,
  getUser,
  postUser,
};
