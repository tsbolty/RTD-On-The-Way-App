import * as React from "react";
import { View, Text, StyleSheet } from "react-native";
import { List } from "react-native-paper";

function Results({ searchResults, keyword, origin, destination, distance }) {
	const blocks = Math.ceil(distance / 80.4672);
	return (
		<View style={styles.container}>
			{searchResults.length ? (
				<>
					<Text style={styles.searchDescription}>
						You searched for {keyword} within {blocks} block
						{blocks > 1 ? "s" : null} of each station between {origin} and
						{destination}
					</Text>
					<Text style={{ fontWeight: "bold", fontSize: 30 }}>Results:</Text>
					<List.Section>
						{searchResults.map((item) => (
							<List.Item
								key={item.name}
								title={item.name}
								description={`Address: ${item.address}`}
							/>
						))}
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
		marginTop: 50
	},
	searchDescription: {
		fontWeight: "bold",
		fontSize: 18
	}
});

export default Results;
