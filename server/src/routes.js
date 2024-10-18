import express from 'express';
import notesControllers from './controllers/notes.controllers.js';
import usersControllers from './controllers/users.controllers.js';
import membersControllers from './controllers/members.controllers.js';
import groupsControllers from './controllers/groups.controllers.js';
import routesValidators from './validators/routes.validators.js';

const router = express.Router();

router
  .route('/users/:userId/notes')
  .get(routesValidators.getNoteOfUser, notesControllers.getNotesOfUser)
  .post(routesValidators.postNote, notesControllers.postNote);

router
  .route('/users/:userId/notes/:id')
  .put(routesValidators.putNote, notesControllers.putNote)
  .delete(routesValidators.deleteNote, notesControllers.deleteNote);

router
  .route('/users/:userId')

  .put(routesValidators.putUser, usersControllers.putUser)
  .delete(routesValidators.deleteUser, usersControllers.deleteUser);

router
  .route('/users')
  .get(routesValidators.getUser, usersControllers.getUser)
  .post(routesValidators.postUser, usersControllers.postUser);

router
  .route('/groups')
  .post(routesValidators.postGroup, groupsControllers.postGroup);

router
  .route('/groups/:groupId')
  .delete(routesValidators.deleteGroup, groupsControllers.deleteGroup);

router
  .route('/groups/:groupId/members')
  .get(routesValidators.getMembersOfGroup, membersControllers.getMembersOfGroup)
  .post(routesValidators.addMember, membersControllers.addMember);

router
  .route('/groups/:groupId/members/:userId')
  .delete(routesValidators.deleteMember, membersControllers.deleteMember);

export default router;
