import express from 'express';
import notesControllers from './controllers/notes.controllers.js';

const router = express.Router();

router
  .route('/notes')
  .get(notesControllers.getNotes)
  .post(notesControllers.postNote);

router
  .route('/notes/:id')
  .put(notesControllers.putNote)
  .delete(notesControllers.deleteNote);

export default router;
