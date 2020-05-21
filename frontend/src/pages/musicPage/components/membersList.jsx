import React from 'react';
import { connect } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import ListItemText from '@material-ui/core/ListItemText';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Badge from '@material-ui/core/Badge';
import SettingsOutlinedIcon from '@material-ui/icons/SettingsOutlined';
import styles from '../styles/membersList.module.css';

const MembersList = props => {
  const { currentLobby, users } = props;
  return (
    <Grid item xs={12} md={6} className={styles.root}>
      <List>
        {users.map(user => (
          <ListItem key={user._id} className={styles.listItem}>
            {user._id === currentLobby.createdBy ? (
              <div className={styles.ownerRow}>
                <Badge
                  overlap="circle"
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                  }}
                  badgeContent={
                    <SettingsOutlinedIcon style={{ height: 20, width: 20, color: 'orange' }} />
                  }
                >
                  <Avatar src={user.thumbnail} style={{ height: 30, width: 30 }} />
                </Badge>
              </div>
            ) : (
              <ListItemAvatar className={styles.avatar}>
                <Avatar src={user.thumbnail} style={{ height: 30, width: 30 }} />
              </ListItemAvatar>
            )}
            <ListItemText
              primary={user.displayName}
              disableTypography
              style={{
                fontSize: '13px',
                fontWeight: 'bold',
                color: 'white',
              }}
            />
          </ListItem>
        ))}
      </List>
    </Grid>
  );
};

const mapStateToProps = state => ({
  currentLobby: state.lobbyReducer.currentLobby,
  users: state.lobbyReducer.users,
});

export default connect(mapStateToProps, null)(MembersList);
