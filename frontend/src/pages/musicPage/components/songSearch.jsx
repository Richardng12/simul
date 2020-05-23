/* eslint-disable react/jsx-props-no-spreading */
import React, { useState, useEffect } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { makeStyles } from '@material-ui/styles';
import withStyles from '@material-ui/core/styles/withStyles';
import { useParams } from 'react-router';
import socket from '../../../socket';
import { addSongToQueue } from '../../../store/lobby/lobbyActions';
import { SONGS } from '../../../config/config';

const useStyles = makeStyles({
  root: {
    height: 40,
    '& .MuiOutlinedInput-root': {
      backgroundColor: '#4a4747',
      border: 'none',
      borderRadius: '25px',
    },
    '& .MuiInputLabel-outlined': {
      transform: 'translate(14px,10px) scale(1)',
    },
    '& .MuiInputLabel-outlined.MuiInputLabel-shrink': {
      transform: 'translate(14px,-6px) scale(0.75)',
    },
    '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
      border: '#f6a333 solid 1.5px',
    },
    '& .MuiFormLabel-root.Mui-focused': {
      color: '#f6a333',
    },
    '& .MuiFormLabel-root': {
      color: '#B9B9B9',
    },
  },
});

const styles = {
  input2: {
    height: 0,
  },
};

const SongSearch = props => {
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState([]);
  const [input, setInput] = useState('');
  const loading = open && input !== '';
  const { addSong, classes } = props;

  const styleClasses = useStyles();

  const { id } = useParams();
  useEffect(() => {
    let active = true;

    if (!loading) {
      return undefined;
    }
    (async () => {
      const response = await fetch(`${SONGS}?${new URLSearchParams({ value: input, limit: 10 })}`, {
        method: 'GET',
        mode: 'cors',
        credentials: 'include',
      });
      const songs = await response.json();
      if (active) {
        setOptions(songs);
      }
    })();

    return () => {
      active = false;
    };
  }, [input]);

  useEffect(() => {
    if (!open) {
      setOptions([]);
    }
  }, [open]);

  return (
    <Autocomplete
      id="asynchronous-demo"
      style={{ width: 300 }}
      open={open}
      onOpen={() => {
        setOpen(true);
      }}
      onClose={() => {
        setOpen(false);
      }}
      getOptionSelected={(option, value) => option.name === value.name}
      getOptionLabel={option => `${option.title}-${option.artist}`}
      options={options}
      loading={loading}
      onChange={(event, value) => {
        if (value !== null) {
          addSong(value.spotifySongId);
          console.log(`lobby serach id is ${id}`);
          socket.emit('playMusic', id);
        }
      }}
      renderInput={params => (
        <TextField
          className={styleClasses.root}
          {...params}
          label="Search Songs"
          variant="outlined"
          onChange={event => {
            setInput(event.target.value);
          }}
          InputProps={{
            ...params.InputProps,
            classes: { input: classes.input2 },
            endAdornment: <>{params.InputProps.endAdornment}</>,
          }}
        />
      )}
    />
  );
};

const mapDispatchToProps = dispatch => ({
  addSong: bindActionCreators(addSongToQueue, dispatch),
});

export default connect(null, mapDispatchToProps)(withStyles(styles)(SongSearch));
