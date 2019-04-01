import React, { Component } from "react";
import { View, StyleSheet, ViewStyle } from "react-native";

interface Props {
  style?: ViewStyle;
}
export class Card extends Component<Props> {
  render() {
    return <View style={[styles.card, this.props.style]}>{this.props.children}</View>;
  }
}

const styles = StyleSheet.create({
  card: {
    elevation: 2,
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: 6,
    padding: 10,
    paddingVertical: 2,
    marginVertical: 2
  }
});
