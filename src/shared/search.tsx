import React, { Component } from "react";
import { Item, Icon, Input, NativeBase } from "native-base";
import { fonts } from "../assets";
import { Clipboard } from "react-native";

interface State {
  text: string;
}
interface Props {
  initialValue?: string;
  onSubmit?: (query: string) => void;
  placeholder?: string;
  disabled?: boolean;
  enablePaste?: boolean;
  onChangeText?: (query: string) => void;
}
export class InputSearch extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      text: ""
    };
  }

  updateValue = (text: string) => {
    this.setState({ text });
    this.props.onChangeText && this.props.onChangeText(text);
  };

  componentWillMount() {
    if (this.props.initialValue) {
      this.setState({ text: this.props.initialValue });
      this.props.onSubmit && this.props.onSubmit(this.props.initialValue);
    }
  }

  render() {
    return (
      <Item
        style={{
          paddingHorizontal: 8,
          paddingVertical: 0,
          backgroundColor: "#fff",
          borderBottomWidth: 0,
          borderRadius: 6,
          height: 37
        }}
      >
        <Icon style={{ paddingLeft: 3, color: "grey" }} name="search" />
        <Input
          disabled={this.props.disabled}
          placeholder={this.props.placeholder || "Search"}
          style={{ fontFamily: fonts.titillium.regular }}
          value={this.state.text}
          returnKeyType={"search"}
          onChangeText={text => {
            this.updateValue(text);
          }}
          onSubmitEditing={() => {
            if (this.props.onSubmit) {
              this.props.onSubmit(this.state.text);
            }
          }}
        />
        {this.state.text !== "" && (
          <Icon
            onPress={() => {
              this.updateValue("");
            }}
            style={{ color: "grey" }}
            name="close-circle"
          />
        )}
        {this.state.text === "" && this.props.enablePaste && (
          <Icon
            onPress={async () => {
              const text = await Clipboard.getString();
              this.updateValue(text);
            }}
            style={{ color: "grey" }}
            name="clipboard"
          />
        )}
      </Item>
    );
  }
}
