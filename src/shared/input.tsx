import React, { Component } from "react";
import { View, TextInput, StyleSheet } from "react-native";
import { Card } from "./card";
import { Icon } from "native-base";
import { COLOR } from "../constant/theme.constant";

interface Props {
  iconName: string;
  value: string;
  onChangeText: (value: string) => void;
  type?: string;
  placeholder?: string;
}
export class InputWithCard extends Component<Props> {
  render() {
    return (
      <Card>
        <View style={styles.wrapper}>
          <View style={styles.iconWrapper}>
            <Icon style={styles.icon} type={"FontAwesome"} name={this.props.iconName} />
          </View>
          <TextInput
            secureTextEntry={this.props.type === "password" ? true : false}
            style={styles.input}
            value={this.props.value}
            onChangeText={this.props.onChangeText}
            placeholder={this.props.placeholder}
          />
        </View>
      </Card>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: { flexDirection: "row", justifyContent: "center", alignItems: "center" },
  iconWrapper: { width: "10%", height: 40, justifyContent: "center", alignItems: "center" },
  icon: { fontSize: 23, color: COLOR.MAIN.TEXT.PRIMARY },
  input: { width: "90%", height: 40, textAlignVertical: "center", marginTop: 5, fontSize: 18, color: COLOR.MAIN.TEXT.PRIMARY }
});
