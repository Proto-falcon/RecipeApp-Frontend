import { StatusBar } from "expo-status-bar";
import { Button, Image, Text, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState } from "react";
import { styles } from "./AppStyles";
import IngredientList from "./components/IngredientList/IngredientList";
import favicon from "../assets/favicon.png"
import Form from "./components/Form/Form";


export default function App() {
	const [recipe, setRecipe] = useState({
			"name": "No Recipe Name Available",
			"image": favicon,
			"ingredients": ["None"],
			"source": ""
		});

	return (
		<View style={styles.container}>
			<Image style={styles.foodPic} source={recipe.image}/>
			<Text style={styles.foodName}>{recipe.name}</Text>
			<IngredientList ingredients={recipe.ingredients}/>

			<Form setData={setRecipe} />
			<StatusBar style="auto" />
		</View>
	);

	
}
