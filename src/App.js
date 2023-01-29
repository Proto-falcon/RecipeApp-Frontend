import { Link, NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import { Image, Text, View } from "react-native";
import Search from "./pages/Search/Search";
import { SearchStyle } from "./pages/Search/SearchStyle";
import SearchOptions from "./pages/SearchOptions/SearchOptions";
import { ContextProvider } from "./context/Context";
import { styles } from "./AppStyles";
import SignIn from "./pages/SignUp/SignUp";
import Login from "./pages/Login/Login";


/**
 * Render the enter APP UI and use React navigation to
 * navigate different screens and update urls on browser
 *
 * @returns {JSX.Element} The whole app UI
 */
export default function App() {

	const Stack = createNativeStackNavigator();
	const Linking = {
		config: {
			screens: {
				Home: "Home",
				Search: "Search",
				SignIn: "SignUp",
				Login: "Login"
			},
		},
	};

	/**
	 * Renders the Home Button
	 * 
	 * @param {*} navigation 
	 * @returns Button that links to the Home page
	 */
	function HomeButton(navigation) {
		return (
			<Link
				style={{
					backgroundColor: "none",
				}}
				to={{ screen: "Home"}}
			>
				<Text
					style={styles.navText}
				>
					Home
				</Text>
			</Link>
		);
	}

	/**
	 * Renders the Search Button
	 * @returns Button that links to the Search Options page
	 */
	function SearchButton() {
		const image = require("../assets/searchIcon.png");
		return (
			<Link
				to={{ screen: "Search" }}
				style={SearchStyle.imgContainer}
			>
				<Image
					style={styles.searchIcon}
					source={image}
				/>
			</Link>
		);
	}

	/**
	 * Renders the Login Button
	 * 
	 * @returns Button that links to the Login page
	 */
	function LoginButton() {
		return (
			<Link
				to={{screen: "Login"}}
				style={{padding: 5}}
			>
				<Text
					style={styles.navText}
				>
					Login
				</Text>
			</Link>
		);
	}

	/**
	 * Renders the Sign Up Page
	 * 
	 * @returns Button that links to the Sign In page
	 */
	function SignUpButton() {
		return (
			<Link
				to={{screen: "SignUp"}}
				style={{padding: 5}}
			>
				<Text
					style={styles.navText}
				>
					Sign Up
				</Text>
			</Link>
		);
	}

	/**
	 * Renders a NavBar
	 * 
	 * @param {*} props
	 * @returns Row of buttons that facilitate in navigating the application
	 */
	function NavBar(props) {
		return (
			<View style={{flexDirection: "row", flexWrap: "wrap"}}>
				{props.children}
			</View>
		);
	}

	return (
		<ContextProvider>
			<NavigationContainer linking={Linking}>
				<Stack.Navigator
					screenOptions={{
						headerStyle: { backgroundColor: "#fd5d00" },
						headerTitleStyle: { color: "white" },
						headerTitleAlign: "center",
						headerLeft: () => undefined,
						headerRight: () => <NavBar><LoginButton /><SignUpButton /><SearchButton /></NavBar>,
					}}
					initialRouteName="Home"
				>
					<Stack.Screen
						name="Home"
						component={Search}
					/>
					<Stack.Group
						screenOptions={({ route, navigation }) => {
							return {
								headerLeft: () => <HomeButton/>,
							};
						}}
					>
						<Stack.Screen
							name="Search"
							component={SearchOptions}
							options={{headerRight: () => <NavBar><LoginButton/><SignUpButton/></NavBar>}}
						/>

						<Stack.Screen
							name="SignUp"
							component={SignIn}
							options={{headerRight: () => <NavBar><LoginButton/><SearchButton/></NavBar>}}
						/>
						
						<Stack.Screen
							name="Login"
							component={Login}
							options={{headerRight: () => <NavBar><SignUpButton/><SearchButton/></NavBar>}}
						/>
					</Stack.Group>
				</Stack.Navigator>
			</NavigationContainer>
			<StatusBar />
		</ContextProvider>
	);
}
