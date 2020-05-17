import React from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/styles';
import classNames from 'classnames';

const useStyles = makeStyles({
  root: {
    '& .MuiOutlinedInput-root': {
      backgroundColor: '#606060',
      border: 'none',
      borderRadius: '25px',
    },
    '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
      border: '#f6a333 solid 2px',
    },
    '& .MuiFormLabel-root.Mui-focused': {
      color: '#f6a333',
    },
  },
});

const SearchField = ({ onChange, label, className }) => {
  const classes = useStyles();
  return (
    <TextField
      className={classNames(classes.root, className)}
      label={label}
      variant="outlined"
      onChange={onChange}
    />
  );
};

export default SearchField;
