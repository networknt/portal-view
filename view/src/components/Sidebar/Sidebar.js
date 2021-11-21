import React, { useState, useEffect } from "react";
import { Drawer, IconButton, List } from "@material-ui/core";
import {
  Home as HomeIcon,
  NotificationsNone as NotificationsIcon,
  FormatSize as TypographyIcon,
  FilterNone as UIElementsIcon,
  BorderAll as TableIcon,
  QuestionAnswer as SupportIcon,
  LibraryBooks as LibraryIcon,
  HelpOutline as FAQIcon,
  ArrowBack as ArrowBackIcon,
  Toc as OrderIcon,
} from "@material-ui/icons";

import AddAlert from '@material-ui/icons/AddAlert';
import Business from '@material-ui/icons/Business';
import AccountBox from '@material-ui/icons/AccountBox'
import PublishIcon from '@material-ui/icons/Publish';
import SportsEsportsIcon from '@material-ui/icons/SportsEsports';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import AnnouncementIcon from '@material-ui/icons/Announcement';
import CastForEducationIcon from '@material-ui/icons/CastForEducation';
import SecurityIcon from '@material-ui/icons/Security';
import BookIcon from '@material-ui/icons/Book';
import HelpIcon from '@material-ui/icons/Help';
import ForumIcon from '@material-ui/icons/Forum';
import { useTheme } from "@material-ui/styles";
import { withRouter } from "react-router-dom";
import classNames from "classnames";
import { useUserState } from "../../context/UserContext";

// styles
import useStyles from "./styles";

// components
import SidebarLink from "./components/SidebarLink/SidebarLink";

// context
import {
  useLayoutState,
  useLayoutDispatch,
  toggleSidebar,
} from "../../context/LayoutContext";

const structure = [
  { id: 0, label: "Dashboard", link: "/app/dashboard", icon: <HomeIcon /> },
  { id: 10, label: "OAuth 2.0", role: "user", link: "/app/oauth", icon: <SecurityIcon />,
      children: [
        { label: "Refresh Token", link: "/app/refreshToken" },
      ]
  },
  { id: 20, label: "Marketplace", link: "/app/marketplace", icon: <ShoppingBasketIcon />,
      children: [
        { label: "API Client", link: "/app/client" },
        { label: "Restful API", link: "/app/restful" },
        { label: "GraphQL API", link: "/app/graphql" },
        { label: "Hybrid API", link: "/app/hybrid" },
        { label: "Schema Form", link: "/app/form/schemaFormFilter" },
        { label: "JSON Schema", link: "/app/schema/schemaList" },
        { label: "YAML Rule", link: "/app/rule/ruleList" },
      ]
  },
  { id: 23, label: "Publish", role: "user", link: "/app/publish", icon: <PublishIcon />,
      children: [
        { label: "API Restful", link: "/app/publishApi?style=Restful" },
        { label: "API GraphQL", link: "/app/publishApi?style=GraphQL" },
        { label: "API Hybrid", link: "/app/publishApi?style=Hybrid" },
        { label: "Schema Form", link: "/app/form/createSchemaForm" },
        { label: "JSON Schema", link: "/app/form/createJsonSchema" },
        { label: "Error Code", link: "/app/form/createErrorCode" },
        { label: "YAML Rule", link: "/app/form/createRule" },
      ]
  },

  { id: 25, label: "Reference", role: "admin", link: "/app/reference", icon: <TableIcon />,
      children: [
        { label: "Table", link: "/app/ref/table" },
        { label: "Value", link: "/app/ref/tableForm" },
        { label: "Locale", link: "/app/ref/valueForm" },
        { label: "RelaType", link: "/app/ref/relatype" },
        { label: "Relation", link: "/app/ref/relationForm" },
      ]
  },

  { id: 30, label: "Notifications", role: "user", link: "/app/notifications", icon: <NotificationsIcon /> },
  { id: 40, label: "News", link: "/app/news", icon: <AnnouncementIcon /> },
  { id: 50, label: "Blog", link: "/app/blog/blogList", icon: <BookIcon /> },
  { id: 60, label: "Forum", link: "/app/forum", icon: <ForumIcon /> },
  { id: 65, label: "Training", role: "user", link: "/app/training", icon: <CastForEducationIcon />,
    children: [
      { label: "Course", link: "/app/edu/course" },
      { label: "Quiz", link: "/app/edu/quiz" },
      { label: "Progress", link: "/app/edu/progress" },
      { label: "Certificate", link: "/app/edu/certificate" }
    ]
  },
  { id: 70, label: "Support", link: "/app/support", icon: <HelpIcon /> },
  { id: 80, label: "FAQ", link: "/app/faq", icon: <FAQIcon /> },
  
  { id: 90, type: "divider", role: "orgadm" },
  { id: 100, type: "title", role: "orgadm", label: "ADMIN" },
  { id: 110, label: "Client Admin", role: "orgadm", link: "/app/client/admin", icon: <LibraryIcon />,
    children: [
      { label: "Register", link: "/app/client/register" },
      { label: "Update", link: "/app/client/update" },
      { label: "Delete", link: "/app/client/delete" },
      { label: "Service Request", link: "/app/client/request" },
    ]
  },
  { id: 120, label: "Service Admin", role: "orgadm", link: "/app/service/admin", icon: <LibraryIcon />,
    children: [
      { label: "Register", link: "/app/service/register" },
      { label: "Update", link: "/app/service/update" },
      { label: "Delete", link: "/app/service/delete" },
      { label: "Client Approval", link: "/app/service/approval" },
    ]
  },
  { id: 122, type: "divider" },
  { id: 125, label: "Category Admin", role: "admin", link: "/app/category/admin", icon: <LibraryIcon />,
    children: [
      { label: "List", link: "/app/category/list" },
      { label: "Create", link: "/app/form/createCategory" },
      { label: "Update", link: "/app/form/updateCategory" },
      { label: "Delete", link: "/app/form/deleteCategory" }
    ]
  },
  { id: 130, label: "News Admin", role: "orgadm", link: "/app/news/admin", icon: <LibraryIcon />,
    children: [
      { label: "Create", link: "/app/news/create" },
      { label: "Update", link: "/app/news/update" },
      { label: "Delete", link: "/app/news/delete" }
    ]
  },
  { id: 140, label: "Blog Admin", role: "admin", link: "/app/blog/admin", icon: <LibraryIcon />,
    children: [
      { label: "List", link: "/app/blog/adminList" },
      { label: "Create", link: "/app/form/createBlog" },
      { label: "Update", link: "/app/blog/update" },
      { label: "Delete", link: "/app/blog/delete" }
    ]
  },
  { id: 141, label: "Error Admin", role: "admin", link: "/app/error/admin", icon: <LibraryIcon />,
    children: [
      { label: "List", link: "/app/error/adminList" },
      { label: "Create", link: "/app/form/createError" },
      { label: "Update", link: "/app/error/update" },
      { label: "Delete", link: "/app/error/delete" }
    ]
  },
  { id: 142, label: "Schema Admin", role: "admin", link: "/app/schema/admin", icon: <LibraryIcon />,
    children: [
      { label: "List", link: "/app/schema/adminList" },
      { label: "Create", link: "/app/form/createJsonSchema" },
      { label: "Update", link: "/app/schema/update" },
      { label: "Delete", link: "/app/schema/delete" }
    ]
  },
  { id: 150, label: "Forum Admin", role: "orgadm", link: "/app/forum/admin", icon: <LibraryIcon />,
    children: [
      { label: "Create", link: "/app/forum/create" },
      { label: "Update", link: "/app/forum/update" },
      { label: "Delete", link: "/app/forum/delete" }
    ]
  },
  { id: 160, label: "Training Admin", link: "/app/edu/admin", icon: <LibraryIcon />,
    children: [
      { label: "List Quiz", link: "/app/form/listQuiz" },
      { label: "Create Quiz", link: "/app/form/createQuiz" },
      { label: "Update Quiz", link: "/app/edu/updateQuiz" },
      { label: "Delete Quiz", link: "/app/edu/deleteQuiz" }
    ]
  },
  { id: 200, type: "divider" },
  { id: 250, label: "Website", role: "user", link: "/app/covid/publish", icon: <Business/>, },
  { id: 260, label: "Status", role: "user", link: "/app/covid/status", icon: <AddAlert/>, },
  { id: 270, label: "User Id", link: "/app/covid/userId", icon: <AccountBox />},
  { id: 280, label: "Merchant Orders", role: "merchant", link: "/app/merchantOrders", icon: <OrderIcon/>},
];

function Sidebar({ location }) {
  var classes = useStyles();
  var theme = useTheme();

  // global
  var { isSidebarOpened } = useLayoutState();
  var layoutDispatch = useLayoutDispatch();
  var { roles } = useUserState();

  // local
  var [isPermanent, setPermanent] = useState(true);

  useEffect(function() {
    window.addEventListener("resize", handleWindowWidthChange);
    handleWindowWidthChange();
    return function cleanup() {
      window.removeEventListener("resize", handleWindowWidthChange);
    };
  });

  return (
    <Drawer
      variant={isPermanent ? "permanent" : "temporary"}
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
        <IconButton onClick={() => toggleSidebar(layoutDispatch)}>
          <ArrowBackIcon
            classes={{
              root: classNames(classes.headerIcon, classes.headerIconCollapse),
            }}
          />
        </IconButton>
      </div>
      <List className={classes.sidebarList}>
        {structure.filter(link => permission(link.role, roles)).map(link => (
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
    if(userRoles == null) {
      if(linkRole == null) {
        return true;
      } else {
        return false
      }
    } else {
      if(linkRole == null) {
        return true;
      } else {
        if(userRoles.includes(linkRole)) {
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
