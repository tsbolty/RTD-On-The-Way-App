import React, { useEffect } from "react";
import MapView from "react-native-maps";
import { StyleSheet, Dimensions } from "react-native";
import { Marker } from "react-native-maps";

export default function RouteMap({ region, markers }) {
	return (
		<MapView
			region={region}
			showUserLocation={true}
			style={styles.map}
			initialRegion={{
				latitude: 39.724888799404596,
				longitude: -104.99608392483549,
				latitudeDelta: 0.15,
				longitudeDelta: 0.2
			}}>
			{markers.map((mark, i) => (
				<Marker
					key={i}
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
