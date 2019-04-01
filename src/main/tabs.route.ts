import { createMaterialBottomTabNavigator } from "react-navigation-material-bottom-tabs";
import { Connote } from "./connote/connote.screen";
import { COLOR } from "../constant/theme.constant";

export default createMaterialBottomTabNavigator(
  {
    Connote
  },
  {
    barStyle: { backgroundColor: "#fff" },
    activeTintColor: COLOR.MAIN.TAB.ACTIVE,
    inactiveTintColor: COLOR.MAIN.TAB.INACTIVE
  }
);
