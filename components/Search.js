import React, { useState, useEffect } from "react";
import { List } from "react-native-paper";
import routing from "../utils/route";
import allLines from "../utils/allLines.json";
import destinationTypes from "../utils/destinationTypes.json";
import distances from "../utils/distances";
import { Button } from "react-native-paper";

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

	return (
		<>
			<List.Section title='Accordions'>
				<List.Accordion
					title='Choose a train line'
					expanded={expanded.line}
					left={(props) => <List.Icon {...props} icon='train' />}>
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
				</List.Accordion>
				{state.stops.length ? (
					<>
						<List.Accordion
							title='Beginning Station'
							expanded={expanded.origin}
							onPress={() =>
								setExpanded({ ...expanded, origin: !expanded.origin })
							}
							left={(props) => <List.Icon {...props} icon='train' />}>
							{state.stops.map((station) => (
								<List.Item
									key={station.name}
									title={station.name}
									onPress={(e) => handlePress("origin", station.name)}
								/>
							))}
						</List.Accordion>
						<List.Accordion
							title='Destination Station'
							expanded={expanded.destination}
							onPress={() =>
								setExpanded({ ...expanded, destination: !expanded.destination })
							}
							left={(props) => <List.Icon {...props} icon='train' />}>
							{state.stops.map((station) => (
								<List.Item
									key={station.name}
									title={station.name}
									onPress={(e) => handlePress("destination", station.name)}
								/>
							))}
						</List.Accordion>
					</>
				) : null}
				{state.origin && state.destination ? (
					<>
						<List.Accordion
							title='What you looking for?'
							expanded={expanded.businessType}
							onPress={() =>
								setExpanded({
									...expanded,
									businessType: !expanded.businessType
								})
							}
							left={(props) => <List.Icon {...props} icon='train' />}>
							{destinationTypes.map((type) => (
								<List.Item
									key={type}
									title={type}
									onPress={(e) => handlePress("keywordSearch", type)}
								/>
							))}
						</List.Accordion>
						<List.Accordion
							title='Distance'
							expanded={expanded.distanceSearch}
							onPress={() =>
								setExpanded({
									...expanded,
									distanceSearch: !expanded.distanceSearch
								})
							}
							left={(props) => <List.Icon {...props} icon='train' />}>
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
						</List.Accordion>
					</>
				) : null}
			</List.Section>

			<Button
				icon='camera'
				mode='contained'
				disabled={buttonDisabled}
				onPress={() => {
					setButtonDisabled(false);
					handleSearch();
				}}>
				Search
			</Button>
			<Button icon='camera' mode='contained' onPress={handleResetSearch}>
				Reset Search Values
			</Button>
		</>
	);
}

export default Search;
