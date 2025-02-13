import { v4 as uuidv4 } from 'uuid';

// Generate a random UUID
const randomUUID = uuidv4();

const errorCode = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  INTERNAL: 500,
};

const messages = {
  CREATED: {
    user: 'user was created successfully',
  },
  NOT_FOUND: {
    noteNotFound: 'note doesnt exist',
    userNotFound: 'user doesnt exist',
    groupNotFound: 'group doesnt exist',
  },
  FORBIDDEN: {
    userExist: 'user already exists',
    userNotInGroup: 'user doesnt belong to group',
    emailExist: 'email already exists',
    doesntBelong: 'note doesnt belong to user',
    invalidPass: 'invalid password',
  },
};

const routes = {
  notes: '/notes',
  users: '/users',
  groups: '/groups',
};

const notes = [
  {
    title: 'note1',
    content: 'content1',
  },
  {
    title: 'note1',
    content: 'content1',
    isDone: false,
    isFavorite: false,
    scheduledTime: null,
    priority: 'regular',
  },
];

const users = {
  michal: {
    firstName: 'Michal',
    lastName: 'Fingerut',
    email: 'mich@gmail.com',
    password: 'aA12345678',
  },
  israel: {
    firstName: 'Israel',
    lastName: 'Israel',
    email: 'israel@gmail.com',
    password: 'aA12345678',
  },
};

const priorityEnum = ['regular', 'high', 'low'];

export default {
  errorCode,
  messages,
  routes,
  notes,
  users,
  randomUUID,
  priorityEnum,
};
