import { Link, NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import { Image, Pressable, Text } from "react-native";
import Search from "./pages/Search/Search";
import { SearchStyle } from "./pages/Search/SearchStyle";
import SearchOptions from "./pages/SearchOptions/SearchOptions";
import { ContextProvider } from "./context/Context";
import { styles } from "./AppStyles";

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
			},
		},
	};

	function HomeButton(navigation) {
		return (
			<Pressable
				style={{
					backgroundColor: "none",
				}}
				onPress={() => {
					return navigation.navigate("Home");
				}}
			>
				<Text
					style={{
						color: "white",
						fontSize: 18,
						fontWeight: "500",
						marginLeft: 10,
					}}
				>
					Home
				</Text>
			</Pressable>
		);
	}

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

	return (
		<ContextProvider>
			<NavigationContainer linking={Linking}>
				<Stack.Navigator
					screenOptions={{
						headerStyle: { backgroundColor: "#fd5d00" },
						headerTitleStyle: { color: "white" },
						headerTitleAlign: "center",
						headerLeft: () => undefined,
						headerRight: SearchButton,
					}}
					initialRouteName="Home"
				>
					<Stack.Screen
						name="Home"
						component={Search}
					/>
					<Stack.Group
						screenOptions={({ route, navigation }) => {
							let h = HomeButton(navigation);
							return {
								headerLeft: () => h,
							};
						}}
					>
						<Stack.Screen
							name="Search"
							component={SearchOptions}
							options={{headerRight: () => undefined}}
						/>
					</Stack.Group>
				</Stack.Navigator>
			</NavigationContainer>
			<StatusBar />
		</ContextProvider>
	);
}
