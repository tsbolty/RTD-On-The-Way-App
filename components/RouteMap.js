import React from "react";
import MapView from "react-native-maps";
import { StyleSheet, Dimensions } from "react-native";
import { Marker } from "react-native-maps";

export default function RouteMap({ region }) {
	// const onRegionChange = (newRegion) => {
	// 	setRegion({ ...region, newRegion });
	// };
	return (
		<MapView region={region} style={styles.map}>
			<Marker
				key={Math.floor(Math.random() * 10000)}
				coordinate={{
					latitude: 39.724888799404596,
					longitude: -104.99608392483549
				}}
				title='title'
			/>
		</MapView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "center"
	},
	map: {
		width: Dimensions.get("window").width,
		height: Dimensions.get("window").height
	}
});
