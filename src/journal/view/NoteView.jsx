import { useEffect, useMemo, useRef } from 'react';
import { useForm } from '../../hooks/useForm';

import { setActiveNote } from '../../store/journal';
import {
  startDeletingNote,
  startSaveNote,
  startUploadingFiles,
} from '../../store/journal/thunks';

import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.css';

import { ImageGallery } from '../components';
import {
  DeleteOutline,
  SaveOutlined,
  UploadOutlined,
} from '@mui/icons-material';
import { Button, Grid, IconButton, TextField, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';

const NoteView = () => {
  const dispatch = useDispatch();

  const {
    active: note,
    messageSave,
    isSaving,
  } = useSelector((state) => state.journal);

  const { body, title, onInputChange, formState, date } = useForm(note);

  const dateString = useMemo(() => {
    const newDate = new Date(date).toUTCString();
    return newDate;
  }, [date]);

  const fileInputRef = useRef();

  const onSaveNote = () => {
    dispatch(startSaveNote());
  };

  const onFileInputChange = ({ target }) => {
    if (target.files === 0) return;

    dispatch(startUploadingFiles(target.files));
  };

  const onDelete = () => {
    dispatch(startDeletingNote());
  };

  useEffect(() => {
    dispatch(setActiveNote(formState));
  }, [formState]);

  useEffect(() => {
    if (messageSave.length > 0) {
      Swal.fire('Dream updated', messageSave, 'success');
    }
  }, [messageSave]);

  return (
    <Grid
      container
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      sx={{ mb: 1 }}
    >
      <Grid item>
        <Typography fontSize={39} fontWeight="light">
          {dateString}
        </Typography>
      </Grid>

      <input
        type="file"
        multiple
        onChange={onFileInputChange}
        style={{ display: 'none' }}
        ref={fileInputRef}
      />

      <IconButton onClick={() => fileInputRef.current.click()}>
        <UploadOutlined color="primary" disabled={false} />
      </IconButton>

      <Grid item>
        <Button
          disabled={isSaving}
          onClick={onSaveNote}
          color="primary"
          sx={{ padding: 2 }}
        >
          <SaveOutlined sx={{ fontSize: 30, mr: 1 }} />
          Guardar
        </Button>
      </Grid>

      <Grid container>
        <TextField
          type="text"
          variant="filled"
          fullWidth
          placeholder="Entry a Title"
          label={title}
          sx={{ border: 'none', mb: 1 }}
          name="title"
          value={title}
          onChange={onInputChange}
        />
        <TextField
          type="text"
          variant="filled"
          fullWidth
          multiline
          placeholder="what have you dreamed today?"
          label={body}
          minRows={5}
          sx={{ border: 'none', mb: 1 }}
          name="body"
          value={body}
          onChange={onInputChange}
        />
      </Grid>

      <Grid container justifyContent="end">
        <Button onClick={onDelete} sx={{ mt: 2 }} color="error">
          <DeleteOutline />
        </Button>
      </Grid>
      <ImageGallery images={note.imageUrl} />
    </Grid>
  );
};

export default NoteView;
