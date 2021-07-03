import React, { useEffect } from "react";
import MapView from "react-native-maps";
import { StyleSheet, Dimensions } from "react-native";
import { Marker } from "react-native-maps";

export default function RouteMap({ region, markers }) {
	// const onRegionChange = (newRegion) => {
	// 	setRegion({ ...region, newRegion });
	// };
	return (
		<MapView region={region} style={styles.map}>
			{markers.map((mark) => (
				<Marker
					key={Math.floor(Math.random() * 10000)}
					coordinate={{
						latitude: mark.coordinates[1],
						longitude: mark.coordinates[0]
					}}
					title={mark.name}
					pinColor={mark.type === "result" ? "blue" : "red"}
				/>
			))}
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
