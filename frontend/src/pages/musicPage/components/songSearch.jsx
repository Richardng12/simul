import React from 'react';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';

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

function SongSearch() {
  const [currency, setCurrency] = React.useState('EUR');

  const handleChange = event => {
    setCurrency(event.target.value);
  };

  return (
    <div>
      <TextField
        id="standard-select-currency"
        select
        label="Select"
        value={currency}
        onChange={handleChange}
        helperText="Please select your currency"
      >
        {currencies.map(option => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </TextField>
    </div>
  );
}

export default SongSearch;
