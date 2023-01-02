import { createContext, useState } from "react";

const RecipeResultsCtx = createContext({
    moreRecipesLink: "",
    setAddRecipesLink: (link) => {},
    results: [
        {
            name: "No Recipe Name Available",
            image: require("../../assets/favicon.png"),
            ingredients: ["None"],
            source: "",
        },
    ],
    fetchLState: () => {},
    getRecipes: (recipeList) => {},
    addRecipes: (recipeList) => {},
});

export function ContextProvider(props) {
	const [recipes, setRecipes] = useState([
        {
            name: "No Recipe Name Available",
            image: "",
            ingredients: ["None"],
            source: "",
        },
    ]);
	const [addRecipesLink, setAddRecipesLink] = useState("");

    function setAddLink(link)
    {
        setAddRecipesLink(link);
    }

	function GetRecipes(recipeList) {

        if (recipeList[0].source != "") {
            let newState = [];
            for (let i = 0; i < recipeList.length; i++) {
                newState.push(recipeList[i]);
            }

            setRecipes(newState);
        }
	}

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
