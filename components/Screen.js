import React, { useState, useEffect } from "react";
import RouteMap from "./RouteMap";
import Search from "./Search";
import { BottomNavigation } from "react-native-paper";
import routing from "../utils/route";

const Screen = ({ userLocation }) => {
	const [index, setIndex] = React.useState(0);
	const [routes] = React.useState([
		{ key: "map", title: "Map", icon: "map" },
		{ key: "search", title: "Search", icon: "magnify" }
	]);
	const [state, setState] = useState({
		center: userLocation || {
			lat: 39.724888799404596,
			lng: -104.99608392483549,
			latitudeDelta: 0.04,
			longitudeDelta: 0.05
		},
		stops: [],
		markers: [],
		origin: "",
		destination: "",
		lineChosen: "",
		keywordSearch: "",
		distanceSearch: ""
	});

	useEffect(() => {
		setState({ ...state, origin: "", destination: "" });
	}, [state.lineChosen]);

	const handleSearch = async () => {
		const chosenStops = await routing.getStops(
			state.lineChosen,
			state.origin,
			state.destination
		);
		let results = [];
		try {
			const allData = await chosenStops.map(async (stop) => {
				return await routing
					.searchPlaces(
						state.keywordSearch,
						state.distanceSearch,
						stop.coordinates[1],
						stop.coordinates[0]
					)
					.then((res) => {
						console.log(res);
						const results = res.data.results.filter(
							(item) => Object.entries(item).length
						);
						return results.map((item) => ({
							...item,
							closestStation: stop.name
						}));
					})
					.catch((err) => console.log(err));
			});
			Promise.all(allData).then((values) => {
				// console.log(values);
				if (!values) {
					return;
				}
				values.forEach((value) => {
					const objects =
						value.map((obj) => ({
							name: obj.name,
							placeId: obj.place_id,
							coordinates: [
								obj.geometry.location.lng,
								obj.geometry.location.lat
							],
							address: obj.vicinity,

							type: "result"
						})) || [];

					results.push(...objects);
				});
				setState({ ...state, markers: results, stops: chosenStops });
			});
		} catch (err) {
			console.log(err);
		}
	};

	const renderScene = BottomNavigation.SceneMap({
		map: () => (
			<RouteMap
				region={state.center}
				markers={[...state.markers, ...state.stops]}
			/>
		),
		search: () => (
			<Search
				setSearchValues={setState}
				state={state}
				handleSearch={handleSearch}
			/>
		)
	});

	return (
		<BottomNavigation
			navigationState={{ index, routes }}
			onIndexChange={setIndex}
			renderScene={renderScene}
		/>
	);
};

export default Screen;
