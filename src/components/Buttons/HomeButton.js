import { Link } from "@react-navigation/native";
import { Text } from "react-native";
import { styles } from "../../AppStyles";

/**
 * Renders the Home Button
 *
 * @returns Button that links to the Home page
 */
export default function HomeButton() {
	return (
		<Link
			style={{
				backgroundColor: "none",
			}}
			to={{ screen: "Home" }}
		>
			<Text style={styles.navText}>Home</Text>
		</Link>
	);
}
