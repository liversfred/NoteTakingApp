import { Request, Response} from 'express';

import { readNoteById, readNotesFromJsonFile, saveNote, updateNote as updateNoteService, deleteNote as deleteNoteService } from '../services/note-service';
import { Note } from '../models/note.interface';

export const getAllNotes = async (req: Request, res: Response) => {
  try {
    const notes = await readNotesFromJsonFile();
    
    return res.status(200).json(notes);
  } catch (error) {
    console.error('Error occured while reading the notes from a json file.', error);
    res.status(400).json({ message: error.message });
  }
};

export const getNoteById = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const note = await readNoteById(parseInt(id));

    return res.status(200).json(note);
  } catch (error) {
    console.error(`Error occured while reading the note with id: ${id}.`, error);
    res.status(400).json({ message: error.message });
  }
};

export const createNewNote = async (req: Request, res: Response) => {
  const newNote: Note = req.body;
  
  try {
    noteValidator(newNote);

    const note = await saveNote(newNote);

    return res.status(201).json({ message: 'Note created successfully!' });
  } catch (error) {
    console.error(`Error occured while creating a new note.`, error);
    res.status(400).json({ message: error.message });
  }
};

export const updateNote = async (req: Request, res: Response) => {
  const { id } = req.params; 
  const updatedNote: Note = req.body; 
  
  try {
    noteValidator(updatedNote);

    await updateNoteService(parseInt(id), updatedNote);

    return res.status(200).json({ message: 'Note has been updated!' });
  } catch (error) {
    console.error(`Error occured while updating a note with id ${id}.`, error);
    res.status(400).json({ message: error.message });
  }
};

export const deleteNote = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    await deleteNoteService(parseInt(id));

    return res.status(200).json({ message: "Note deleted successfully!" });
  } catch (error) {
    console.error(`Error occured while deleting a note with id ${id}.`, error);
    res.status(400).json({ message: error.message });
  }
}

const noteValidator = (note: Note) => {
  // Check if title is provided and is a non-empty string
  if (!note.title || typeof note.title !== 'string' || note.title.trim().length === 0) {
    throw new Error("Title is required and must be a non-empty string");
  }
  // Check if body is provided and is a non-empty string
  if (!note.body || typeof note.body !== 'string' || note.body.trim().length === 0) {
    throw new Error("Body is required and must be a non-empty string");
  }
}