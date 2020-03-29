import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
// import Autocomplete from '@material-ui/lab/Autocomplete';
import MenuItem from '@material-ui/core/MenuItem';
import SearchIcon from '@material-ui/icons/Search';

import styles from '../styles/songSearch.module.css';

const currencies = [
  {
    value: 'USD',
    label: '$',
  },
  {
    value: 'EUR',
    label: '€',
  },
  {
    value: 'BTC',
    label: '฿',
  },
  {
    value: 'JPY',
    label: '¥',
  },
];

const getSearchIcon = () => {
  return <SearchIcon />;
};

const SongSearch = () => {
  const [currency, setCurrency] = useState('EUR');

  const handleChange = event => {
    setCurrency(event.target.value);
  };

  return (
    <div className={styles.root}>
      <TextField
        id="standard-select-currency"
        select
        value={currency}
        onChange={handleChange}
        className={styles.textField}
        InputProps={{ disableUnderline: true }}
        IconComponent={getSearchIcon}
        MenuProps={{
          getContentAnchorEl: null,
          anchorOrigin: {
            vertical: 'bottom',
            horizontal: 'left',
          },
        }}
      >
        {currencies.map(option => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </TextField>
    </div>
  );
};

export default SongSearch;
