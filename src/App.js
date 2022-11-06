import { StatusBar } from "expo-status-bar";
import { Button, Image, Text, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState } from "react";
import { styles } from "./AppStyles";
import IngredientList from "./components/IngredientList/IngredientList";
import favicon from "../assets/favicon.png"
import TextForm from "./components/TextForm/TextForm";
import OptionsForm from "./components/OptionsForm/OptionsForm";


export default function App() {
	const [recipe, setRecipe] = useState({
			"name": "No Recipe Name Available",
			"image": favicon,
			"ingredients": ["None"],
			"source": ""
		});
	const [isOptions, setIsOptions] = useState(false);

	function setRecipeHandler({name, image, ingredients, source}) {
		
	}

	function setOptions(event)
	{
		setIsOptions(!isOptions);
	}

	return (
		<View style={styles.container}>
			<Image style={styles.foodPic} source={recipe.image}/>
			<Text style={styles.foodName}>{recipe.name}</Text>
			<IngredientList ingredients={recipe.ingredients}/>

			<Button onPress={setOptions} title="Options" color="#fd5d00" />
			{isOptions ? <OptionsForm setData={setRecipe} /> : <TextForm setData={setRecipe} />}
			<StatusBar style="auto" />
		</View>
	);

	
}
