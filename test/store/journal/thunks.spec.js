import { collection, deleteDoc, getDocs } from 'firebase/firestore/lite';
import { FireBaseDb } from '../../../src/firebase';
import {
  addNewEmptynote,
  savingNewNote,
  setActiveNote,
} from '../../../src/store/journal/journalSlice';
import { startNewNote } from '../../../src/store/journal/thunks';

describe('Journal thunk  ### FiREBASE ###', () => {
  const dispatch = jest.fn();

  const getstate = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });
  test('should startNote create a note', async () => {
    const uid = '123456';
    getstate.mockReturnValue({ auth: { uid: uid } });
    await startNewNote()(dispatch, getstate);

    expect(dispatch).toHaveBeenCalledWith(savingNewNote());
    expect(dispatch).toHaveBeenCalledWith(
      addNewEmptynote({
        body: '',
        title: '',
        id: expect.any(String),
        date: expect.any(Number),
      })
    );

    expect(dispatch).toHaveBeenCalledWith(
      setActiveNote({
        body: '',
        title: '',
        id: expect.any(String),
        date: expect.any(Number),
      })
    );

    //Borra de firebase

    const collectionRef = collection(FireBaseDb, `${uid}/journal/notes`);
    const docs = await getDocs(collectionRef);

    const deletePromises = [];

    docs.forEach((doc) => deletePromises.push(deleteDoc(doc.ref)));

    await Promise.all(deletePromises);
  });
});
