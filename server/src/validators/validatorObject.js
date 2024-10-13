import Joi from 'joi';

const userIdParam = Joi.string().uuid().required();
const idParam = Joi.number().required();
const titleParam = Joi.string();
const contentParam = Joi.string();
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
  title: titleParam.required(),
  content: contentParam.required(),
  userId: userIdParam,
});

//TODO: bug of sending too long content
const putNoteParams = Joi.object().keys({
  userId: userIdParam,
  id: idParam,
  title: titleParam.optional(),
  content: contentParam.optional(),
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

export default {
  userIdParam,
  postNoteParams,
  putNoteParams,
  deleteNoteParams,
  putUserParams,
  getUserParams,
  postUserParams,
};
