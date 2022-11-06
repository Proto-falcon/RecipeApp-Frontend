import { FlatList, Text, View } from "react-native";
import { igStyles } from "./IngredientListStyles";

export default function IngredientList(props)
{
    const height = props.ingredients.length <= 1 ? "7%" : "20%";

    function renderIgs({ item })
    {
        return (<Text>{item}</Text>);
    }

    return (
        <View style={[igStyles.ingredient, {maxHeight: height}]}>
            <FlatList
                data={props.ingredients}
                renderItem={renderIgs}
            />
        </View>
    );
}
