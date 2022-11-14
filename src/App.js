import { StatusBar } from "expo-status-bar";
import { View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState } from "react";
import { styles } from "./AppStyles";
import favicon from "../assets/favicon.png"
import Form from "./components/Form/Form";
import RecipeList from "./components/RecipeList/RecipeList";



export default function App() {
	const [recipes, setRecipes] = useState([
		{
			"name": "No Recipe Name Available",
			"image": favicon,
			"ingredients": ["None"],
			"source": ""
		}]);

	function addRecipes(recipes)
	{	
		let newState = [];
		for (let i = 0; i < recipes.length; i++)
		{
			newState.push(recipes[i]);
		}

		setRecipes(newState);
	}

	return (
		<View style={styles.container}>
			<RecipeList recipes={recipes} />

			<Form setData={addRecipes} />
			<StatusBar style="auto" />
		</View>
	);

	
}
