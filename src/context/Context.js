import { createContext, useState } from "react";
import { AccountProvider } from "./account";
import { CsrfContextProvider } from "./CsrfToken";

// Creates a context for reciperesults
const RecipeResultsCtx = createContext({
	moreRecipesLink: "", // Link to fetch more recipes
	setAddRecipesLink: (link) => {}, // set Recipes link
	exclusions: [""],
	updateExclusions: (newExclusions) => {},
	results: [
		// array of recipes
		{
			uri: "",
			name: "No Recipe Name Available",
			image: require("../../assets/favicon.png"),
			ingredients: [""],
			source: ""
		},
	],
	getRecipes: (recipeList) => {}, // Create a list of recipes
	addRecipes: (recipeList, link) => {}, // Add recipes to the current list
	isLoading: false,
	setIsLoading: (boolean) => {}
});

/**
 * Component only used for managing context for the whole app
 * 
 * @param {*} props 
 * @returns Child Elements
 */
export function ContextProvider(props) {

	// Array of recipes
	const [recipes, setRecipes] = useState([
		{
			uri: "",
			name: "No Recipe Name Available",
			image: "",
			ingredients: ["None"],
			source: "",
		},
	]);

	const [excluded, setExcluded] = useState([]);

	/**
	 * Updates the `excluded` state
	 * 
	 * @param {string[]} newExcludeState 
	 */
	function changeExcluded(newExcludeState) {
		setExcluded(newExcludeState);
	}

	// link to recipes
	const [addRecipesLink, setAddRecipesLink] = useState("");

	const [isLoading, setIsLoading] = useState(false);

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
	 * 	uri: string,
	 *  name: string,
	 *  image: string,
	 *  ingredients: Array<string>,
	 *  source: string
	 * }>} recipeList
	 */
	function GetRecipes(recipeList) {
		if (recipeList[0].uri != "") {
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
	 * 	uri: string
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
						setIsLoading: setIsLoading
					}}
				>
					{props.children}
				</RecipeResultsCtx.Provider>
			</AccountProvider>
		</CsrfContextProvider>
	);
}

export default RecipeResultsCtx;
