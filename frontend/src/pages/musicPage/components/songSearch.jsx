/* eslint-disable react/jsx-props-no-spreading */
import React, { useState, useEffect } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { addSongToQueue } from '../../../store/lobby/lobbyActions';
import { SONGS } from '../../../config/config';

const SongSearch = props => {
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState([]);
  const [input, setInput] = useState('');
  const loading = open && input !== '';
  const { addSong } = props;
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
        }
      }}
      renderInput={params => (
        <TextField
          {...params}
          label="Search Songs"
          variant="outlined"
          onChange={event => {
            setInput(event.target.value);
          }}
          InputProps={{
            ...params.InputProps,
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

export default connect(null, mapDispatchToProps)(SongSearch);
