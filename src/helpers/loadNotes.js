import { collection, getDocs } from 'firebase/firestore/lite';
import { FireBaseDb } from '../firebase';

export const loadNotes = async (uid = '') => {
  if (!uid) throw new Error('User ID not exist.');

  const collectionRef = collection(FireBaseDb, `${uid}/journal/notes`);
  const docs = await getDocs(collectionRef);

  const notes = [];

  docs.forEach((doc) => {
    notes.push({ id: doc.id, ...doc.data() });
  });

  return notes;
};
