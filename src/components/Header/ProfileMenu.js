import { Person as AccountIcon } from '@mui/icons-material';
import { IconButton, Menu, MenuItem } from '@mui/material';
import classNames from 'classnames';
import React, { useState } from 'react';
import {
  changePassword,
  getOrders,
  getPayment,
  getProfile,
  hostForm,
  signOut,
  signUp,
  updateRoles,
  useUserDispatch,
  useUserState,
} from '../../context/UserContext';
import { Typography } from '../Wrappers/Wrappers';

export default function ProfileMenu(props) {
  var [profileMenu, setProfileMenu] = useState(null);
  var userDispatch = useUserDispatch();
  var classes = props.classes;
  var { isAuthenticated, userId, roles } = useUserState();

  //console.log(isAuthenticated);

  const signIn = () => {
    // this is the dev url which is the default for local developement.
    var url =
      'https://devsignin.lightapi.net?client_id=f7d42348-c647-4efb-a52d-4c5787421e72&user_type=customer&state=1222';
    if (process.env.REACT_APP_SIGNIN_URL)
      url = process.env.REACT_APP_SIGNIN_URL + '&user_type=customer&state=1222';
    window.location = url;
  };

  return (
    <React.Fragment>
      <IconButton
        aria-haspopup="true"
        color="inherit"
        className={classes.headerMenuButton}
        aria-controls="profile-menu"
        onClick={(e) => setProfileMenu(e.currentTarget)}
      >
        <AccountIcon classes={{ root: classes.headerIcon }} />
      </IconButton>
      <Menu
        id="profile-menu"
        open={Boolean(profileMenu)}
        anchorEl={profileMenu}
        onClose={() => setProfileMenu(null)}
        className={classes.headerMenu}
        classes={{ paper: classes.profileMenu }}
        disableAutoFocusItem
      >
        {isAuthenticated ? (
          <div>
            <div className={classes.profileMenuUser}>
              <Typography variant="h6" weight="medium">
                {userId}
              </Typography>
            </div>
            <MenuItem
              className={classNames(
                classes.profileMenuItem,
                classes.headerMenuItem
              )}
              onClick={() => {
                getProfile(userDispatch, props.history);
                setProfileMenu(false);
              }}
            >
              <AccountIcon className={classes.profileMenuIcon} /> Profile
            </MenuItem>
            <MenuItem
              className={classNames(
                classes.profileMenuItem,
                classes.headerMenuItem
              )}
              onClick={() => {
                getPayment(userDispatch, props.history);
                setProfileMenu(false);
              }}
            >
              <AccountIcon className={classes.profileMenuIcon} /> Payment
            </MenuItem>
            {roles.includes('admin') ? (
              <MenuItem
                className={classNames(
                  classes.profileMenuItem,
                  classes.headerMenuItem
                )}
                onClick={() => {
                  updateRoles(userDispatch, props.history);
                  setProfileMenu(false);
                }}
              >
                <AccountIcon className={classes.profileMenuIcon} /> Update Roles
              </MenuItem>
            ) : null}
            <MenuItem
              className={classNames(
                classes.profileMenuItem,
                classes.headerMenuItem
              )}
              onClick={() => {
                getOrders(userDispatch, props.history);
                setProfileMenu(false);
              }}
            >
              <AccountIcon className={classes.profileMenuIcon} /> Orders
            </MenuItem>
            <MenuItem
              className={classNames(
                classes.profileMenuItem,
                classes.headerMenuItem
              )}
              onClick={() => {
                hostForm(userDispatch, props.history);
                setProfileMenu(false);
              }}
            >
              <AccountIcon className={classes.profileMenuIcon} /> Host
            </MenuItem>
            <MenuItem
              className={classNames(
                classes.profileMenuItem,
                classes.headerMenuItem
              )}
            >
              <AccountIcon className={classes.profileMenuIcon} /> Tasks
            </MenuItem>
            <MenuItem
              className={classNames(
                classes.profileMenuItem,
                classes.headerMenuItem
              )}
            >
              <AccountIcon className={classes.profileMenuIcon} /> Messages
            </MenuItem>
            <MenuItem
              className={classNames(
                classes.profileMenuItem,
                classes.headerMenuItem
              )}
            >
              <AccountIcon className={classes.profileMenuIcon} /> Notifications
            </MenuItem>
            <div className={classes.profileMenuUser}>
              <Typography
                className={classes.profileMenuLink}
                color="primary"
                onClick={() => {
                  changePassword(userDispatch, props.history);
                  setProfileMenu(false);
                }}
              >
                Change Password
              </Typography>
            </div>
            <div className={classes.profileMenuUser}>
              <Typography
                className={classes.profileMenuLink}
                color="primary"
                onClick={() => signOut(userDispatch, props.history)}
              >
                Sign Out
              </Typography>
            </div>
          </div>
        ) : (
          <div>
            <div className={classes.profileMenuUser}>
              <Typography
                className={classes.profileMenuLink}
                color="primary"
                onClick={signIn}
              >
                Sign In
              </Typography>
            </div>
            <div className={classes.profileMenuUser}>
              <Typography
                className={classes.profileMenuLink}
                color="primary"
                onClick={() => {
                  signUp(userDispatch, props.history);
                  setProfileMenu(false);
                }}
              >
                Sign Up
              </Typography>
            </div>
          </div>
        )}
      </Menu>
    </React.Fragment>
  );
}
