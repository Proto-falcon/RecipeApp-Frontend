import { FlatList, Image, Text, View } from "react-native";
import IngredientList from "../IngredientList/IngredientList";
import { recipeListStyle } from "./RecipeListStyle";

export default function RecipeList(props)
{

    function renderRecipe({item})
    {
        return(
            <View style={recipeListStyle.itemContainer}>
                <Image style={recipeListStyle.foodPic} source={item.image}/>
                <Text style={recipeListStyle.foodName}>{item.name}</Text>
                <IngredientList ingredients={item.ingredients}/>
            </View>
        );
    }

    return (
        <View style={recipeListStyle.list}>
            <FlatList data={props.recipes} renderItem={renderRecipe} />
        </View>
    );
}
