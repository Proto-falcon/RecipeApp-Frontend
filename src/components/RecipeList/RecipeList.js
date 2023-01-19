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
 *  	image: string,
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
        if (recipes[0].source != "")
        {
            let response = await axios({
                method: "get",
                url: BACKEND + "/addRecipes/?nextLink=" + props.recipeLink,
                responseType: "json",
            });

            let content = await response.data;
			props.setData(content.results, content.addRecipesLink);
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
			/>
		</View>
	);
}
