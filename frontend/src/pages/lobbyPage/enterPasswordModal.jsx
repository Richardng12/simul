/* eslint no-unused-vars: 0 */
import React, { useState } from 'react';
import { useHistory } from 'react-router';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import classNames from 'classnames';
import styles from './modal.module.css';
import style from './lobbyPage.module.css';
import ModalTextField from './ModalTextField';
import text from '../../general/text';

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
      <Modal open={open} onClose={onClose}>
        <div className={classNames(styles.modal, styles.passwordModal)}>
          <div className={styles.titleContainer}>
            <p className={styles.titleName}> {name}</p>
          </div>
          <div>
            <ModalTextField
              label="Password"
              onChange={event => setInput(event.target.value)}
              className={style.searchField}
            />
          </div>
          <div className={styles.passwordButtonContainer}>
            <Button onClick={onClose} className={styles.cancelButton}>
              Cancel
            </Button>
            <Button
              className={styles.createButton}
              onClick={() => {
                checkPassword();
              }}
            >
              Enter
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default EnterPasswordModal;
