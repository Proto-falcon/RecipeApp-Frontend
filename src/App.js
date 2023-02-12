import { lazy, Suspense } from "react";
import { Text } from "react-native";
import { Link, NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import { styles } from "./AppStyles";

const Search = lazy(() => import("./pages/Search/Search"));
const SearchOptions = lazy(() => import("./pages/SearchOptions/SearchOptions"));
const ContextProvider = lazy(() => import("./context/Context"));
const NavBar = lazy(() => import("./components/NavBar/NavBar"));
const SearchButton = lazy(() => import("./components/Buttons/SearchButton"));
const Form = lazy(() => import("./pages/Form/Form"));
const Profile = lazy(() => import("./pages/Profile/Profile"));
const RecipeInfo = lazy(() => import("./pages/RecipeInfo/RecipeInfo"));

import { library } from "@fortawesome/fontawesome-svg-core";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons/faMagnifyingGlass";
import { faSpinner } from "@fortawesome/free-solid-svg-icons/faSpinner";
import { faBan } from "@fortawesome/free-solid-svg-icons/faBan";
import { faXmark } from "@fortawesome/free-solid-svg-icons/faXmark";

library.add(faMagnifyingGlass, faBan, faXmark, faSpinner);

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
				RecipeInfo: "RecipeInfo",
				SignIn: "SignUp",
				Login: "Login",
				Profile: "Profile",
			},
		},
	};

	return (
		<Suspense fallback={<Text>Loading...</Text>}>
			<ContextProvider>
				<NavigationContainer linking={Linking}>
					<Stack.Navigator
						screenOptions={{
							headerStyle: { backgroundColor: "#fd5d00" },
							headerTitle: () => undefined,
							headerLeft: () => undefined,
							headerRight: () => (
								<NavBar>
									<Link
										to={{
											screen: "Login",
											params: { toLogin: true },
										}}
										style={styles.navLink}
									>
										<Text style={styles.navText}>
											Login
										</Text>
									</Link>
									<Link
										to={{
											screen: "SignUp",
											params: { toLogin: false },
										}}
										style={styles.navLink}
									>
										<Text style={styles.navText}>
											Sign Up
										</Text>
									</Link>
									<SearchButton />
								</NavBar>
							),
						}}
					>
						<Stack.Screen
							name="Home"
							component={Search}
						/>
						<Stack.Group
							screenOptions={({ route, navigation }) => {
								return {
									headerLeft: () => (
										<Link
											style={styles.navLink}
											to={{ screen: "Home" }}
										>
											<Text style={styles.navText}>
												Home
											</Text>
										</Link>
									),
								};
							}}
						>
							<Stack.Group
								screenOptions={{
									headerRight: () => (
										<NavBar>
											<Link
												to={{
													screen: "Login",
													params: { toLogin: true },
												}}
												style={styles.navLink}
											>
												<Text style={styles.navText}>
													Login
												</Text>
											</Link>
											<Link
												to={{
													screen: "SignUp",
													params: { toLogin: false },
												}}
												style={styles.navLink}
											>
												<Text style={styles.navText}>
													Sign Up
												</Text>
											</Link>
											<SearchButton />
										</NavBar>
									),
								}}
							>
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
								options={{
									headerRight: () => (
										<NavBar>
											<Link
												to={{
													screen: "Login",
													params: { toLogin: true },
												}}
												style={styles.navLink}
											>
												<Text style={styles.navText}>
													Login
												</Text>
											</Link>
											<SearchButton />
										</NavBar>
									),
								}}
							/>

							<Stack.Screen
								name="Login"
								component={Form}
								options={{
									headerRight: () => (
										<NavBar>
											<Link
												to={{
													screen: "SignUp",
													params: { toLogin: false },
												}}
												style={styles.navLink}
											>
												<Text style={styles.navText}>
													Sign Up
												</Text>
											</Link>
											<SearchButton />
										</NavBar>
									),
								}}
							/>
							<Stack.Screen
								name="Profile"
								component={Profile}
								options={{
									headerRight: () => <SearchButton />,
								}}
							/>
						</Stack.Group>
					</Stack.Navigator>
				</NavigationContainer>
				<StatusBar />
			</ContextProvider>
		</Suspense>
	);
}
