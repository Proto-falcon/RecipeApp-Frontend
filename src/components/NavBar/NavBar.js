import { View } from "react-native";

/**
 * Renders a NavBar
 *
 * @param {*} props
 * @returns Row of buttons that facilitate in navigating the application
 */
export default function NavBar(props) {
	return (
		<View style={{ flexDirection: "row", flexWrap: "wrap" }}>
			{props.children}
		</View>
	);
}
