import { lazy, Suspense, useContext, useEffect, useState } from "react";
import { ActivityIndicator, Platform, Pressable, Text, useWindowDimensions, View } from "react-native";
import { RecipeResultsCtx } from "../../context/Context";
import { SearchStyle } from "./SearchStyle";
import { styles } from "../../AppStyles";
import { CsrfCtx } from "../../context/CsrfToken";
import { AccountCtx } from "../../context/account";
import BACKEND from "../../ipaddressesports/BackEndIP";
import { NavBarStyle } from "../../components/NavBar/NavBarStyle";
import NavBar from "../../components/NavBar/NavBar";
import { NoMoreRecipes } from "../../Constants";
import axios from "axios";
import { profileStyles } from "../Profile/ProfileStyles";
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
	const [recipeListName, setRecipeListName] = useState("recommend");
	const [buttons, setButtons] = useState(
		[
			{recipes:ctx.results, type:"Search Results"}
		]
	);

	useEffect(() => ctx.setIsLoading(false), [ctx.isLoading]);

	// Checks the user has logged in when the app boots up
	useEffect(() => {
		accCtx.checkCred(csrfCtx, BACKEND);
	}, [isMounted, ctx.isLoading, route.name]);

	useEffect(() => {
		if (accCtx.loggedIn) {
			getRecipeResults("getRecentRecipes/", setRecentRecipes, [{...NoMoreRecipes, name: "No recipes viewd Yet"}]);
			getRecipeResults("getMostRatedRecipes/", setRatedRecipes, [{...NoMoreRecipes, name: "No recipes rated Yet"}]);
			getRecipeResults("recommend/", setRecommendRecipes, [{...NoMoreRecipes, name: "No recipes rated Yet"}]);

			setRecipes(recommendRecipes);
			setButtons(
				[
					{recipes:ctx.results, type:"Search Results"},
					{recipes:recommendRecipes, type:"recommend"},
					{recipes:recentRecipes, type:"recent"},
					{recipes:ratedRecipes, type:"rated"},
				]
			);
		}
		else {
			setRecipes(ctx.results);
			setButtons(
				[
					{recipes:ctx.results, type:"Search Results"}
				]
			);
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
	 * @param {import("../../Constants").recipe[]} toRecipes 
	 * @param {string} title 
	 */
	function changeRecipes(toRecipes, title) {
		setRecipes(toRecipes);
		setRecipeListName(title);
	}


	/**
	 * Render button to change recipe lists
	 * 
	 * @param {{
	 * 		item : {recipes: import("../../Constants").recipe[], type: string},
	 * 		index : number
	 * }} param
	 * @returns Button to change recipe list
	 */
	function renderButtons({item, index}) {

		let chosenStyle = {
			backgroundColor: "#0098ff",
			color: "#ffffff",
			borderRadius: 10
		};
		return (
			<Pressable key={index} onPress={() => changeRecipes(item.recipes, item.type)} style={{borderRadius: 10}}>
				<Text style={ recipeListName === item.type ? {...profileStyles.subHeader, ...chosenStyle }
				: {...profileStyles.subHeader }}>
					{item.type}
				</Text>
			</Pressable>
		);
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
						height: useWindowDimensions().height * 0.7
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
							setData={ctx.addRecipes}
							recipeLink={ctx.moreRecipesLink}
						/>
					)}
				</View>
			</Suspense>
		</View>
	);
}
