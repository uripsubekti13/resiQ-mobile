import { createMaterialBottomTabNavigator } from "react-navigation-material-bottom-tabs";
import { Connote } from "./connote/connote.screen";
import { COLOR } from "../constant/theme.constant";

export default createMaterialBottomTabNavigator(
  {
    Connote
  },
  {
    barStyle: { backgroundColor: "#fff" },
    activeTintColor: "rgb(79, 182, 185)",
    inactiveTintColor: COLOR.MAIN.TAB.INACTIVE
  }
);
