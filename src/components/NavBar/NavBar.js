import { useContext, useState } from "react";
import { Text, View } from "react-native";
import { Navigation } from "../../context/Navigation";
import Routes from "../../Routes";

/**
 * Renders a NavBar
 *
 * @param {{
 * 		style?: any,
 * }} props
 * @returns Row of buttons that facilitate in navigating the application
 */
export default function NavBar(props) {

	const Nav = useContext(Navigation);
	const [routes, setRoute] = useState((initRoutes=[]) => {
		
		const screens = Routes.config.screens;
		for (const routeName in screens) {
			initRoutes.push(screens[routeName]);
		}

		return initRoutes;
	});


	let leftButtons = [];
	let rightButtons = [];

	console.log(`CurrentRoute: ${Nav.route}`)
	console.log(`Routes: ${routes}`)
	
	return (
		<View style={props.style}>
			<Text>NavBar</Text>
		</View>
	);
}
