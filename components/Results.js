import * as React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { List, IconButton } from "react-native-paper";
import * as Linking from "expo-linking";

function Results({ searchResults, keyword, origin, destination, distance }) {
	const blocks = Math.ceil(distance / 80.4672);
	return (
		<View style={styles.container}>
			{searchResults.length ? (
				<>
					<Text style={styles.searchDescription}>
						You searched for {keyword} within {blocks} block
						{blocks > 1 ? "s" : null} of each station between {origin} and{" "}
						{destination}
					</Text>
					<Text style={styles.results}>Results:</Text>
					<List.Section>
						<ScrollView>
							{searchResults.map((item, i) => (
								<List.Item
									key={i}
									title={item.name}
									description={`Address: ${item.address}`}
									right={() => (
										<IconButton
											icon='google-maps'
											color='blue'
											onPress={() =>
												Linking.openURL(
													`https://www.google.com/maps/search/?api=1&query=${item.name
														.replace(/\s+/g, "+")
														.toLowerCase()}+${item.address
														.replace(/\s+/g, "+")
														.toLowerCase()}`
												)
											}
										/>
									)}
								/>
							))}
						</ScrollView>
					</List.Section>
				</>
			) : (
				<Text style={styles.searchDescription}>
					Select a departure station, destination station, type of search and
					the number of blocks you're willing to walk. Then we'll search every
					station along your route
				</Text>
			)}
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		marginTop: 50,
		height: 500
	},
	searchDescription: {
		padding: 30,
		fontWeight: "bold",
		fontSize: 18
	},
	results: { fontWeight: "bold", fontSize: 30 }
});

export default Results;
