import { createContext, useState } from "react";
import AccountProvider from "./account";
import CsrfContextProvider from "./CsrfToken";

// Creates a context for reciperesults
export const RecipeResultsCtx = createContext({
	moreRecipesLink: "", // Link to fetch more recipes
	setAddRecipesLink: (link) => {}, // set Recipes link
	exclusions: [""],
	updateExclusions: (newExclusions) => {},
	results: [
		// array of recipes
		{
			id: "",
			name: "No Recipe Name Available",
			image: require("../../assets/favicon.png"),
			ingredients: [""],
			source: ""
		},
	],
	getRecipes: (recipeList) => {}, // Create a list of recipes
	addRecipes: (recipeList, link) => {}, // Add recipes to the current list
	isLoading: false,
	setIsLoading: (boolean) => {},
	currentRecipeURI: "",
	setCurrentRecipeURI: (newUri) => {}
});

/**
 * Component only used for managing context for the whole app
 * 
 * @param {*} props 
 * @returns Child Elements
 */
export default function ContextProvider(props) {

	// Array of recipes
	const [recipes, setRecipes] = useState([
		{
			id: "",
			name: "No Recipe Name Available",
			image: "",
			ingredients: ["None"],
			source: "",
		},
	]);

	const [excluded, setExcluded] = useState([]);
	// link to recipes
	const [addRecipesLink, setAddRecipesLink] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const [currentRecipeUri, setCurrentRecipeUri] = useState("");

	/**
	 * Updates the `excluded` state
	 * 
	 * @param {string[]} newExcludeState 
	 */
	function changeExcluded(newExcludeState) {
		setExcluded(newExcludeState);
	}

	/**
	 * Sets link to fetch more recipes
	 *
	 * @param {string} link
	 */
	function setAddLink(link) {
		setAddRecipesLink(link);
	}

	/**
	 * Creates an array with recipes
	 *
	 * @param {Array<{
	 * 	id: string,
	 *  name: string,
	 *  image: string,
	 *  ingredients: Array<string>,
	 *  source: string
	 * }>} recipeList
	 */
	function GetRecipes(recipeList) {
		if (recipeList[0].id != "") {
			setRecipes([
				{
					id: "",
					name: "No Recipe Name Available",
					image: "",
					ingredients: ["None"],
					source: "",
				},
			]);
			
            let newState = recipeList;
            setRecipes(newState);
		}
	}

	/**
	 * Makes a new array that adds a new recipes
	 * to the current list and updates link to
	 * fetch more recipes
	 *
	 * @param {Array<{
	 * 	id: string
	 *  name: string,
	 *  image: string,
	 *  ingredients: Array<string>,
	 *  source: string
	 * }>} recipeList
	 * @param {string} link
	 */
	function addRecipes(recipeList, link) {
		let newState = [];

		for (let i = 0; i < recipes.length; i++) {
			newState.push(recipes[i]);
		}

		for (let i = 0; i < recipeList.length; i++) {
			newState.push(recipeList[i]);
		}

		setRecipes(newState);
		setAddLink(link);
	}

	/**
	 * Updates the current recipe URI
	 * 
	 * @param {string} newUri 
	 */
	function updateCurrentRecipeUri(newUri) {
		if (newUri !== "") {
			setCurrentRecipeUri(newUri);
		}
	}

	/**
	 * Wraps the whole app in a context provider
	 */
	return (
		<CsrfContextProvider>
			<AccountProvider>
				<RecipeResultsCtx.Provider
					value={{
						moreRecipesLink: addRecipesLink,
						exclusions: excluded,
						updateExclusions: changeExcluded,
						results: recipes,
						getRecipes: GetRecipes,
						setAddRecipesLink: setAddLink,
						addRecipes: addRecipes,
						isLoading: isLoading,
						setIsLoading: setIsLoading,
						currentRecipeURI: currentRecipeUri,
						setCurrentRecipeURI: updateCurrentRecipeUri
					}}
				>
					{props.children}
				</RecipeResultsCtx.Provider>
			</AccountProvider>
		</CsrfContextProvider>
	);
}
