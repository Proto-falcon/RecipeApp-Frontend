import { Link, NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import Search from "./pages/Search/Search";
import SearchOptions from "./pages/SearchOptions/SearchOptions";
import { ContextProvider } from "./context/Context";
import SignIn from "./pages/SignUp/SignUp";
import SignUpButton from "./components/Buttons/SignUpButton";
import NavBar from "./components/NavBar/NavBar";
import LoginButton from "./components/Buttons/LogInButton";
import SearchButton from "./components/Buttons/SearchButton";
import HomeButton from "./components/Buttons/HomeButton";
import Form from "./components/Form/Form";


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
				>
					<Stack.Screen
						name="Home"
						component={Search}
					/>
					<Stack.Group
						screenOptions={({ route, navigation }) => {
							return {
								headerLeft: () => <HomeButton />,
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
							component={Form}
							options={{headerRight: () => <NavBar><LoginButton/><SearchButton/></NavBar>}}
						/>
						
						<Stack.Screen
							name="Login"
							component={Form}
							options={{headerRight: () => <NavBar><SignUpButton/><SearchButton/></NavBar>}}
						/>
					</Stack.Group>
				</Stack.Navigator>
			</NavigationContainer>
			<StatusBar />
		</ContextProvider>
	);
}
