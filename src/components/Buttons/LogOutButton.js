import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { useContext } from "react";
import { Pressable, Text } from "react-native";
import { styles } from "../../AppStyles";
import { AccountCtx } from "../../context/account";
import { CsrfCtx } from "../../context/CsrfToken";
import BACKEND from "../../ipaddressesports/BackEndIP";

/**
 * Renders the Logout Button
 *
 * @returns Logut Button
 */
export default function LogOutButton() {
	const tokenCtx = useContext(CsrfCtx);
	const accCtx = useContext(AccountCtx);
	const navigation = useNavigation();

	/**
	 * Logs the user out from the backend server `session`.
	 */
	async function LogOutHandler() {
		let response = await axios.get(`${BACKEND}/api/logout/`);
		let content = await response.data;

		if (content.loggedOut) {
			accCtx.logOut();
			accCtx.setUsername("");
			accCtx.setEmail("");
			tokenCtx.setCsrfToken(content.token);
			navigation.navigate("Home");
		}
	}

	return (
		<Pressable
			style={{ padding: 5 }}
			onPress={LogOutHandler}
		>
			<Text style={styles.navText}>Sign Out</Text>
		</Pressable>
	);
}
