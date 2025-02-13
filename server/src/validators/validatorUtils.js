import { KeeperError, errorCode } from '../utils/index.js';
import validatorObject from './validatorObject.js';

const validatorsMap = new Map([
  ['getNoteOfUser', validatorObject.userIdParam],
  ['getNoteOfGroup', validatorObject.userIdParam],

  ['postNote', validatorObject.postNoteParams],
  ['putNote', validatorObject.putNoteParams],
  ['deleteNote', validatorObject.deleteNoteParams],

  ['putUser', validatorObject.putUserParams],
  ['deleteUser', validatorObject.userIdParam],
  ['getUser', validatorObject.getUserParams],
  ['postUser', validatorObject.postUserParams],

  ['deleteGroup', validatorObject.deleteGroupParams],
  ['postGroup', validatorObject.postGroupParams],
  ['getGroupsOfUser', validatorObject.getGroupsOfUserParams],

  ['addMember', validatorObject.addMemberParams],
  ['deleteMember', validatorObject.deleteMemberParams],
  ['getMembersOfGroup', validatorObject.getMembersOfGroupParams],
]);

const validateElement = (key, data) => {
  const { error } = validatorsMap.get(key).validate(data);
  if (error) {
    throw new KeeperError(errorCode.BAD_REQUEST, 'Validation error');
  }
};

export default validateElement;
