import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Text } from "react-native";
import Search from "./components/Search/Search";
import SearchOptions from "./components/SearchOptions/SearchOptions";
import { ContextProvider } from "./context/Context";

export default function App() {
	const Stack = createNativeStackNavigator();
	const Linking = {
		config: {
			screens: {
				Home: "Home",
				Search: "Search"
			}
		}
	};

	function test() {
		return <Text />
	}

	return (
		<ContextProvider>
			<NavigationContainer linking={Linking}>
				<Stack.Navigator
					screenOptions={{
						headerStyle: { backgroundColor: "#fd5d00" },
						headerTitleStyle: { color: "white" },
						headerTitleAlign: "center",
						headerLeft: test
					}}
					initialRouteName="Home"
				>
					<Stack.Screen
						name="Home"
						component={Search}
					/>
					<Stack.Screen
						name="Search"
						component={SearchOptions}
					/>
				</Stack.Navigator>
			</NavigationContainer>
		</ContextProvider>
	);
}
