import React, { lazy, Suspense } from "react";
import { ActivityIndicator, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import ContextProvider from "./context/Context";

import { library } from "@fortawesome/fontawesome-svg-core";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons/faMagnifyingGlass";
import { faBan } from "@fortawesome/free-solid-svg-icons/faBan";
import { faXmark } from "@fortawesome/free-solid-svg-icons/faXmark";
const Search = lazy(() => import("./pages/Search/Search"));
const SearchOptions = lazy(() => import("./pages/SearchOptions/SearchOptions"));
const RecipeInfo = lazy(() => import("./pages/RecipeInfo/RecipeInfo"));
const Form = lazy(() => import("./pages/Form/Form"));
const Profile = lazy(() => import("./pages/Profile/Profile"));

library.add(faMagnifyingGlass, faBan, faXmark);

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
				RecipeInfo: "RecipeInfo/:id",
				SignIn: "SignUp",
				Login: "Login",
				Profile: "Profile",
			},
		},
	};

	return (
		<ContextProvider>
			<Suspense fallback={<ActivityIndicator size="large" />}>
				<NavigationContainer linking={Linking}>
					<Stack.Navigator
						screenOptions={{
							headerShown: false,
						}}
					>
						<Stack.Screen
							name="Home"
							component={Search}
						/>
						<Stack.Group>
							<Stack.Group>
								<Stack.Screen
									name="Search"
									component={SearchOptions}
								/>

								<Stack.Screen
									name="RecipeInfo"
									component={RecipeInfo}
								/>
							</Stack.Group>

							<Stack.Screen
								name="SignUp"
								component={Form}
							/>

							<Stack.Screen
								name="Login"
								component={Form}
							/>
							<Stack.Screen
								name="Profile"
								component={Profile}
							/>
						</Stack.Group>
					</Stack.Navigator>
				</NavigationContainer>
			</Suspense>
			<StatusBar />
		</ContextProvider>
	);
}
