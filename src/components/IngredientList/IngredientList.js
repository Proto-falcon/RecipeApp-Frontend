import { FlatList, Text, View } from "react-native";
import { igStyles } from "./IngredientListStyles";

export default function IngredientList(props)
{
    const height = props.ingredients.length <= 1 ? "12%" : "20%";

    function renderIgs({ item })
    {
        return (<Text>{item}</Text>);
    }

    return (
        <View>
            <FlatList
                style={[igStyles.ingredient, {maxHeight: height}, {flexGrow: 0}]}
                data={props.ingredients}
                renderItem={renderIgs}
            />
        </View>
    );
}
