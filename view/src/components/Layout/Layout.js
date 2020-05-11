import React from "react";
import {
  Route,
  Switch,
  Redirect,
  withRouter,
} from "react-router-dom";
import classnames from "classnames";

// styles
import useStyles from "./styles";

// components
import Header from "../Header";
import Sidebar from "../Sidebar";
import Form from "../Form/Form";

// pages
import Dashboard from "../../pages/dashboard";
import Notifications from "../../pages/notifications";
import Failure from "../../pages/failure";
import Success from "../../pages/success";
import Profile from "../../pages/profile";
import DeleteProfile from "../../pages/profile/DeleteProfile";
import NotificationDetail from "../../components/Notification/NotificationDetail";
import Messages from "../Notification/Messages";

// context
import { useLayoutState } from "../../context/LayoutContext";

function Layout(props) {
  var classes = useStyles();

  // global
  var layoutState = useLayoutState();

  return (
    <div className={classes.root}>
        <>
          <Header history={props.history} />
          <Sidebar />
          <div
            className={classnames(classes.content, {
              [classes.contentShift]: layoutState.isSidebarOpened,
            })}
          >
            <div className={classes.fakeToolbar} />
            <Switch>
              <Route path="/app/dashboard" component={Dashboard} />
              <Route exact path="/app/form/:formId" component={Form} />
              <Route path="/app/notifications" component={Notifications} />
              <Route path="/app/failure" component={Failure} />
              <Route path="/app/success" component={Success} />
              <Route path="/app/profile" component={Profile} />
              <Route path="/app/deleteProfile" component={DeleteProfile} />
              <Route path="/app/notificationDetail" component={NotificationDetail} />
              <Route path="/app/messages" component={Messages} />

              <Route
                exact
                path="/app/ui"
                render={() => <Redirect to="/app/ui/icons" />}
              />
            </Switch>
          </div>
        </>
    </div>
  );
}

export default withRouter(Layout);
