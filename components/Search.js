import React, { useState, useEffect } from "react";
import { List } from "react-native-paper";
import routing from "../utils/route";
import allLines from "../utils/allLines.json";
import destinationTypes from "../utils/destinationTypes.json";
import distances from "../utils/distances";
import { Button } from "react-native-paper";
import { SafeAreaView, View, ScrollView, StyleSheet } from "react-native";

function Search({ state, setSearchValues, handleSearch }) {
	const [expanded, setExpanded] = useState({
		lineChosen: false,
		origin: false,
		destination: false,
		businessType: false,
		distanceSearch: false
	});
	const [buttonDisabled, setButtonDisabled] = useState(true);

	const handlePress = async (key, value, lineChange) => {
		setExpanded({ ...expanded, [key]: !expanded[key] });
		lineChange
			? setSearchValues({
					...state,
					[key]: value,
					lineChosen: lineChange
			  })
			: setSearchValues({
					...state,
					[key]: value
			  });
	};

	const handleResetSearch = (e) => {
		setSearchValues({
			...state,
			lineChosen: "",
			stops: [],
			origin: "",
			destination: "",
			keywordSearch: "",
			distanceSearch: "",
			markers: []
		});
	};

	useEffect(() => {
		if (
			state.stops &&
			state.lineChosen &&
			state.origin &&
			state.destination &&
			state.keywordSearch &&
			state.distanceSearch
		) {
			setButtonDisabled(false);
		}
	}, [state]);

	const icon = () => <List.Icon icon='train' />;

	return (
		<View
			style={{
				flex: 1,
				flexDirection: "column",
				justifyContent: "space-between"
			}}>
			<View>
				<List.Section style={{ marginTop: 50 }}>
					<List.Subheader>Search along your route</List.Subheader>
					<List.AccordionGroup style={styles.container}>
						<List.Accordion
							title='Choose a train line'
							id='1'
							expanded={expanded.line}
							left={() => <List.Icon icon='train' />}>
							<ScrollView style={styles.scrollView}>
								{allLines.map((line) => (
									<List.Item
										key={line}
										title={line}
										onPress={(e) => {
											handlePress(
												"stops",
												routing.getLine(line.slice(0, 1).toLowerCase()),
												line.slice(0, 1).toLowerCase()
											);
										}}
									/>
								))}
							</ScrollView>
						</List.Accordion>
						{state.stops.length ? (
							<>
								<List.Accordion
									id='2'
									style={styles.dropdownArea}
									title='Beginning Station'
									expanded={expanded.origin}
									onPress={() =>
										setExpanded({ ...expanded, origin: !expanded.origin })
									}
									left={(props) => <List.Icon {...props} icon='train' />}>
									<ScrollView style={styles.scrollView}>
										{state.stops.map((station) => (
											<List.Item
												key={station.name}
												title={station.name}
												onPress={(e) => handlePress("origin", station.name)}
											/>
										))}
									</ScrollView>
								</List.Accordion>
								<List.Accordion
									title='Destination Station'
									id='3'
									expanded={expanded.destination}
									onPress={() =>
										setExpanded({
											...expanded,
											destination: !expanded.destination
										})
									}
									left={(props) => <List.Icon {...props} icon='train' />}>
									<ScrollView style={styles.scrollView}>
										{state.stops.map((station) => (
											<List.Item
												key={station.name}
												title={station.name}
												onPress={(e) =>
													handlePress("destination", station.name)
												}
											/>
										))}
									</ScrollView>
								</List.Accordion>
							</>
						) : null}
						{state.origin && state.destination ? (
							<>
								<List.Accordion
									title='What you looking for?'
									id='4'
									expanded={expanded.businessType}
									onPress={() =>
										setExpanded({
											...expanded,
											businessType: !expanded.businessType
										})
									}
									left={(props) => (
										<List.Icon {...props} icon='google-my-business' />
									)}>
									<ScrollView style={styles.scrollView}>
										{destinationTypes.map((type) => (
											<List.Item
												key={type}
												title={type}
												onPress={(e) => handlePress("keywordSearch", type)}
											/>
										))}
									</ScrollView>
								</List.Accordion>
								<List.Accordion
									title='How may blocks away?'
									id='5'
									expanded={expanded.distanceSearch}
									onPress={() =>
										setExpanded({
											...expanded,
											distanceSearch: !expanded.distanceSearch
										})
									}
									left={(props) => <List.Icon {...props} icon='walk' />}>
									<ScrollView style={styles.scrollView}>
										{distances.map((distance) => (
											<List.Item
												key={distance}
												title={distance}
												onPress={(e) =>
													handlePress(
														"distanceSearch",
														Math.floor(distance * 80.4672)
													)
												}
											/>
										))}
									</ScrollView>
								</List.Accordion>
							</>
						) : null}
					</List.AccordionGroup>
				</List.Section>
			</View>

			<View style={{ bottom: 0 }}>
				<Button
					icon='camera'
					mode='contained'
					disabled={buttonDisabled}
					style={styles.myButton}
					onPress={() => {
						setButtonDisabled(false);
						handleSearch();
					}}>
					Search
				</Button>
				<Button
					icon='camera'
					mode='contained'
					onPress={handleResetSearch}
					style={styles.myButton}>
					Reset Search Values
				</Button>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	scrollView: {
		maxHeight: 300
	},
	// listItem: {
	// 	borderColor: "gray",
	// 	borderStyle: "solid",
	// 	borderWidth: 1,
	// 	backgroundColor: "#eee"
	// },
	myButton: {
		paddingTop: 3,
		paddingBottom: 3,
		marginTop: 10,
		marginBottom: 10
	}
});

export default Search;
