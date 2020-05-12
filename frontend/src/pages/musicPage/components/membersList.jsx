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
  const { currentLobby } = props;
  return (
    <Grid item xs={12} md={6} className={styles.root}>
      <List>
        {currentLobby.users.map(user => (
          <ListItem key={user._id}>
            {user._id === currentLobby.createdBy ? (
              <Badge
                overlap="circle"
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'right',
                }}
                badgeContent={<SettingsOutlinedIcon />}
              >
                <Avatar src={user.thumbnail} />
              </Badge>
            ) : (
              <ListItemAvatar>
                <Avatar src={user.thumbnail} />
              </ListItemAvatar>
            )}
            <ListItemText primary={user.displayName} />
          </ListItem>
        ))}
      </List>
    </Grid>
  );
};

const mapStateToProps = state => ({
  currentLobby: state.lobbyReducer.currentLobby,
});

export default connect(mapStateToProps, null)(MembersList);
