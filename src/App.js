import { StatusBar } from "expo-status-bar";
import { View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState } from "react";
import { styles } from "./AppStyles";
import favicon from "../assets/favicon.png";
import Form from "./components/Form/Form";
import RecipeList from "./components/RecipeList/RecipeList";

export default function App() {
	const [hasResults, setHasResults] = useState(false);
	const [recipes, setRecipes] = useState([
		{
			name: "No Recipe Name Available",
			image: favicon,
			ingredients: ["None"],
			source: "",
		},
	]);
	const [addRecipesLink, setAddRecipesLink] = useState("");

	function GetRecipes(recipeList) {
		let newState = [];
		for (let i = 0; i < recipeList.length; i++) {
			newState.push(recipeList[i]);
		}

		setRecipes(newState);
		setHasResults(true);
	}

	function addRecipes(recipeList)
	{
		let newState = [];

		for (let i = 0; i < recipeList.length; i++) {
			newState.push(recipeList[i]);
			
		}

		for (let i = 0; i < recipes.length; i++) {
			newState.push(recipes[i]);
		}

		setRecipes(newState);
	}

	return (
		<View style={styles.container}>
			<RecipeList
				setData={addRecipes}
				setLink={setAddRecipesLink}
				hasResults={hasResults}
				recipes={recipes}
				addRecipesLink={addRecipesLink}
			/>

			<Form
				setData={GetRecipes}
				setLink={setAddRecipesLink}
			/>
			<StatusBar style="auto" />
		</View>
	);
}
