import axios from "axios";
import { useEffect, useState } from "react";
import { FlatList, Image, Text, View } from "react-native";
import BackEndIP from "../../ipaddressesports/BackEndIP";
import { recipeListStyle } from "./RecipeListStyle";

export default function RecipeList(props) {

	const [recipes, setRecipes] = useState(props.recipes);

	useEffect(() => {
		setRecipes(props.recipes)
	}, [props.recipes]);

	function renderRecipe({ item }) {
		let image = "";
		if (item.image != "")
		{
			image = {uri:item.image, height: 200, width: "100%"};
		}
		else
		{
			image = require("../../../assets/favicon.png");
		}

		return (
			<View style={recipeListStyle.itemContainer}>
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

    async function loadMoreRecipes({distanceFromEnd})
    {
        if (recipes[0].source != "")
        {
            let response = await axios({
                method: "get",
                url:
                    "http://" + BackEndIP + "/addRecipes/?nextLink=" + props.moreRecipesLink,
                responseType: "json",
            });

            let content = await response.data;
			props.addRecipes(content.results, content.addRecipesLink);
        }
    }

	return (
		<View style={recipeListStyle.list}>
			<FlatList
				data={recipes}
				renderItem={renderRecipe}
                onEndReached={loadMoreRecipes}
                onEndReachedThreshold={2}
			/>
		</View>
	);
}
