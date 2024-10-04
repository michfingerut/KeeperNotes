import express from 'express';
import notesControllers from './controllers/notes.controllers.js';
import usersControllers from './controllers/users.controllers.js';

const router = express.Router();

router
  .route('/users/:userId/notes')
  .get(notesControllers.getNotesOfUser)
  .post(notesControllers.postNote);

router
  .route('/users/:userId/notes/:id')
  .put(notesControllers.putNote)
  .delete(notesControllers.deleteNote);

router
  .route('/users/:userId')
  .get(usersControllers.getUserById)
  .put(usersControllers.putUser)
  .delete(usersControllers.deleteUser);

router.route('/users').post(usersControllers.postUser);

export default router;
