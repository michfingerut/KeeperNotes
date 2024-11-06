import Joi from 'joi';
import { priorityEnum } from '../utils/index.js';

const userIdParam = Joi.string().uuid().required();
const idParam = Joi.number().required();
const titleParam = Joi.string().max(100).min(0);
const contentParam = Joi.string().min(0);
const emailParam = Joi.string()
  .email({ tlds: { allow: false } })
  .required();

const passwordParam = Joi.string()
  .min(8)
  .pattern(/[a-z]/)
  .pattern(/[A-Z]/)
  .pattern(/[0-9]/)
  .required();

const firstNameParams = Joi.string();
const lastNameParams = Joi.string();

const postNoteParams = Joi.object().keys({
  title: titleParam.optional(),
  content: contentParam.optional(),
  userId: userIdParam,
  groupId: userIdParam,
  isDone: Joi.boolean().optional(),
  isFavorite: Joi.boolean().optional(),
  scheduledTime: Joi.date().optional(),
  priority: Joi.string()
    .valid(...priorityEnum)
    .optional(),
});

const putNoteParams = Joi.object().keys({
  userId: userIdParam,
  id: idParam,
  title: titleParam.optional(),
  content: contentParam.optional(),
  isDone: Joi.boolean().optional(),
  isFavorite: Joi.boolean().optional(),
  scheduledTime: Joi.date().optional(),
  priority: Joi.string()
    .valid(...priorityEnum)
    .optional(),
});
const deleteNoteParams = Joi.object().keys({
  userId: userIdParam,
  id: idParam,
});

const putUserParams = Joi.object().keys({
  userId: userIdParam,
  firstName: firstNameParams.optional(),
  lastName: lastNameParams.optional(),
  email: emailParam.optional(),
  password: passwordParam.optional(),
});

const getUserParams = Joi.object().keys({
  email: emailParam.required(),
  password: passwordParam.required(),
});

const postUserParams = Joi.object().keys({
  firstName: firstNameParams.required(),
  lastName: lastNameParams.required(),
  email: emailParam.required(),
  password: passwordParam.required(),
});

const deleteGroupParams = userIdParam;

const postGroupParams = Joi.object().keys({
  name: Joi.string().required(),
  ownerId: userIdParam,
});
const getGroupsOfUserParams = userIdParam;

const addMemberParams = Joi.object().keys({
  userId: userIdParam,
  groupId: userIdParam,
});

const deleteMemberParams = addMemberParams;

const getMembersOfGroupParams = userIdParam;
export default {
  userIdParam,
  postNoteParams,
  putNoteParams,
  deleteNoteParams,
  putUserParams,
  getUserParams,
  postUserParams,
  deleteGroupParams,
  postGroupParams,
  getGroupsOfUserParams,
  addMemberParams,
  deleteMemberParams,
  getMembersOfGroupParams,
};
