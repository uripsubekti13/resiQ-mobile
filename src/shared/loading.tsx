import React, { Component } from "react";
import { View, StyleSheet, ActivityIndicator } from "react-native";
import * as _ from "lodash";
import Modal from "react-native-modal";

interface Props {
  isVisible: boolean;
}

export class Loading extends Component<Props> {
  render() {
    return (
      <Modal isVisible={this.props.isVisible} style={styles.modal} animationIn={"fadeIn"} animationOut={"fadeOut"}>
        <ActivityIndicator size={"large"} color={"#fff"} />
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  modal: { flex: 1, alignItems: "center", justifyContent: "center" },
  modalContent: { backgroundColor: "#000", width: 100, height: 100, padding: 10, borderRadius: 5 }
});
