import { collection, deleteDoc, doc, setDoc } from 'firebase/firestore/lite';
import {
  addNewEmptynote,
  deleteNoteById,
  noteUpdated,
  savingNewNote,
  setActiveNote,
  setNotes,
  setPhotosToActiveNote,
  setSaving,
} from './journalSlice';
import { FireBaseDb } from '../../firebase';
import { loadNotes } from '../../helpers/loadNotes';
import { fileUpload } from '../../helpers/fileUpload';

export const startNewNote = () => {
  return async (dispatch, getState) => {
    dispatch(savingNewNote());

    const { uid } = getState().auth;
    const newNote = {
      title: '',
      body: '',
      date: new Date().getTime(),
    };

    const newDoc = doc(collection(FireBaseDb, `${uid}/journal/notes`));

    await setDoc(newDoc, newNote);

    newNote.id = newDoc.id;

    // crear nota
    dispatch(addNewEmptynote(newNote));

    // activar nota
    dispatch(setActiveNote(newNote));
  };
};

export const startLoadingNotes = () => {
  return async (dispatch, getState) => {
    dispatch(savingNewNote());
    const { uid } = getState().auth;

    if (!uid) throw new Error('User ID not exist.');

    const notes = await loadNotes(uid);

    dispatch(setNotes(notes));
  };
};

export const startSaveNote = () => {
  return async (dispatch, getState) => {
    dispatch(setSaving());

    const { uid } = getState().auth;
    const { active: note } = getState().journal;

    const noteToFirestore = { ...note };

    delete noteToFirestore.id;

    const docRef = doc(FireBaseDb, `${uid}/journal/notes/${note.id}`);

    // merge: update partial 'PATCH'
    await setDoc(docRef, noteToFirestore, { merge: true });

    dispatch(noteUpdated(note));
  };
};

export const startUploadingFiles = (files = []) => {
  return async (dispatch, getstate) => {
    dispatch(setSaving());

    const fileUploadPromises = [];

    for (const file of files) {
      fileUploadPromises.push(fileUpload(file));
    }

    const photoUrls = await Promise.all(fileUploadPromises);
    dispatch(setPhotosToActiveNote(photoUrls));
  };
};

export const startDeletingNote = () => {
  return async (dispatch, getState) => {
    const { uid } = getState().auth;
    const { active: note } = getState().journal;

    const docRef = doc(FireBaseDb, `${uid}/journal/notes/${note.id}`);

    await deleteDoc(docRef);

    dispatch(deleteNoteById(note.id));
  };
};
