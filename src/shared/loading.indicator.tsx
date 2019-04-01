import React, { Component } from "react";
import { ActivityIndicator } from "react-native";
import Modal from "react-native-modal";

interface Props {
  isVisible: boolean;
}
export class LoadingIndicator extends Component<Props> {
  render() {
    return (
      <Modal isVisible={this.props.isVisible}>
        <ActivityIndicator size={"large"} color={"#6257cd"} />
      </Modal>
    );
  }
}
