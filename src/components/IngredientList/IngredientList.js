import { FlatList, Text, View } from "react-native";
import { igStyles } from "./IngredientListStyles";

export default function IngredientList(props)
{
    function renderIgs({ item })
    {
        return (<Text>{item}</Text>);
    }

    return (
        <View style={igStyles.ingredient}>
            <FlatList
                data={props.ingredients}
                renderItem={renderIgs}
            />
        </View>
    );
}
