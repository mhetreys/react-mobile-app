import React from "react";
import { createStackNavigator, createAppContainer, createSwitchNavigator, createDrawerNavigator } from "react-navigation";
import { setTopLevelNavigator } from "./../actions";
import * as screenNames from "./../screen_names";

import Splash from "./../../features/splash/containers";
import Login from "./../../features/login/containers";
import Activities from "./../../features/activities/containers";
import Suppliers from "./../../features/suppliers/containers";
import SupplierByCampaign from "./../../features/suppliers/containers/listByCampaign";
import Leads from "./../../features/leads/containers";
import Profile from "./../../features/profile/containers";
import Campaign from "./../../features/campaign/containers";
import ActivityCapture from "./../../features/activities/containers/capture";
import ViewImages from "./../../features/activities/containers/viewImages";
import SuppierContact from "./../../features/suppliers/containers/callSupplier";
import SupplierComment from "./../../features/suppliers/containers/comment";
import Hashtag from "./../../features/suppliers/containers/hashtag";
import HeaderDrawer from "./../../features/drawer/container";

const AuthStack = createStackNavigator({
  [screenNames.LOGIN]: {
    screen: Login
  },
});

const AppDrawerStack = createStackNavigator({
  [screenNames.ACTIVITY]: {
    screen: Activities
  },

  [screenNames.ACTIVITY_CAPTURE]: {
    screen: ActivityCapture
  },

  [screenNames.VIEW_IMAGES]: {
    screen: ViewImages
  },

  [screenNames.SUPPLIERS]: {
    screen: Suppliers
  },
  
  [screenNames.SUPPLIER_CONTACT]: {
    screen: SuppierContact
  },

  [screenNames.SUPPLIER_COMMENT]: {
    screen: SupplierComment
  },

  [screenNames.HASHTAG]: {
    screen: Hashtag
  },

  [screenNames.LEADS]: {
    screen: Leads
  },

  [screenNames.PROFILE]: {
    screen: Profile
  },
});

const AppEssentialsStack = createStackNavigator({
  [screenNames.CAMPAIGN]: {
    screen: Campaign
  },

  [screenNames.SUPPLIER_BY_CAMPAIGN]: {
    screen: SupplierByCampaign
  },
});

const AppDrawer = createDrawerNavigator({
  [screenNames.APP_HOME]: {
    screen: AppDrawerStack,
  },

  [screenNames.APP_ESSENTIALS]: {
    screen: AppEssentialsStack,
  },
}, {
  contentComponent: ({ screenProps }) => (
    <HeaderDrawer
      campaign={screenProps.campaign}
      supplier={screenProps.supplier}
      profile={screenProps.profile}
    />
  ),
});

const AppContainer = createAppContainer(createSwitchNavigator({
  Splash: Splash,
  Auth: AuthStack,
  App: AppDrawer,
  Essentials: AppEssentialsStack,
}, {
  initialRouteName: 'Splash',
}));

export default class Navigator extends React.Component {
  render() {
    return (
      <AppContainer
        screenProps={this.props}
        ref={navigatorRef => {
          setTopLevelNavigator(navigatorRef);
        }}
      />
    );
  }
}
