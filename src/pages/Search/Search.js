import { lazy, Suspense, useContext, useEffect, useState } from "react";
import { ActivityIndicator, Pressable, Text, useWindowDimensions, View } from "react-native";
import { RecipeResultsCtx } from "../../context/Context";
import { SearchStyle } from "./SearchStyle";
import { styles } from "../../AppStyles";
import { CsrfCtx } from "../../context/CsrfToken";
import { AccountCtx } from "../../context/account";
import BACKEND from "../../ipaddressesports/BackEndIP";
import { changeNavBarPaddingTop, navBarHeight, NavBarStyle } from "../../components/NavBar/NavBarStyle";
import NavBar from "../../components/NavBar/NavBar";
import { NoMoreRecipes } from "../../Constants";
import axios from "axios";
const RecipeList = lazy(() => import("../../components/RecipeList/RecipeList"));
const WrappingItems = lazy(() => import("../../components/WrappingItems/WrappingItems"));

/**
 * Renders the page with recipe results depending on
 * the options selected in Search Options page
 *
 * @returns Search Results Page
 */
export default function Search({ route, navigation }) {
	const ctx = useContext(RecipeResultsCtx);
	const csrfCtx = useContext(CsrfCtx);
	const accCtx = useContext(AccountCtx);

	const [isMounted, setIsMounted] = useState(true);

	const [recentRecipes, setRecentRecipes] = useState([{...NoMoreRecipes, name: "No recipes viewd Yet"}]);
	const [ratedRecipes, setRatedRecipes] = useState([{...NoMoreRecipes, name: "No recipes rated Yet"}]);
	const [recommendRecipes, setRecommendRecipes] = useState([{...NoMoreRecipes, name: "No recipes rated Yet"}]);

	const [recipes, setRecipes] = useState(ctx.results);
	const [recipeListName, setRecipeListName] = useState("Recommended");
	const [buttons, setButtons] = useState(
		[
			"Search Results"
		]
	);

	const recipeLists = [
		{type: "Search Results", list: undefined},
		{type: "Recommended", list: recommendRecipes},
		{type: "Most Recent", list: recentRecipes},
		{type: "Most Rated", list: ratedRecipes},
	];

	useEffect(() => ctx.setIsLoading(false), [ctx.isLoading]);

	// Checks the user has logged in when the app boots up
	useEffect(() => {
		accCtx.checkCred(csrfCtx, BACKEND);

		if (ctx.isLoading) {
			setRecipes(ctx.results);
			setRecipeListName("Search Results");
		}

	}, [isMounted, ctx.isLoading, route.name]);

	// updates the search results when user does a search or 
	useEffect(() => {
		setRecipes(ctx.results);
	}, [ctx.moreRecipesLink]);

	// Fetches the recipes from Server and
	// sets current recipe list to be displayed
	useEffect(() => {
		accCtx.checkCred(csrfCtx, BACKEND);
		if (accCtx.loggedIn) {
			getRecipeResults("getRecentRecipes/", setRecentRecipes, [{...NoMoreRecipes, name: "No recipes viewd Yet"}]);
			getRecipeResults("getMostRatedRecipes/", setRatedRecipes, [{...NoMoreRecipes, name: "No recipes rated Yet"}]);
			getRecipeResults("recommend/", setRecommendRecipes, [{...NoMoreRecipes, name: "No recipes rated Yet"}]);

			setRecipes(recommendRecipes);
			setRecipeListName("Recommended");
			setButtons(
				[
					"Search Results",
					"Recommended",
					"Most Recent",
					"Most Rated",
				]
			);
		}
		else {
			setRecipes(ctx.results);
			setRecipeListName("Search Results");
			setButtons([]);
		}
	}, [isMounted, accCtx.loggedIn])

	/**
	 * Gets an array of recipe results from backend given an api endpoint and
	 * updates a state given a `React.Dispatch<React.SetStateAction<recipe[]>>`.
	 * 
	 * @param {string} apiEndPoint 
	 * @param {React.Dispatch<React.SetStateAction<import("../../Constants").recipe[]>>} setData 
	 * @param {import("../../Constants").recipe[]} defaultRecipes
	 */
	async function getRecipeResults(apiEndPoint, setData, defaultRecipes) {
		try {
			let response = await axios.get(`${BACKEND}/api/${apiEndPoint}`);
			let content = await response.data;

			if (content["results"].length <= 0) {
				setData(defaultRecipes);
			} else {
				setData(content["results"]);
			}
		} catch (error) {}
	}

	/**
	 * Instantly changes to different list of recipes.
	 * 
	 * @param {string} title 
	 */
	function changeRecipes(title) {

		recipeLists.forEach((recipeList) => {
			if (recipeList.type === title) {
				if (recipeList.list === undefined) {
					setRecipes(ctx.results);
				}
				else {
					setRecipes(recipeList.list)
				}
			}
		})

		setRecipeListName(title);
	}


	/**
	 * Render button to change recipe lists
	 * 
	 * @param {{
	 * 		item : string,
	 * 		index : number
	 * }} param
	 * @returns Button to change recipe list
	 */
	function renderButtons({item, index}) {
		return (
			<Pressable key={index} onPress={() => changeRecipes(item)} style={SearchStyle.listHeaderContainer}>
				<Text style={ recipeListName === item ? {...SearchStyle.listHeader, ...SearchStyle.chosenList }
				: {...SearchStyle.listHeader }}>
					{item}
				</Text>
			</Pressable>
		);
	}

	let navBarPadding = 0;

	if (recipeListName === "Search Results") {
		navBarPadding = - changeNavBarPaddingTop();
	}

	return (
		<View style={styles.pageContainer}>
			<NavBar
				routeName={route.name}
				style={{
					...NavBarStyle.container,
				}}
			/>
			<Suspense fallback={<ActivityIndicator size="large" />}>
				<View
					style={{
						...SearchStyle.container,
						height: useWindowDimensions().height - (navBarHeight + navBarPadding)
					}}
				>
					<WrappingItems
						style={{justifyContent: "space-evenly"}}
						items={buttons}
						renderItems={renderButtons}
					/>
					{!ctx.isLoading && (
						<RecipeList
							recipes={recipes}
							canLoad={recipeListName === "Search Results"}
							setData={ctx.addRecipes}
							recipeLink={ctx.moreRecipesLink}
						/>
					)}
				</View>
			</Suspense>
		</View>
	);
}
