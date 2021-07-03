import React, { useState, useEffect } from "react";
import { Provider as PaperProvider } from "react-native-paper";
import { name as appName } from "./app.json";
import { AppRegistry } from "react-native";
import Screen from "./components/Screen";
import theme from "./CustomProperties/Theme";
import * as Location from "expo-location";

function App() {
	const [userLocation, setUserLocation] = useState({
		latitude: 39.724888799404596,
		longitude: -104.99608392483549,
		latitudeDelta: 0.04,
		longitudeDelta: 0.05
	});

	useEffect(() => {
		(async () => {
			let { status } = await Location.requestForegroundPermissionsAsync();
			if (status !== "granted") {
				setErrorMsg("Permission to access location was denied");
				return;
			}

			let location = await Location.getCurrentPositionAsync({});
			setUserLocation({
				latitude: location.coords.latitude,
				longitude: location.coords.longitude,
				latitudeDelta: 0.04,
				longitudeDelta: 0.05
			});
		})();
	}, []);
	return (
		<PaperProvider theme={theme}>
			<Screen userLocation={userLocation} />
		</PaperProvider>
	);
}
AppRegistry.registerComponent(appName, () => App);

export default App;
