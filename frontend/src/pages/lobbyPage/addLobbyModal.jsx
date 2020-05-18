import React, { useState } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Modal from '@material-ui/core/Modal';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import { addLobby } from '../../store/lobby/lobbyActions';
import styles from './modal.module.css';
import ModalTextField from './ModalTextField';
import text from '../../general/text';

const AddLobbyModal = props => {
  const { open, onClose, createLobby } = props;
  const [privateLobby, setPrivateLobby] = useState(false);
  const [lobbyName, setLobbyName] = useState('');
  const [lobbyPassword, setLobbyPassword] = useState('');

  const handlePrivateChange = event => {
    setPrivateLobby(event.target.checked);
  };
  return (
    <div>
      <Modal open={open} onClose={onClose}>
        <div className={styles.modal}>
          <div className={styles.titleContainer}>
            <p className={styles.titleName}>{text.lobbyPage.modal.titleText}</p>
          </div>
          <div className={styles.fieldContainer}>
            <div className={styles.lobbyNameContainer}>
              <ModalTextField
                label={text.lobbyPage.modal.lobbyNameText}
                onChange={event => setLobbyName(event.target.value)}
                className={styles.lobbyNameField}
              />
            </div>
            <div className={styles.lobbyPasswordContainer}>
              {privateLobby && (
                <ModalTextField
                  label={text.lobbyPage.modal.passwordText}
                  onChange={event => setLobbyPassword(event.target.value)}
                  className={styles.lobbyPasswordField}
                />
              )}
            </div>
            <div className={styles.checkContainer}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={privateLobby}
                    onChange={handlePrivateChange}
                    className={styles.checkBox}
                  />
                }
                label={text.lobbyPage.modal.checkBoxText}
              />
            </div>
          </div>
          <div className={styles.buttonContainer}>
            <Button
              className={styles.createButton}
              onClick={() => {
                createLobby(lobbyName, !privateLobby, lobbyPassword);
                onClose();
              }}
            >
              {text.lobbyPage.modal.buttonText}
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

const mapDispatchToProps = dispatch => ({
  createLobby: bindActionCreators(addLobby, dispatch),
});

export default connect(null, mapDispatchToProps)(AddLobbyModal);
