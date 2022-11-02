import { StatusBar } from "expo-status-bar";
import { Button, Image, Text, TextInput, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import axios from "axios";
import { styles } from "./AppStyles";
import IngredientList from "./components/IngredientList";
import favicon from "../assets/favicon.png"
export default function App() {
	const [listSize, setListSize] = useState(1);
	const [recipe, setRecipe] = useState(
		{
			"name": "No Recipe Name Available",
			"image": favicon,
			"ingredients": ["None"],
			"source": ""
		});
	const [inputIg, setinputIg] = useState("");

	async function fetchfood()
	{
		let name = "";
		try
		{
			let response = await axios({
				method: "get",
				url: "http://192.168.0.30:8000/?ingredients=" + inputIg,
				responseType: "json"
			});
			
			let content = await response.data;
			setRecipe( (prevState) =>
			{
				return {...prevState,
					...content,
					"image": {uri: content["image"]}
				}
			});
		}
		catch
		{
			setRecipe( (prevState) =>
			{
				return {...prevState,
					"name": "No Recipe Name Available",
					"image": favicon,
	    	    	"ingredients": [],
    	    		"source": ""
				}
			});
		}
		return name;
	}

    function inputIngredientsHandler(igs)
	{
		setinputIg(igs);
	}

	return (
		<View style={styles.container}>
			<Image style={styles.foodPic} source={recipe["image"]}/>
			<Text style={styles.foodName}>{recipe["name"]}</Text>
			<IngredientList ingredients={recipe["ingredients"]}/>

			<Button title="Fetch Recipes" onPress={fetchfood} color="#fd5d00" />
			<TextInput style={styles.inputText} onChangeText={inputIngredientsHandler} placeholder="Enter Food name/ingredients"/>
			<StatusBar style="auto" />
		</View>
	);

	
}
