import express from 'express';
import noteControllers from './controllers/notes.controllers';
import notesControllers from './controllers/notes.controllers';

const router = express.Router();

router
  .route('/notes')
  .get(noteControllers.getNotes)
  .post(notesControllers.postNote);

router
  .route('/notes/:id')
  .put(notesControllers.putNote)
  .delete(noteControllers.deleteNote);

export default router;
