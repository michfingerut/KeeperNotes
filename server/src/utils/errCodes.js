const errorCode = {
  BAD_REQUEST: 400,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
};

const errorNames = new Map([
  [errorCode.BAD_REQUEST, 'BadRequest'],
  [errorCode.FORBIDDEN, 'Forbidden'],
  [errorCode.NOT_FOUND, 'NotFound'],
  [errorCode.INTERNAL_SERVER_ERROR, 'Internal'],
]);

export { errorCode, errorNames };
