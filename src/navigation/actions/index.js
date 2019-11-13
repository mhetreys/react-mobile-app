import { NavigationActions, DrawerActions } from "react-navigation";
import * as screenNames from "./../screen_names";

let _navigator;

export const setTopLevelNavigator = (navigatorRef) => {
  _navigator = navigatorRef;
};

export const navigateBack = () => NavigationActions.back();

export const openDrawer = () => {
  _navigator.dispatch(
    DrawerActions.openDrawer()
  );
}

export const closeDrawer = () => {
  _navigator.dispatch(
    DrawerActions.closeDrawer()
  );
}

export const navigateToAuth = () => {
  // Navigate to `Auth`
  _navigator.dispatch(
    NavigationActions.navigate({
      routeName: 'Auth',
    })
  );
};

export const navigateToEssentials = (params) => {
  // Navigate to `Essentials`
  _navigator.dispatch(
    NavigationActions.navigate({
      routeName: 'Essentials',
      params,
    })
  );
};

export const navigateToApp = (params) => {
  if (!_navigator) return;

  // Navigate to `App`
  _navigator.dispatch(
    NavigationActions.navigate({
      routeName: 'App',
      params,
    })
  );
};

export const navigateToSuppliers = () => {
  _navigator.dispatch(
    NavigationActions.navigate({
      routeName: screenNames.SUPPLIERS
    })
  );
}

export const navigateToSuppliersByCampaign = (params) => {
  _navigator.dispatch(
    NavigationActions.navigate({
      routeName: screenNames.SUPPLIER_BY_CAMPAIGN,
      params
    })
  );
}

export const navigateToActivities = (params) => {
  _navigator.dispatch(
    NavigationActions.navigate({
      routeName: screenNames.ACTIVITY,
      params
    })
  );
}

export const navigateToActivityCapture = (params) => {
  _navigator.dispatch(
    NavigationActions.navigate({
      routeName: screenNames.ACTIVITY_CAPTURE,
      params
    })
  );
}

export const navigateToViewImages = (params) => {
  _navigator.dispatch(
    NavigationActions.navigate({
      routeName: screenNames.VIEW_IMAGES,
      params
    })
  );
}

export const navigateToSupplierContact = (params) => {
  _navigator.dispatch(
    NavigationActions.navigate({
      routeName: screenNames.SUPPLIER_CONTACT,
      params
    })
  );
}

export const navigateToSupplierComment = (params) => {
  _navigator.dispatch(
    NavigationActions.navigate({
      routeName: screenNames.SUPPLIER_COMMENT,
      params
    })
  );
}

export const navigateToHashTag = (params) => {
  _navigator.dispatch(
    NavigationActions.navigate({
      routeName: screenNames.HASHTAG,
      params
    })
  );
}

export const navigateToCampaign = () => {
  _navigator.dispatch(
    NavigationActions.navigate({
      routeName: screenNames.CAMPAIGN
    })
  );
}

export const navigateToLeads = (params) => {
  _navigator.dispatch(
    NavigationActions.navigate({
      routeName: screenNames.LEADS,
      params
    })
  );
}

export const navigateToProfile = () => {
  _navigator.dispatch(
    NavigationActions.navigate({
      routeName: screenNames.PROFILE,
    })
  );
}
