/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/no-array-index-key */
import React, { useState, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CircularProgress from '@material-ui/core/CircularProgress';
import { SONGS } from '../../../config/config';

const SongSearch = () => {
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState([]);
  const [input, setInput] = useState('');
  const loading = open && options.length === 0;

  useEffect(() => {
    let active = true;

    if (!loading) {
      return undefined;
    }
    (async () => {
      console.log(input);
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
            endAdornment: (
              <>
                {loading ? <CircularProgress color="inherit" size={20} /> : null}
                {params.InputProps.endAdornment}
              </>
            ),
          }}
        />
      )}
    />
  );
};

export default SongSearch;
