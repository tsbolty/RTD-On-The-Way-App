import React, { useState, useEffect } from "react";
import RouteMap from "./RouteMap";
import Search from "./Search";
import Results from "./Results";
import { BottomNavigation } from "react-native-paper";
import routing from "../utils/route";

const Screen = () => {
	const [index, setIndex] = React.useState(1);
	const [routes] = React.useState([
		{ key: "search", title: "Search", icon: "magnify" },
		{ key: "map", title: "Map", icon: "map" },
		{ key: "results", title: "Results", icon: "view-list" }
	]);
	const [state, setState] = useState({
		center: {
			latitude: 39.724888799404596,
			longitude: -104.99608392483549,
			latitudeDelta: 0.15,
			longitudeDelta: 0.2
		},
		stops: [],
		markers: [],
		origin: "",
		destination: "",
		lineChosen: "",
		keywordSearch: "",
		distanceSearch: ""
	});

	const [loading, setLoading] = useState(false);

	useEffect(() => {
		setState({ ...state, origin: "", destination: "" });
	}, [state.lineChosen]);

	const midpoint = ([x1, y1], [x2, y2]) => [(x1 + x2) / 2, (y1 + y2) / 2];

	const handleSearch = async () => {
		setLoading(true);
		const chosenStops = await routing.getStops(
			state.lineChosen,
			state.origin,
			state.destination
		);
		const newCenter = midpoint(
			[chosenStops[0].coordinates[1], chosenStops[0].coordinates[0]],
			[
				chosenStops[chosenStops.length - 1].coordinates[1],
				chosenStops[chosenStops.length - 1].coordinates[0]
			]
		);
		let results = [];
		let zoomLevel = 100;
		switch (state.lineChosen) {
			case "a" || "n":
				zoomLevel = 40;
				break;
			case "e" || "r" || "h" || "l":
				zoomLevel = 90;
				break;
			default:
				zoomLevel = 75;
		}

		try {
			const allData = await chosenStops.map(async stop => {
				return await routing
					.searchPlaces(
						state.keywordSearch,
						state.distanceSearch,
						stop.coordinates[1],
						stop.coordinates[0]
					)
					.then(res => {
						return res.data.results
							.filter(item => Object.keys(item).length)
							.map(item => ({
								...item,
								closestStation: stop.name
							}));
					})
					.catch(err => console.log(err));
			});
			Promise.all(allData).then(values => {
				if (!values) {
					return;
				}
				values.forEach((value, i) => {
					const structuredData =
						value.map(obj => ({
							name: obj.name,
							placeId: obj.place_id,
							coordinates: [
								obj.geometry.location.lng,
								obj.geometry.location.lat
							],
							address: obj.vicinity,
							closestStation: chosenStops[i].name,
							type: "result"
						})) || [];

					results.push(...structuredData);
				});
				setState({
					...state,
					markers: results,
					stops: chosenStops,
					center: {
						latitude: newCenter[0],
						longitude: newCenter[1],
						latitudeDelta: parseFloat(
							(state.stops.length / zoomLevel).toFixed(2)
						),
						longitudeDelta: parseFloat(
							(state.stops.length / zoomLevel).toFixed(2)
						)
					}
				});
				setIndex(1);
				setLoading(false);
			});
		} catch (err) {
			console.log(err);
		}
	};

	const renderScene = BottomNavigation.SceneMap({
		map: () => (
			<RouteMap
				center={state.center}
				markers={[...state.markers, ...state.stops]}
			/>
		),
		search: () => (
			<Search
				setSearchValues={setState}
				state={state}
				handleSearch={handleSearch}
				loading={loading}
			/>
		),
		results: () => (
			<Results
				searchResults={[...state.markers]}
				keyword={state.keywordSearch}
				origin={state.origin}
				destination={state.destination}
				distance={state.distanceSearch}
			/>
		)
	});

	return (
		<BottomNavigation
			navigationState={{ index, routes }}
			onIndexChange={setIndex}
			renderScene={renderScene}
			handleSearch={handleSearch}
		/>
	);
};

export default Screen;
