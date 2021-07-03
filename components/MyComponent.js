// WITHTHEME HIGHER ORDER COMPONENT
import * as React from "react";
import { withTheme } from "react-native-paper";

function MyComponent(props) {
	const { colors } = props.theme;
	return <Text style={{ color: colors.primary }}>Hello World!</Text>;
}

export default withTheme(MyComponent);

// USETHEME HOOK

// import * as React from 'react';
// import { useTheme } from 'react-native-paper';

// function MyComponent(props) {
//   const { colors } = useTheme();
//   return <Text style={{ color: colors.primary }}>Hello World!</Text>;
// }
