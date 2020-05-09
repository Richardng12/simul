import React, { useState } from 'react';
import { useHistory } from 'react-router';
import Modal from '@material-ui/core/Modal';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const EnterPasswordModal = props => {
  const { open, onClose, name, password, lobbyId } = props;
  const history = useHistory();
  const [input, setInput] = useState('');

  const checkPassword = () => {
    if (input === password) {
      history.push(`/lobby/${lobbyId}`);
    }
  };
  return (
    <div>
      <Modal
        open={open}
        onClose={onClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <div>
          {name} {password}
          <TextField onChange={event => setInput(event.target.value)} />
          <Button
            onClick={() => {
              checkPassword();
            }}
          >
            Enter
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default EnterPasswordModal;
