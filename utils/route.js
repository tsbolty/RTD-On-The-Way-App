import axios from "axios";
import lines from "./index";
const getStops = async (line, origin, destination) => {
	const allLineStops = lines[`${line}Line`];
	const start = allLineStops.map((e) => e.name).indexOf(origin);
	const end = allLineStops.map((e) => e.name).indexOf(destination);
	const indexes = start > end ? [end, start] : [start, end];
	return allLineStops.slice(indexes[0], indexes[1] + 1);
};

const getLine = (line) => {
	return lines[`${line}Line`];
};

const searchPlaces = (name, distance, lat, lon) =>
	axios.get(
		`https://young-caverns-69277.herokuapp.com/api/maps/place/${name}/${distance}/${lat}/${lon}`
	);

const methods = { getStops, getLine, searchPlaces };

export default methods;
