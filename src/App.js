import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import { Pressable, Text } from "react-native";
import Search from "./components/Search/Search";
import SearchOptions from "./components/SearchOptions/SearchOptions";
import { ContextProvider } from "./context/Context";

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

	function home() {
		return (
			<Text style={{ color: "white", fontSize: 18, fontWeight: "500" }}>
				Home
			</Text>
		);
	}

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
					style={{ color: "white", fontSize: 18, fontWeight: "500", marginLeft:10 }}
				>
					Home
				</Text>
			</Pressable>
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
					}}
					initialRouteName="Home"
				>
					<Stack.Screen
						name="Home"
						component={Search}
					/>
					<Stack.Group
						screenOptions={({ route, navigation }) => {
							let h = HomeButton(navigation)
							return {
							headerLeft: () => h,
						}}}
					>
						<Stack.Screen
							name="Search"
							component={SearchOptions}
						/>
					</Stack.Group>
				</Stack.Navigator>
			</NavigationContainer>
			<StatusBar />
		</ContextProvider>
	);
}
