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
    user: 'note was created successfully',
  },
  NOT_FOUND: {
    noteNotFound: 'note doesnt exist',
  },
};

const routes = {
  notes: '/notes',
};

const notes = [
  {
    title: 'note1',
    content: 'content1',
  },
];

export default {
  errorCode,
  messages,
  routes,
  notes,
};
