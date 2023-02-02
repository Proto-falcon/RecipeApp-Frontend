import { Link } from "@react-navigation/native";
import { Text } from "react-native";
import { styles } from "../../AppStyles";

/**
 * Renders the Sign Up Page
 *
 * @returns Button that links to the Sign In page
 */
export default function SignUpButton() {
	return (
		<Link
			to={{ screen: "SignUp", params: {toLogin: false} }}
			style={{ padding: 5 }}
		>
			<Text style={styles.navText}>Sign Up</Text>
		</Link>
	);
}
