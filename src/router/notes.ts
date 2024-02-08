import { Router } from 'express';

import { getAllNotes, getNoteById, createNewNote, updateNote, deleteNote } from '../controllers/notes';

export default (router: Router) => {
  router.get('/notes', getAllNotes);
  router.get('/notes/:id', getNoteById);
  router.post('/notes', createNewNote);
  router.put('/notes/:id', updateNote);
  router.delete('/notes/:id', deleteNote);
};