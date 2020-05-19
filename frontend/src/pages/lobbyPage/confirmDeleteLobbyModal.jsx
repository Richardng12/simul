/* eslint no-unused-vars: 0 */
import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Modal from '@material-ui/core/Modal';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import classNames from 'classnames';
import { deleteLobby } from '../../store/lobby/lobbyActions';
import styles from './modal.module.css';
import style from './lobbyPage.module.css';
import ModalTextField from './ModalTextField';
import text from '../../general/text';

const ConfirmDeleteLobbyModal = props => {
  const { open, onClose, lobbyName, lobbyId, deleteLobbyFromDB } = props;

  return (
    <div>
      <Modal
        open={open}
        onClose={() => {
          onClose();
        }}
      >
        <div className={classNames(styles.modal, styles.deleteLobbyModal)}>
          <div className={styles.titleContainer}>
            <p className={styles.titleName}>{lobbyName}</p>
          </div>
          <div className={styles.lobbyValidation}>
            <Typography>{text.lobbyPage.modal.deleteConfirmationText}</Typography>
          </div>
          <div className={styles.buttonContainer}>
            <Button onClick={onClose} className={styles.cancelButton}>
              Cancel
            </Button>
            <Button
              className={styles.createButton}
              onClick={() => {
                deleteLobbyFromDB(lobbyId);
              }}
            >
              DELETE
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

const mapDispatchToProps = dispatch => ({
  deleteLobbyFromDB: bindActionCreators(deleteLobby, dispatch),
});

export default connect(null, mapDispatchToProps)(ConfirmDeleteLobbyModal);
