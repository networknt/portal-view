import classnames from 'classnames';
import React from 'react';
import Header from '../Header';
import Sidebar from '../Sidebar';
import useStyles from './styles';
import { Outlet } from 'react-router-dom';
import { useLayoutState } from '../../contexts/LayoutContext';

function Layout() {
  var classes = useStyles();
  var layoutState = useLayoutState();

  return (
    <div className={classes.root}>
      <Header />
      <Sidebar />
      <div
        className={classnames(classes.content, {
          [classes.contentShift]: layoutState.isSidebarOpened,
        })}
      >
        <div className={classes.fakeToolbar} />
        <Outlet />
      </div>
    </div>
  );
}

export default Layout;
