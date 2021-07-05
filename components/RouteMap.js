import React, { useState } from "react";
import MapView from "react-native-maps";
import { StyleSheet, Dimensions } from "react-native";
import { Marker } from "react-native-maps";

export default function RouteMap({ region, markers }) {
	const [selectedMarker, setSelectedMarker] = useState({
		name: "",
		placeId: "",
		coordinates: [0, 0],
		address: ""
	});

	return (
		<>
			<MapView region={region} showUserLocation={true} style={styles.map}>
				{markers.map((mark, i) => (
					<Marker
						key={i}
						coordinate={{
							latitude: mark.coordinates[1],
							longitude: mark.coordinates[0]
						}}
						title={mark.name}
						pinColor={mark.type === "result" ? "blue" : "red"}
						onPress={(mark) => console.log(region)}
					/>
				))}
			</MapView>
		</>
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
