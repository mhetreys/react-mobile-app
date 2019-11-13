import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Root } from 'native-base';
import { BackHandler } from 'react-native';

import ApplicationNavigator from './../navigators';
import {
  navigateBack,
} from './../actions';

const mapStateToProps = (state) => ({
  navigation: state.navigationData,
  campaign: state.campaignData,
  supplier: state.suppliersData,
  profile: state.loginData,
});

const mapDispatchToProps = (dispatch) => ({ dispatch });

class ApplicationNavigatorContainer extends Component {
  handleBackButton = () => {
    navigateBack();

    return true;
  };

  componentWillMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
  }

  componentWillUnmount() {
    this.removeEventListener('hardwareBackPress', this.handleBackButton);
  }

  render() {
    return (
      <Root>
        <ApplicationNavigator {...this.props} />
      </Root>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ApplicationNavigatorContainer);
