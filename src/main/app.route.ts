import { createNavigationContainer, createStackNavigator, createAppContainer } from "react-navigation";
import TabRoute from "./tabs.route";
import { Detail } from "./detail/detail.screen";


const navigationOptions = { header: null };
const RootStack = createStackNavigator({
  Tab: {
    screen: TabRoute,
    navigationOptions
  },
  Detail: {
    screen: Detail,
    navigationOptions
  }
});

const AppRoute = createAppContainer(RootStack);

export default AppRoute;
