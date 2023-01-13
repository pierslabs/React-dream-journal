import { useMemo } from 'react';
import { TurnedInNot } from '@mui/icons-material';
import {
  Grid,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import { useDispatch } from 'react-redux';
import { setActiveNote } from '../../store/journal';

const SideBarItem = ({ id, title, body, date, imageUrl = [] }) => {
  const dispatch = useDispatch();

  const newTitle = useMemo(() => {
    return title.length > 17 ? title.substring(0, 17) + '...' : title;
  }, [title]);

  const onActivateNote = () => {
    dispatch(setActiveNote({ id, title, body, date, imageUrl }));
  };

  return (
    <ListItem disablePadding>
      <ListItemButton onClick={onActivateNote}>
        <ListItemIcon>
          <TurnedInNot />
        </ListItemIcon>
        <Grid container>
          <ListItemText primary={newTitle} />
          <ListItemText secondary={body} />
        </Grid>
      </ListItemButton>
    </ListItem>
  );
};

export default SideBarItem;
