import React, { useState } from "react";
import MapView from "react-native-maps";
import * as Linking from "expo-linking";
import { StyleSheet, Dimensions, View } from "react-native";
import { Modal, Portal, Text, Button, Provider } from "react-native-paper";
import { Marker } from "react-native-maps";

export default function RouteMap({ center, markers }) {
	const [selectedMarker, setSelectedMarker] = useState({
		name: "",
		placeId: "",
		coordinates: [0, 0],
		address: ""
	});

	const [newRegion, setNewRegion] = useState({});

	const [visible, setVisible] = useState(false);

	const showModal = () => setVisible(true);
	const hideModal = () => setVisible(false);
	const containerStyle = { backgroundColor: "white", padding: 20 };

	return (
		<View>
			<MapView
				region={Object.keys(newRegion).length ? newRegion : center}
				onRegionChange={region => setNewRegion({ region })}
				showUserLocation={true}
				style={styles.map}>
				{markers.map((mark, i) => (
					<Marker
						key={i}
						coordinate={{
							latitude: mark.coordinates[1],
							longitude: mark.coordinates[0]
						}}
						title={mark.name}
						pinColor={mark.type === "result" ? "blue" : "red"}
						onPress={() => {
							setSelectedMarker(mark);
							showModal();
						}}
					/>
				))}
			</MapView>
			<Provider>
				<Portal>
					<Modal
						visible={visible}
						onDismiss={hideModal}
						contentContainerStyle={containerStyle}>
						<Text style={styles.locationName}>{selectedMarker.name}</Text>
						{selectedMarker.address ? (
							<>
								<Text>Address: {selectedMarker.address}</Text>
								<Text>Closest station: {selectedMarker.closestStation}</Text>
								<Button
									onPress={() =>
										Linking.openURL(
											`https://www.google.com/maps/search/?api=1&query=${selectedMarker.name
												.replace(/\s+/g, "+")
												.replace(/&+/g, "%26")
												.toLowerCase()}+${selectedMarker.address
												.replace(/\s+/g, "+")
												.toLowerCase()}`
										)
									}>
									Check it out on Google Maps
								</Button>
							</>
						) : (
							<Text>Sorry there's no address for this location.</Text>
						)}
					</Modal>
				</Portal>
			</Provider>
		</View>
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
	},
	locationName: {
		fontWeight: "bold",
		fontSize: 30
	}
});
