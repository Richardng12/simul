import React from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/styles';
import classNames from 'classnames';
import withStyles from '@material-ui/core/styles/withStyles';

const useStyles = makeStyles({
  root: {
    height: 40,
    '& .MuiOutlinedInput-root': {
      backgroundColor: '#4a4747',
      border: 'none',
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

const ModalTextField = ({ onChange, label, className, classes }) => {
  const styleClasses = useStyles();
  return (
    <TextField
      className={classNames(styleClasses.root, className)}
      height={20}
      label={label}
      InputProps={{ classes: { input: classes.input2 } }}
      variant="outlined"
      onChange={onChange}
    />
  );
};

export default withStyles(styles)(ModalTextField);
