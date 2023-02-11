import { Link } from "@react-navigation/native";
import axios from "axios";
import { useEffect, useState } from "react";
import { FlatList, Image, Pressable, Text, useWindowDimensions, View } from "react-native";
import BackEndIP from "../../ipaddressesports/BackEndIP";
import { recipeListStyle } from "./RecipeListStyle";

/**
 * Renders a list of Recipes
 * @typedef {{
 *  	uri: string,
 * 		name: string,
 *  	image: any,
 *  	ingredients: Array<string>,
 * 		source: string
 * 	}} recipe
 *
 * @param {{
 * 	recipes: Array<recipe>,
 *  recipeLink: string,
 *  setData: (recipeResults: Array<recipe>, addRecipesLink: string) => void,
 * 	exlusions: string[],
 * 	navigation: any
 * }} props
 * @returns List of Recipes
 */
export default function RecipeList(props) {
	const [recipes, setRecipes] = useState(props.recipes); // List of recipes
	const [isMoreRecipes, setIsMoreRecipes] = useState(true);
	const [loadedAllRecipes, setLoadedAllRecipes] = useState(false);

	/**
	 * Forces it to update the list because some reason
	 * it doens't register it on first render
	 */
	useEffect(() => {
		setRecipes(props.recipes);
	}, [props.recipes]);

	/**
	 * Renders a recipe with in image and name
	 *
	 * @param {{item: recipe}} param
	 * @returns A recipe with image and name
	 */
	function renderRecipe({ item }) {
		let image = "";
		if (item.image != "") {
			image = { uri: item.image, height: "100%", width: "100%" };
		} else {
			image = require("../../../assets/favicon.png");
		}

		if (item.source === "") {
			return (
				<View>
					<View style={recipeListStyle.foodPicContainer}>
						<Image
							style={recipeListStyle.foodPic}
							source={image}
						/>
					</View>
					<Text style={recipeListStyle.foodName}>{item.name}</Text>
				</View>
			);
		} else {
			return (
				<Pressable onPress={() => props.navigation.navigate("RecipeInfo", item)}>
				<View>
						<View style={recipeListStyle.foodPicContainer}>
							<Image
								style={recipeListStyle.foodPic}
								source={image}
							/>
						</View>
						<Text style={recipeListStyle.foodName}>{item.name}</Text>
				</View>
				</Pressable>
			);
		}
	}

	/**
	 * Adds more recipes to the current list
	 * when the user scrolls near the bottom
	 *
	 * @param {number} distanceFromEnd
	 */
	async function loadMoreRecipes({ distanceFromEnd }) {
		if (
			props.recipeLink != undefined &&
			props.recipeLink != "" &&
			isMoreRecipes
		) {
			let excludeQuery = "";

			props.exlusions.forEach((excluded, i) => {
				excludeQuery += `excluded=${excluded}`;

				if (i < props.exlusions) {
					excludeQuery += "&";
				}
			});

			try {
				let response = await axios({
					method: "get",
					url: `${BackEndIP}/api/addRecipes/?nextLink=${props.recipeLink}&${excludeQuery}`,
					responseType: "json",
				});

				let content = await response.data;
				props.setData(content.results, content.addRecipesLink);
			} catch (error) {
				setIsMoreRecipes(false);
			}
		} else if (recipes[recipes.length - 1].uri != "" && !loadedAllRecipes) {
			setRecipes((prevState) => {
				let newState = [...prevState];
				newState.push({
					uri: "",
					name: "No more Recipes",
					image: "",
					ingredients: [],
					source: "",
				});

				return newState;
			});
			setLoadedAllRecipes((prevState) => !prevState);
		}
	}

	let listStyle = {
		flex: 1,
		width: useWindowDimensions().width > 700 ? "30%" : "100%",
	};

	return (
		<View style={listStyle}>
			<FlatList
				data={recipes}
				renderItem={renderRecipe}
				onEndReached={loadMoreRecipes}
				onEndReachedThreshold={2}
				extraData={recipes}
			/>
		</View>
	);
}
