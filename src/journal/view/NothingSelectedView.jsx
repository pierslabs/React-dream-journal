import { StarOutline } from '@mui/icons-material';
import { Grid, Typography } from '@mui/material';
import React from 'react';

const NothingSelectedView = () => {
  return (
    <Grid
      className="animate__animated animate__zoomIn animate__faster"
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
      sx={{
        minHeight: '100vh',
        backgroundColor: 'primary.main',
        padding: 4,
        borderRadius: 3,
      }}
    >
      <Grid item xs={12}>
        <StarOutline sx={{ fontSize: 100, color: 'white' }} />
      </Grid>
      <Grid item xs={12}>
        <Typography color="white" variant="h5">
          Select or Create new Entry
        </Typography>{' '}
      </Grid>
    </Grid>
  );
};

export default NothingSelectedView;
