import React, { useState, useEffect } from "react";
import { List } from "react-native-paper";
import routing from "../utils/route";
import allLines from "../utils/allLines.json";

function Search({ state, setSearchValues }) {
	const [expanded, setExpanded] = useState({
		lineChosen: false,
		origin: false,
		destination: false,
		businessType: false,
		distance: false
	});

	const handlePress = async (key, value) => {
		setExpanded({ ...expanded, [key]: !expanded[key] });
		setSearchValues({
			...state,
			[key]: value
		});
	};

	return (
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
								routing.getLine(line.slice(0, 1).toLowerCase())
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
		</List.Section>
	);
}

export default Search;
