import React from "react";
import { Provider } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";
import { store } from "./src/redux";

import BottomTabNavigator from "./src/navigation/TabNavigator";

const App = () => {
	return (
		<Provider store={store}>
			<NavigationContainer>
				<BottomTabNavigator />
			</NavigationContainer>
		</Provider>
	);
};
export default App;
