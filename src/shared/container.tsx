import React, { Component, ReactNode } from "react";
import { StatusBar, View, TouchableWithoutFeedback, Keyboard, Text, Platform } from "react-native";
import { COLOR } from "../constant/theme.constant";
import { Header, Icon } from "native-base";
import LinearGradient from "react-native-linear-gradient";
import { fonts } from "../assets";

const fontReference = Platform.select({
  android: fonts.titillium.bold
});
interface Props {
  title?: string;
  renderLeft?: () => ReactNode | null | undefined;
  renderRight?: () => ReactNode | null | undefined;
}
export class Container extends Component<Props> {
  render() {
    const { title } = this.props;
    return (
      // <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View style={{ flex: 1 }}>
          {title && (
            <View style={{ height: 60 }}>
              <LinearGradient colors={[COLOR.MAIN.BACKGROUND, COLOR.MAIN.BACKGROUND]} style={{ width: "100%", height: "100%", flexDirection: "row" }}>
                <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                  {this.props.renderLeft && this.props.renderLeft()}
                </View>
                <View style={{ flex: 5, justifyContent: "center", alignItems: "center" }}>
                  <Text style={{ fontSize: 27, fontFamily: fontReference, color: '#fff' }}>{title}</Text>
                </View>
                <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                  {this.props.renderRight && this.props.renderRight()}
                </View>
              </LinearGradient>
            </View>
          )}
          <StatusBar backgroundColor={COLOR.MAIN.BACKGROUND} barStyle="light-content" />
          {this.props.children}
        </View>
      // </TouchableWithoutFeedback>
    );
  }
}
