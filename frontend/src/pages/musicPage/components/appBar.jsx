import React from 'react';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

function AppBar() {
  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">SIMUL</Typography>
          <Typography variant="h6">LOBBY</Typography>
          <Typography variant="h6">ALLEN</Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default AppBar;
