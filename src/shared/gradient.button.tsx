import React from "react";
import { StyleSheet, Text, TouchableOpacity, TextStyle, View, ViewStyle } from "react-native";
import LinearGradient from "react-native-linear-gradient";

const styles = StyleSheet.create({
  button: {
    flexDirection: "row"
  },
  gradient: {
    height: "100%",
    width: "100%",
    alignItems: "center",
    justifyContent: "center"
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white"
  }
});

interface Props {
  text?: string;
  gradientBegin?: string;
  gradientEnd?: string;
  gradientDirection?: "horizontal" | "vertical" | "diagonal";
  height?: number;
  width?: number;
  radius?: number;
  purpleViolet?: boolean;
  violetPink?: boolean;
  pinkDarkGreen?: boolean;
  blueViolet?: boolean;
  blueMarine?: boolean;
  deepBlue?: boolean;
  onPressAction?: Function;
  textStyle?: TextStyle;
  style?: ViewStyle;
  disabled?: boolean;
}

class GradientButton extends React.PureComponent<Props> {
  render() {
    const {
      text,
      gradientBegin,
      gradientEnd,
      gradientDirection,
      height,
      width,
      radius,
      purpleViolet,
      violetPink,
      pinkDarkGreen,
      blueViolet,
      blueMarine,
      deepBlue,
      onPressAction,
      textStyle,
      style,
      disabled
    } = this.props;

    const purpleVioletColor = ["#7B42F6", "#B01EFF"];
    const violetPinkColor = ["#B01EFF", "#E1467C"];
    const pinkDarkGreenColor = ["#E1467C", "#205284"];
    const blueVioletColor = ["#3672F8", "#B01EFF"];
    const blueMarineColor = ["#14F1D9", "#3672F8"];
    const deepBlueColor = ["#4F73C3", "#3C46A2"];
    const disabledColor = ["#b0aec1", "#b9b8bc"];

    const horizontalGradient = {
      start: { x: 0, y: 0.5 },
      end: { x: 1, y: 0.5 }
    };

    const verticalGradient = {
      start: { x: 0, y: 0 },
      end: { x: 0, y: 1 }
    };

    const diagonalGradient = {
      start: { x: 0, y: 0 },
      end: { x: 1, y: 1 }
    };


    return (
      <TouchableOpacity
        style={[styles.button, { height: height ? height : 75, width }, style]}
        onPress={() => {
          if (onPressAction && !disabled) {
            return onPressAction();
          }
        }}
        disabled={disabled}
      >
        <LinearGradient
          style={[styles.gradient, { borderRadius: radius || 50 }]}
          colors={
            purpleViolet
              ? purpleVioletColor
              : violetPink
              ? violetPinkColor
              : pinkDarkGreen
              ? pinkDarkGreenColor
              : blueViolet
              ? blueVioletColor
              : blueMarine
              ? blueMarineColor
              : deepBlue
              ? deepBlueColor
              : disabled
              ? disabledColor
              : ([gradientBegin || "#00d2ff", gradientEnd || "#3a47d5"] as string[])
          }
          start={
            gradientDirection === "vertical"
              ? verticalGradient.start
              : gradientDirection === "diagonal"
              ? diagonalGradient.start
              : horizontalGradient.start
          }
          end={
            gradientDirection === "vertical"
              ? verticalGradient.end
              : gradientDirection === "diagonal"
              ? diagonalGradient.end
              : horizontalGradient.end
          }
        >
          <Text style={[styles.text, textStyle]}>{text}</Text>
        </LinearGradient>
      </TouchableOpacity>
    );
  }
}

export default GradientButton;
