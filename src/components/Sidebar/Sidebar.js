// import Drawer from '@mui/material/Drawer';
import {
  ArrowBack as ArrowBackIcon,
  BorderAll as TableIcon,
  HelpOutline as FAQIcon,
  Home as HomeIcon,
  LibraryBooks as LibraryIcon,
  NotificationsNone as NotificationsIcon,
  Toc as OrderIcon,
} from '@mui/icons-material';
import AccountBox from '@mui/icons-material/AccountBox';
import AddAlert from '@mui/icons-material/AddAlert';
import AlarmIcon from '@mui/icons-material/Alarm';
import AnnouncementIcon from '@mui/icons-material/Announcement';
import BookIcon from '@mui/icons-material/Book';
import Business from '@mui/icons-material/Business';
import CastForEducationIcon from '@mui/icons-material/CastForEducation';
import ForumIcon from '@mui/icons-material/Forum';
import HelpIcon from '@mui/icons-material/Help';
import PermDataSettingIcon from '@mui/icons-material/PermDataSetting';
import PublishIcon from '@mui/icons-material/Publish';
import SecurityIcon from '@mui/icons-material/Security';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import { Drawer, IconButton, List } from '@mui/material';
import { useTheme } from '@mui/styles';
import classNames from 'classnames';
import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
// context
import {
  toggleSidebar,
  useLayoutDispatch,
  useLayoutState,
} from '../../context/LayoutContext';
import { useUserState } from '../../context/UserContext';
// components
import SidebarLink from './components/SidebarLink/SidebarLink';
// styles
import useStyles from './styles';

const structure = [
  { id: 0, label: 'Home', link: '/app/dashboard', icon: <HomeIcon /> },
//  { id: 3, label: 'Scheduler', link: '/app/scheduler', icon: <AlarmIcon /> },
  {
    id: 5,
    label: 'Controller',
    link: '/app/controller/services',
    icon: <SportsEsportsIcon />,
  },
  {
    id: 7,
    label: 'Configuration',
    link: '/app/form/servicesRef',
    icon: <PermDataSettingIcon />,
  },
  { id: 90, type: 'divider', role: 'admin' },
  {
    id: 110,
    label: 'Client Admin',
    role: 'admin',
    link: '/app/client/admin',
    icon: <LibraryIcon />,
    children: [
      { label: 'Register', link: '/app/client/register' },
      { label: 'Update', link: '/app/client/update' },
      { label: 'Delete', link: '/app/client/delete' },
      { label: 'Service Request', link: '/app/client/request' },
    ],
  },
  {
    id: 115,
    label: 'Config Admin',
    role: 'admin',
    link: '/app/config/admin',
    icon: <LibraryIcon />,
    children: [
      { label: 'Properties', link: '/app/form/propertiesRef' },
      { label: 'Global Values', link: '/app/form/globalsRef' },
      { label: 'Global Files', link: '/app/form/globalsFileRef' },
      { label: 'Global Certs', link: '/app/form/globalsCertRef' },
    ],
  },
  {
    id: 120,
    label: 'Service Admin',
    role: 'admin',
    link: '/app/service/admin',
    icon: <LibraryIcon />,
    children: [
      { label: 'Register', link: '/app/service/register' },
      { label: 'Update', link: '/app/service/update' },
      { label: 'Delete', link: '/app/service/delete' },
      { label: 'Client Approval', link: '/app/service/approval' },
    ],
  },
];

function Sidebar({ location }) {
  var classes = useStyles();
  var theme = useTheme();
  // console.log('Sidebar: theme=', theme)


  // global
  var { isSidebarOpened } = useLayoutState();
  var layoutDispatch = useLayoutDispatch();
  var { roles } = useUserState();

  // local
  var [isPermanent, setPermanent] = useState(true);

  useEffect(function () {
    window.addEventListener('resize', handleWindowWidthChange);
    handleWindowWidthChange();
    return function cleanup() {
      window.removeEventListener('resize', handleWindowWidthChange);
    };
  });

  return (
    <Drawer
      variant={isPermanent ? 'permanent' : 'temporary'}
      className={classNames(classes.drawer, {
        [classes.drawerOpen]: isSidebarOpened,
        [classes.drawerClose]: !isSidebarOpened,
      })}
      classes={{
        paper: classNames({
          [classes.drawerOpen]: isSidebarOpened,
          [classes.drawerClose]: !isSidebarOpened,
        }),
      }}
      open={isSidebarOpened}
    >
      <div className={classes.toolbar} />
      <div className={classes.mobileBackButton}>
        <IconButton onClick={() => toggleSidebar(layoutDispatch)} size="large">
          <ArrowBackIcon
            classes={{
              root: classNames(classes.headerIcon, classes.headerIconCollapse),
            }}
          />
        </IconButton>
      </div>
      <List className={classes.sidebarList}>
        {structure
          .filter((link) => permission(link.role, roles))
          .map((link) => (
            <SidebarLink
              key={link.id}
              location={location}
              isSidebarOpened={isSidebarOpened}
              {...link}
            />
          ))}
      </List>
    </Drawer>
  );

  function permission(linkRole, userRoles) {
    if (userRoles == null) {
      if (linkRole == null) {
        return true;
      } else {
        return false;
      }
    } else {
      if (linkRole == null) {
        return true;
      } else {
        if (userRoles.includes(linkRole)) {
          return true;
        } else {
          return false;
        }
      }
    }
  }

  function handleWindowWidthChange() {
    var windowWidth = window.innerWidth;
    var breakpointWidth = theme.breakpoints.values.md;
    var isSmallScreen = windowWidth < breakpointWidth;

    if (isSmallScreen && isPermanent) {
      setPermanent(false);
    } else if (!isSmallScreen && !isPermanent) {
      setPermanent(true);
    }
  }
}

export default withRouter(Sidebar);
