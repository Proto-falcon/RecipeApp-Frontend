import { FlatList, Image, Text, View } from "react-native";
import { styles } from "../../AppStyles";
import IngredientList from "../IngredientList/IngredientList";

export default function RecipeList(props)
{

    function renderRecipe({item})
    {
        return(
            <>
                <Image style={styles.foodPic} source={item.image}/>
                <Text style={styles.foodName}>{item.name}</Text>
                <IngredientList ingredients={item.ingredients}/>
            </>
        );
    }

    return (
        <View style={{maxHeight: "55%"}}>
            <FlatList data={props.recipes} renderItem={renderRecipe} />
        </View>
    );
}
