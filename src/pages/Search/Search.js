import { lazy, Suspense, useContext, useEffect, useState } from "react";
import { ActivityIndicator, Text, View } from "react-native";
import { RecipeResultsCtx } from "../../context/Context";
import { Link } from "@react-navigation/native";
import { SearchStyle } from "./SearchStyle";
import { styles } from "../../AppStyles";
import { CsrfCtx } from "../../context/CsrfToken";
import { AccountCtx } from "../../context/account";
import BACKEND from "../../ipaddressesports/BackEndIP";
const RecipeList = lazy(() => import("../../components/RecipeList/RecipeList"));
const LogOutButton = lazy(() => import("../../components/Buttons/LogOutButton"));
const NavBar = lazy(() => import("../../components/NavBar/NavBar"));
const SearchButton = lazy(() => import("../../components/Buttons/SearchButton"));

/**
 * Renders the page with recipe results depending on
 * the options selected in Search Options page 🔎
 *
 * @returns Search Results Page
 */
export default function Search({ navigation }) {
	const ctx = useContext(RecipeResultsCtx);
	const csrfCtx = useContext(CsrfCtx);
	const accCtx = useContext(AccountCtx);

	const [isMounted, setIsMounted] = useState(true);

	useEffect(() => ctx.setIsLoading(false), [ctx.isLoading]);
	
	// Checks the user has logged in when the app boots up
	useEffect(() => {
		accCtx.checkCred(csrfCtx, BACKEND)
	}, [isMounted]);

	try {
		// // Changes the navigation bar if the user is logged in or not.
		useEffect(() => {
			if (accCtx.loggedIn) {
				navigation.setOptions({
					headerLeft: () => (
						<NavBar>
							<Link
								style={styles.navLink}
								to={{ screen: "Profile" }}
							>
								<Text style={styles.navText}>Profile</Text>
							</Link>
							<Text style={styles.usernameText}>Username: {accCtx.username}</Text>
						</NavBar>
					),
					headerRight: () => (
						<NavBar>
							<LogOutButton />
							<SearchButton />
						</NavBar>
					),
				});
			}
			else {
				navigation.setOptions({
					headerLeft: () => undefined,
					headerRight: () => (
						<NavBar>
							<Link
								to={{ screen: "Login", params: {toLogin: true} }}
								style={styles.navLink}
							>
								<Text style={styles.navText}>Login</Text>
							</Link>
							<Link
								to={{ screen: "SignUp", params: {toLogin: false} }}
								style={styles.navLink}
							>
								<Text style={styles.navText}>Sign Up</Text>
							</Link>
							<SearchButton />
						</NavBar>
					),
				});
			}
		}, [accCtx.loggedIn, accCtx.username]);
	} catch (error) {
		console.log(error)
	}


	return (
		<Suspense fallback={<ActivityIndicator size="large"/>}>
			<View style={{...styles.pageContainer, ...SearchStyle.container}}>
				{!ctx.isLoading && (
					<RecipeList
						recipes={ctx.results}
						setData={ctx.addRecipes}
						recipeLink={ctx.moreRecipesLink}
						showEnd={true}
						navigation={navigation}
					/>
				)}
			</View>
		</Suspense>
	);
}
