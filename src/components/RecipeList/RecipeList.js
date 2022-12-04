import axios from "axios";
import { FlatList, Image, Text, View } from "react-native";
import BackEndIP from "../../ipaddressesports/BackEndIP";
import { recipeListStyle } from "./RecipeListStyle";

export default function RecipeList(props) {
	function renderRecipe({ item }) {
		let image = "";

		if (item.image != "" )
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
        if (props.hasResults)
        {
            let response = await axios({
                method: "get",
                url:
                    "http://" + BackEndIP + "/addRecipes/?nextLink=" + props.addRecipesLink,
                responseType: "json",
            });

            let content = await response.data;
			props.setData(content.results);
			props.setLink(content.addRecipesLink);
        }
    }

	return (
		<View style={recipeListStyle.list}>
			<FlatList
				data={props.recipes}
				renderItem={renderRecipe}
                onEndReached={loadMoreRecipes}
                onEndReachedThreshold={2}
			/>
		</View>
	);
}
