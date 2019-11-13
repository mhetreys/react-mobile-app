import React, { Component } from 'react';

import loginConstants from './../../login/constants';
import campaignConstants from './../../campaign/constants';
import supplierConstants from './../../suppliers/constants';
import * as screenNames from "./../../../navigation/screen_names";

import utils from './../../../utils';

const getUserInfo = async () => {
  try {
    let userInfo = await utils.retrieveData(loginConstants.USER_INFO_KEY);
    userInfo = JSON.parse(userInfo);

    return userInfo;
  } catch (ex) {
    console.log('User info not available yet');
  }

  return null;
};

const getSelectedCampaign = async () => {
  try {
    let campaign = await utils.retrieveData(
      campaignConstants.SELECTED_CAMPAIGN_KEY,
    );
    campaign = JSON.parse(campaign);

    return campaign;
  } catch (ex) {
    console.log('No campaign selected');
  }

  return null;
};

const getSelectedSupplier = async () => {
  try {
    let supplier = await utils.retrieveData(
      supplierConstants.SELECTED_SUPPLIER_KEY,
    );
    supplier = JSON.parse(supplier);

    return supplier;
  } catch (ex) {
    console.log('No supplier selected');
  }

  return null;
};

class Splash extends Component {
  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props);

    this.state = {
      isSuppliersLoaded: false,
      isCampaignsLoaded: false,
      selectedCampaign: null,
      selectedSupplier: null,
    };

    this.bootstrap();
  }

  componentDidUpdate(prevProps, prevState) {
    const {
      login,
      supplier,
      campaign,
      getSuppliers,
      getCampaigns,
      navigation,
    } = this.props;
    const { selectedCampaign, selectedSupplier } = this.state;

    if (prevProps.login.isLoading && !login.isLoading && login.user) {
      getSuppliers();
      getCampaigns();
    }

    if (prevProps.supplier.isLoading && !supplier.isLoading) {
      this.setState({
        isSuppliersLoaded: true,
      });
    }

    if (prevProps.campaign.isLoading && !campaign.isLoading) {
      this.setState({
        isCampaignsLoaded: true,
      });
    }

    if (
      this.state.isSuppliersLoaded &&
      this.state.isCampaignsLoaded &&
      (!selectedCampaign ||
        (selectedCampaign &&
          campaign.selectedCampaign &&
          campaign.selectedCampaign.proposal_id)) &&
      (!selectedSupplier ||
        (selectedSupplier &&
          supplier.selectedSupplier &&
          supplier.selectedSupplier.supplier_id))
    ) {
      if (!selectedCampaign) {
        navigation.navigate(screenNames.CAMPAIGN);
      } else if (!selectedSupplier) {
        navigation.navigate(screenNames.SUPPLIER_BY_CAMPAIGN, {
          proposal_id: selectedCampaign.proposal_id,
        });
      } else {
        // Redirect to `App`
        navigation.navigate('App');
      }
    }
  }

  async bootstrap() {
    const { setSelectedCampaign, setSelectedSupplier } = this.props;
    const newState = {};

    const selectedCampaign = await getSelectedCampaign();
    if (selectedCampaign && selectedCampaign.proposal_id) {
      setSelectedCampaign({ campaign: selectedCampaign });
      newState.selectedCampaign = selectedCampaign;
    }

    const selectedSupplier = await getSelectedSupplier();
    if (selectedSupplier && selectedSupplier.supplier_id) {
      setSelectedSupplier({ supplier: selectedSupplier });
      newState.selectedSupplier = selectedSupplier;
    }

    const stateCallback = async () => {
      this.props.loginStart();

      const userInfo = await getUserInfo();

      if (userInfo && userInfo.token) {
        // Redirect to `App`
        this.props.loginSuccess(userInfo);
      } else {
        this.props.loginFail();

        // Redirect to `Auth`
        this.props.navigation.navigate('Auth');
      }
    }

    if (Object.keys(newState).length) {
      this.setState(newState, stateCallback);
    } else {
      stateCallback();
    }
  }

  render() {
    return <Expo.AppLoading />;
  }
}

export default Splash;
