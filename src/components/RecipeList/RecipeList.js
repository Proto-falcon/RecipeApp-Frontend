import axios from "axios";
import { useEffect, useState } from "react";
import { FlatList, Image, Text, useWindowDimensions, View } from "react-native";
import BackEndIP from "../../ipaddressesports/BackEndIP";
import { recipeListStyle } from "./RecipeListStyle";

let BACKEND = "/";
if (__DEV__) {
    BACKEND = BackEndIP;
}

/**
 * Renders a list of Recipes
 * @typedef {{
 * 		name: string,
 *  	image: any,
 *  	ingredients: Array<string>,
 *  	source: string
 * 	}} recipe
 * 
 * @param {{
 * 	recipes:
 * 		Array<recipe>,
 *  recipeLink: string,
 *  setData: (recipeResults: Array<recipe>, addRecipesLink: string) => void
 * }} props 
 * @returns List of Recipes
 */
export default function RecipeList(props) {

	const [recipes, setRecipes] = useState(props.recipes); // List of recipes
	const [isMoreRecipes, setIsMoreRecipes] = useState(true);
	const [loadedAllRecipes, setLoadedAllRecipes] = useState(false);
	const [width, setWidth] = useState(useWindowDimensions().width);

	/**
	 * Forces it to update the list because some reason
	 * it doens't register it on first render
	 */
	useEffect(() => {
		setRecipes(props.recipes)
	}, [props.recipes]);

	/**
	 * Renders a recipe with in image and name
	 * 
	 * @param {recipe} item 
	 * @returns A recipe with image and name
	 */
	function renderRecipe({ item }) {
		let image = "";
		if (item.image != "")
		{
			image = {uri:item.image, height: width, width: "100%"};
		}
		else
		{
			image = require("../../../assets/favicon.png");
		}

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
	}

	/**
	 * Adds more recipes to the current list
	 * when the user scrolls near the bottom
	 * 
	 * @param {number} distanceFromEnd 
	 */
    async function loadMoreRecipes({distanceFromEnd})
    {
		if (props.recipeLink != undefined && props.recipeLink != "" && isMoreRecipes)
		{
			try {
				let response = await axios({
					method: "get",
					url: `${BACKEND}/api/addRecipes/?nextLink=${props.recipeLink}`,
					responseType: "json",
				});

				let content = await response.data;
				props.setData(content.results, content.addRecipesLink);
			} catch (error) {
				setIsMoreRecipes(false);
			}
		}
		else if (recipes[recipes.length - 1].source != "" && !loadedAllRecipes) {
			setRecipes((prevState) => {
				let newState = [...prevState]
				newState.push({
					name: "No more Recipes",
					image: "",
					ingredients: [],
					source: "",
				});
			
				return newState
			});
			setLoadedAllRecipes(prevState => !prevState);
		}
    }

	let listStyle = {
		flex: 1,
		width: width > 700 ? "30%" : "100%",
		
	};

	return (
		<View style={[listStyle]}>
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
