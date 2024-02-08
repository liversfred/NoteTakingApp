import fs from 'fs';
import { Note } from '../models/note.interface';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();  
const notesDbPath = process.env.NOTES_DB_PATH;

export const readNotesFromJsonFile = async (): Promise<Note[]> => {
  try {
    return await readJsonFile();
  } catch (error) {
    throw error; 
  }
};

export const readNoteById = async (id: number): Promise<Note> => {
  try {
    const notes = await readJsonFile();
    const note = notes.find(x => x.id == id);

    if (!note) {
      throw new Error("Note not found");
    }

    return note;
  } catch (error) {
    throw error; 
  }
};

export const saveNote = async (newNote: Note): Promise<Note> => {
  try {
    const notes = await readJsonFile();

    // Assign new note Id
    newNote.id = getNextId(notes);

    // Push to new note to the array
    notes.push(newNote);

    // Wrtie to file
    writeToJsonFile(notes);

    return newNote;
  } catch (error) {
    throw error; 
  }
};

export const updateNote = async (id: number, updatedNote: Note): Promise<Note> => {
  try {
    const notes = await readJsonFile();

    // Get note to update
    const note = notes.find(x => x.id == id);

    if (!note) {
      throw new Error("Note to be updated not found");
    }

    // Assign updated values
    note.title = updatedNote.title;
    note.body = updatedNote.body;

    // Wrtie to file
    writeToJsonFile(notes);

    return note;
  } catch (error) {
    throw error; 
  }
};

export const deleteNote = async (id: number) => {
  try {
    const notes = await readJsonFile();

    // Get note to delete
    const noteIndex = notes.findIndex(x => x.id == id);

    if (noteIndex === -1) {
      throw new Error("Note to be deleted not found");
    }

    // Remove the note from the array
    notes.splice(noteIndex, 1);
    
    // Wrtie to file
    writeToJsonFile(notes);
  } catch (error) {
    throw error; 
  }
};


const getNextId = (notes: Note[]): number => {
  // Get maximum Id value and increment by 1
  const maxId = notes.reduce((max, note) => Math.max(max, note.id), 0);
  return maxId + 1;
};

const writeToJsonFile = async (notes: Note[]) => {
  const jsonData = JSON.stringify(notes, null, 2);
  await fs.promises.writeFile(notesDbPath, jsonData, 'utf8');
}

const readJsonFile = async (): Promise<Note[]> => {
  try {
    const data = await fs.promises.readFile(notesDbPath, 'utf8');
    // Parse data to json
    const jsonData = JSON.parse(data);
    
    if (!Array.isArray(jsonData)) {
      throw new Error('Invalid notes format');
    }

    // Map to note model
    const notes: Note[] = jsonData.map((item: any) => {
      return { id: item.id || null, title: item.title, body: item.body };
    });
    
    return notes
  } catch (error) {
    throw error; 
  }
};
