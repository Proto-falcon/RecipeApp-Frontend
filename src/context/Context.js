import { createContext, useState } from "react";

// Creates a context for reciperesults
const RecipeResultsCtx = createContext({
    moreRecipesLink: "", // Link to fetch more recipes
    setAddRecipesLink: (link) => {}, // set Recipes link
    results: [  // array of recipes
        {
            name: "No Recipe Name Available",
            image: require("../../assets/favicon.png"),
            ingredients: ["None"],
            source: "",
        },
    ],
    getRecipes: (recipeList) => {}, // Create a list of recipes
    addRecipes: (recipeList, link) => {}, // Add recipes to the current list
});

export function ContextProvider(props) {
    /**
     * Component only used for managing context for the whole app
     */

    // Array of recipes
	const [recipes, setRecipes] = useState([
        {
            name: "No Recipe Name Available",
            image: "",
            ingredients: ["None"],
            source: "",
        },
    ]);

    // link to recipes
	const [addRecipesLink, setAddRecipesLink] = useState("");

    /**
     * Sets link to fetch more recipes
     * 
     * @param {string} link 
     */
    function setAddLink(link)
    {
        setAddRecipesLink(link);
    }

    /**
     * Creates an array with recipes
     * 
     * @param {Array<{
     *  name: string,
     *  image: string,
     *  ingredients: Array<string>,
     *  source: string
     * }>} recipeList 
     */
	function GetRecipes(recipeList) {

        if (recipeList[0].source != "") {
            let newState = [];
            for (let i = 0; i < recipeList.length; i++) {
                newState.push(recipeList[i]);
            }

            setRecipes(newState);
        }
	}

    /**
     * Makes a new array that adds a new recipes
     * to the current list and updates link to
     * fetch more recipes
     * 
     * @param {Array<{
     *  name: string,
     *  image: string,
     *  ingredients: Array<string>,
     *  source: string
     * }>} recipeList 
     * @param {string} link 
     */
    function addRecipes(recipeList, link)
	{
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
		<RecipeResultsCtx.Provider value={
            {
                moreRecipesLink: addRecipesLink,
                results: recipes,
                getRecipes: GetRecipes,
                setAddRecipesLink: setAddLink,
                addRecipes: addRecipes,
            }
        }>
			{props.children}
		</RecipeResultsCtx.Provider>
	);
}

export default RecipeResultsCtx;