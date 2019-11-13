import React, { Component } from "react";
import { Provider } from "react-redux";
import { StyleProvider, View } from 'native-base';
import { ScreenOrientation } from 'expo';
import getTheme from './../native-base-theme/components';
import commonColor from './../native-base-theme/variables/commonColor';
import ApplicationNavigator from "./navigation/containers";
import mdStore from "./mdStore";

/*
 * Notice: Enable only for debugging network requests. This will start showing XHR requests in Chrome's Network tab.
 * CORS should be enabled to use this trick. [Use this plugin to enable CORS https://chrome.google.com/webstore/detail/allow-control-allow-origi/nlfbmbojpeacfghkpbjhddihlkkiljbi]
 */
// GLOBAL.XMLHttpRequest = GLOBAL.originalXMLHttpRequest || GLOBAL.XMLHttpRequest;

// Allow all (except inverted) app orientations
Expo.ScreenOrientation.allowAsync(ScreenOrientation.Orientation.ALL_BUT_UPSIDE_DOWN);

export default class App extends Component {
  constructor() {
    super();

    this.state = {
      loading: true,
    };
  }
  async componentWillMount() {
    await Expo.Font.loadAsync({
      'Roboto': require('native-base/Fonts/Roboto.ttf'),
      'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
    });
    this.setState({
      loading: false,
    });
  }
  
  render() {
    if (this.state.loading) {
      return <Expo.AppLoading />;
    }

    return (
      <Provider store={mdStore}>
        <StyleProvider style={getTheme(commonColor)}>
          <View style={{ flex: 1, backgroundColor: "#fff"}}>
            <ApplicationNavigator />
          </View>
        </StyleProvider>
      </Provider>
    );
  }
}
