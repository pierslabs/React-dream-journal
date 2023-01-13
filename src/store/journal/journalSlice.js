import { createSlice } from '@reduxjs/toolkit';
export const journalSlice = createSlice({
  name: 'journal',
  initialState: {
    isSaving: false,
    messageSave: '',
    notes: [],
    active: null,
    // active: {
    //   id: '123',
    //   title: '',
    //   body: '',
    //   date: 123456,
    //   imageUrl: [],
    // },
  },
  reducers: {
    savingNewNote: (state) => {
      state.isSaving = true;
    },

    addNewEmptynote: (state, action) => {
      state.notes.push(action.payload);
      state.isSaving = false;
    },

    setActiveNote: (state, action) => {
      state.active = action.payload;
      state.messageSave = '';
    },

    setNotes: (state, action) => {
      state.notes = action.payload;
      state.isSaving = false;
    },

    setSaving: (state) => {
      state.isSaving = true;
      state.messageSave = '';
      //TODO:
    },

    noteUpdated: (state, action) => {
      state.isSaving = false;

      state.notes = state.notes.map((note) => {
        if (note.id === action.payload.id) {
          return action.payload;
        }

        return note;
      });

      state.messageSave = `${action.payload.title}, updated successfully.`;
    },

    setPhotosToActiveNote: (state, action) => {
      state.active.imageUrl = [...state.active.imageUrl, ...action.payload];
      state.isSaving = false;
    },

    clearNotesLogut: (state) => {
      state.isSaving = false;
      state.messageSave = '';
      state.notes = [];
      state.active = null;
    },

    deleteNoteById: (state, action) => {
      state.notes = state.notes.filter((note) => note.id !== action.payload);
      state.active = null;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  addNewEmptynote,
  setActiveNote,
  setNotes,
  setSaving,
  noteUpdated,
  deleteNoteById,
  savingNewNote,
  setPhotosToActiveNote,
  clearNotesLogut,
} = journalSlice.actions;
