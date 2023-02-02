import { Link } from "@react-navigation/native";
import { Text } from "react-native";
import { styles } from "../../AppStyles";

/**
 * Renders the Login Button
 *
 * @returns Button that links to the Login page
 */
export default function LoginButton() {
	return (
		<Link
			to={{ screen: "Login", params: {toLogin: true} }}
			style={{ padding: 5 }}
		>
			<Text style={styles.navText}>Login</Text>
		</Link>
	);
}
