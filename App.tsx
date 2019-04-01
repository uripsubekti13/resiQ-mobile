import React, { Component } from "react";
import AppRoute from "./src/main/app.route";
import { NavigationScreenProp } from "react-navigation";
import navigationService from "./src/services/navigation.service";

export interface AppProps {
  navigation: NavigationScreenProp<any, any>;
}
export default class App extends Component<AppProps> {
  render() {
    return (
      <AppRoute
        ref={navigator => {
          navigationService.setTopLevelNavigator(navigator);
        }}
        screenProps={this.props.navigation}
      />
    );
  }
}
