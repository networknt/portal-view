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
import Payment from "../../pages/profile/Payment";
import DeleteProfile from "../../pages/profile/DeleteProfile";
import DeletePayment from "../../pages/profile/DeletePayment";
import UpdateRoles from "../../pages/profile/UpdateRoles";
import CityRegistry from "../../pages/covid/CityRegistry";
import CityProfile from "../../pages/covid/CityProfile";
import DeleteCity from "../../pages/covid/DeleteCity";
import EntityProfile from "../../pages/entity/EntityProfile";
import DeleteEntity from "../../pages/entity/DeleteEntity";
import LiveMap from "../../pages/covid/LiveMap";
import Status from "../../pages/covid/Status";
import Publish from "../../pages/covid/Publish";
import Website from "../../pages/covid/UserIdWebsite";
import PeerStatus from "../../pages/covid/UserIdStatus";
import NotificationDetail from "../../components/Notification/NotificationDetail";
import Messages from "../Notification/Messages";
import UserId from "../../pages/covid/UserId";
import MerchantOrders from "../../pages/profile/MerchantOrders";
import UserOrders from "../../pages/profile/UserOrders";
import RefTable from "../../pages/ref/RefTable";
import TableDelete from "../../pages/ref/TableDelete";
import TableForm from "../../pages/ref/TableForm";
import RefValue from "../../pages/ref/RefValue";
import ValueDelete from "../../pages/ref/ValueDelete";
import ValueForm from "../../pages/ref/ValueForm";
import RefLocale from "../../pages/ref/RefLocale";
import LocaleDelete from "../../pages/ref/LocaleDelete";
import RefRelaType from "../../pages/ref/RefRelaType";
import RefRelation from "../../pages/ref/RefRelation";
import RelationForm from "../../pages/ref/RelationForm";
import RelationDelete from "../../pages/ref/RelationDelete";
import Client from "../../pages/oauth/Client";
import ClientDelete from "../../pages/oauth/ClientDelete";
import RefreshToken from "../../pages/oauth/RefreshToken";
import RefreshTokenDelete from "../../pages/oauth/RefreshTokenDelete";
import RefreshTokenDetail from "../../pages/oauth/RefreshTokenDetail";

import Service from "../../pages/oauth/Service";
import ServiceDelete from "../../pages/oauth/ServiceDelete";
import PublishApi from "../../pages/publish/PublishApi";

import Category from "../../pages/category/Category";
import CategoryDelete from "../../pages/category/CategoryDelete";

import BlogAdmin from "../../pages/blog/BlogAdmin";
import BlogDelete from "../../pages/blog/BlogDelete";
import BlogList from "../../pages/blog/BlogList";

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
              <Route path="/app/payment" component={Payment} />
              <Route path="/app/updateRoles" component={UpdateRoles} />
              <Route path="/app/deleteProfile" component={DeleteProfile} />
              <Route path="/app/deletePayment" component={DeletePayment} />
              <Route path="/app/notificationDetail" component={NotificationDetail} />
              <Route path="/app/messages" component={Messages} />
              <Route path="/app/merchantOrders" component={MerchantOrders} />
              <Route path="/app/userOrders" component={UserOrders} />
              <Route path="/app/publishApi" component={PublishApi} />
              <Route path="/app/client" component={Client} />
              <Route path="/app/refreshToken" component={RefreshToken} />
              <Route path="/app/deleteRefreshToken" component={RefreshTokenDelete} />
              <Route path="/app/refreshTokenDetail" component={RefreshTokenDetail} />
              
              <Route path="/app/ref/table" component={RefTable} />
              <Route path="/app/ref/deleteTable" component={TableDelete} />
              <Route path="/app/ref/tableForm" component={TableForm} />
              <Route path="/app/ref/value" component={RefValue} />
              <Route path="/app/ref/deleteValue" component={ValueDelete} />
              <Route path="/app/ref/valueForm" component={ValueForm} />
              <Route path="/app/ref/locale" component={RefLocale} />
              <Route path="/app/ref/deleteLocale" component={LocaleDelete} />
              <Route path="/app/ref/relaType" component={RefRelaType} />
              <Route path="/app/ref/relation" component={RefRelation} />
              <Route path="/app/ref/relationForm" component={RelationForm} />
              <Route path="/app/ref/deleteRelation" component={RelationDelete} />

              <Route path="/app/oauth/client" component={Client} />
              <Route path="/app/oauth/deleteClient" component={ClientDelete} />
              <Route path="/app/oauth/service" component={Service} />
              <Route path="/app/oauth/deleteService" component={ServiceDelete} />

              <Route path="/app/category/list" component={Category} />
              <Route path="/app/category/deleteCategory" component={CategoryDelete} />

              <Route path="/app/blog/adminList" component={BlogAdmin} />
              <Route path="/app/blog/deleteBlog" component={BlogDelete} />
              <Route path="/app/blog/blogList" component={BlogList} />
              
              <Route path="/app/covid/cityRegistry" component={CityRegistry} />
              <Route path="/app/covid/cityProfile" component={CityProfile} />
              <Route path="/app/covid/deleteCity" component={DeleteCity} />
              <Route path="/app/covid/entity" component={EntityProfile} />
              <Route path="/app/covid/deleteEntity" component={DeleteEntity} />
              <Route path="/app/covid/map" component={LiveMap} />
              <Route path="/app/covid/status" component={Status} />
              <Route path="/app/covid/publish" component={Publish} />
              <Route path="/app/covid/peerStatus" component={PeerStatus} />
              <Route path="/app/covid/userId" component={UserId} />

              <Route path="/app/website" component={Website} />

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
