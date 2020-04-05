import React from 'react';
import Grid from '@material-ui/core/Grid';
import ListItemText from '@material-ui/core/ListItemText';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import AccountCircleOutlined from '@material-ui/icons/AccountCircleOutlined';
import Avatar from '@material-ui/core/Avatar';
import Badge from '@material-ui/core/Badge';
import SettingsOutlinedIcon from '@material-ui/icons/SettingsOutlined';
import styles from '../styles/membersList.module.css';

function createData(name, admin) {
  return { name, admin };
}

const rows = [
  createData('Allen Nian', true),
  createData('Richard Ng', false),
  createData('Brian Nguyen', false),
  createData('Edward Zhang', false),
  createData('Allen Nian', true),
  createData('Richard Ng', false),
  createData('Brian Nguyen', false),
  createData('Edward Zhang', false),
];

const MembersList = () => {
  return (
    <Grid item xs={12} md={6} className={styles.root}>
      <List>
        {rows.map(row => (
          <ListItem>
            {row.admin ? (
              <Badge
                overlap="circle"
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'right',
                }}
                badgeContent={<SettingsOutlinedIcon />}
              >
                <Avatar>
                  <AccountCircleOutlined />
                </Avatar>
              </Badge>
            ) : (
              <ListItemAvatar>
                <Avatar>
                  <AccountCircleOutlined />
                </Avatar>
              </ListItemAvatar>
            )}
            <ListItemText primary={row.name} />
          </ListItem>
        ))}
      </List>
    </Grid>
  );
};

export default MembersList;
