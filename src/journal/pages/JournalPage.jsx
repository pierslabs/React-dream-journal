import { useDispatch, useSelector } from 'react-redux';
import { startNewNote } from '../../store/journal/thunks';
import { NoteView, NothingSelectedView } from '../view';

import { AddOutlined } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import JournalLayout from '../Layout/JournalLayout';

const JournalPage = () => {
  const dispatch = useDispatch();
  const { isSaving, active } = useSelector((state) => state.journal);

  const onclickNote = () => {
    dispatch(startNewNote());
  };

  return (
    <JournalLayout>
      {active ? <NoteView /> : <NothingSelectedView />}
      <IconButton
        onClick={onclickNote}
        disabled={isSaving}
        size="large"
        sx={{
          color: 'white',
          backgroundColor: 'button.main',
          ':hover': { backgroundColor: 'button.main', opacity: 0.9 },
          position: 'fixed',
          right: 50,
          bottom: 50,
        }}
      >
        <AddOutlined sx={{ fontSize: 30 }} />
      </IconButton>
    </JournalLayout>
  );
};

export default JournalPage;
