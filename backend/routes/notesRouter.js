import express from 'express';
import { createNote, deleteNote, getNote, getNotes, updateNote } from '../controller/notesController.js';
import { authenticate } from '../middleware/authoMiddleware.js';

const noteRouter=  express.Router();

noteRouter.post('/add-note', authenticate, createNote);
noteRouter.get('/get-notes',  authenticate, getNotes);
noteRouter.get('/get-note/:id',  authenticate, getNote);
noteRouter.put('/edit-note/:id', updateNote);
noteRouter.delete('/delete-note/:id', deleteNote);

export default noteRouter;