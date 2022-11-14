import { FlatList, Image, Text, View } from "react-native";
import { styles } from "../../AppStyles";
import IngredientList from "../IngredientList/IngredientList";

export default function RecipeList(props)
{

    function renderRecipe({item})
    {
        return(
            <>
                <Image style={[styles.foodPic, {flexGrow: 1}]} source={item.image}/>
                <Text style={[styles.foodName, {flexGrow: 1}]}>{item.name}</Text>
                <IngredientList ingredients={item.ingredients}/>
            </>
        );
    }

    return (
            <FlatList style={{height: 100, width: "20%"}} data={props.recipes} renderItem={renderRecipe} />
    );
}
