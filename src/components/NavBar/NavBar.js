import { Link } from "@react-navigation/native";
import { useContext } from "react";
import { Platform, Text, View, useWindowDimensions } from "react-native";
import { styles } from "../../AppStyles";
import { AccountCtx } from "../../context/account";
import LogOutButton from "../Buttons/LogOutButton";
import SearchButton from "../Buttons/SearchButton";

/**
 * Renders a NavBar
 *
 * @param {{
 * 		style?: any,
 * 		routeName: string,
 * }} props
 * @returns Row of buttons that facilitate in navigating the application
 */
export default function NavBar(props) {
	const accCtx = useContext(AccountCtx);
	

	/**
	 * Renders the login Button
	 *
	 * @param {{show: boolean}} props
	 * @returns Login button when `show` is true, none otherwise
	 */
	function LoginButton({ show }) {
		if (show) {
			return (
				<Link
					to={{ screen: "Login", params: { toLogin: true } }}
					style={styles.navLink}
				>
					<Text style={styles.navText}>Login</Text>
				</Link>
			);
		} else {
			return undefined;
		}
	}

	/**
	 * Renders the Sign up Button
	 * 
	 * @param {{show: boolean}} props 
	 * @returns Sign up button when `show` is true, none otherwise
	 */
	function SignUpButton({ show }) {
		if (show) {
			return (
				<Link
					to={{ screen: "SignUp", params: { toLogin: false } }}
					style={styles.navLink}
				>
					<Text style={styles.navText}>Sign Up</Text>
				</Link>
			);
		} else {
			return undefined;
		}
	}

	/**
	 * Renders the Login & Sign up buttons when not logged or
	 * Sign out button when logged in
	 *
	 * @param {{
	 * 		isLoggedIn: boolean,
	 * 		route: string
	 * }} props
	 * @returns {JSX.Element} Login & signup when `isLoggedIn` `true` or
	 * sign out for otherwise
	 */
	function SignInOrOut(props) {
		if (!props.isLoggedIn) {
			return (
				<>
					<LoginButton show={props.route !== "Login"} />
					<SignUpButton show={props.route !== "SignUp"} />
				</>
			);
		} else {
			return <LogOutButton />;
		}
	}

	return (
		<View style={{...props.style, paddingTop: Platform.OS === "web" ? 10 : 20,}}>
			<View>
				{accCtx.loggedIn && <Text style={styles.usernameText}>
					Username: {accCtx.username}
				</Text>}
			</View>
			<View style={{flexDirection:"row"}}>
				<View style={{ flexDirection: "row", width:useWindowDimensions().width*0.48}}>
					{props.routeName !== "Home" &&
						<Link
							style={styles.navLink}
							to={{ screen: "Home" }}
						>
							<Text style={styles.navText}>Home</Text>
						</Link>
					}
					{accCtx.loggedIn && props.routeName !== "Profile" &&
					<Link
						style={styles.navLink}
						to={{ screen: "Profile" }}
					>
						<Text style={styles.navText}>Profile</Text>
					</Link>
					}
				</View>
				<View style={{ flexDirection: "row", justifyContent: "flex-end", width:useWindowDimensions().width*0.48}}>
					<SignInOrOut isLoggedIn={accCtx.loggedIn} route={props.routeName} />
					<SearchButton show={props.routeName !== "Search"} />
				</View>
			</View>
		</View>
	);
}
