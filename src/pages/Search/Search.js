import { useContext, useEffect, useState } from "react";
import { Platform, Text, View } from "react-native";
import RecipeResultsCtx from "../../context/Context";
import RecipeList from "../../components/RecipeList/RecipeList";
import { SearchStyle } from "./SearchStyle";
import { styles } from "../../AppStyles";
import CsrfCtx from "../../context/CsrfToken";
import BackEndIP from "../../ipaddressesports/BackEndIP";
import AccountCtx from "../../context/account";
import LogOutButton from "../../components/Buttons/LogOutButton";
import NavBar from "../../components/NavBar/NavBar";
import SearchButton from "../../components/Buttons/SearchButton";
import { Link } from "@react-navigation/native";

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
		accCtx.checkCred(csrfCtx, BackEndIP)
	}, [isMounted]);

	// Changes the navigation bar if the user is logged in or not.
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

	return (
		<View style={{ ...SearchStyle.container, ...styles.pageContainer }}>
			{!ctx.isLoading && (
				<RecipeList
					recipes={ctx.results}
					setData={ctx.addRecipes}
					recipeLink={ctx.moreRecipesLink}
				/>
			)}
		</View>
	);
}
