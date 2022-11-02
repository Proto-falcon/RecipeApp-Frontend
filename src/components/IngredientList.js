import { FlatList, StyleSheet, Text, View } from "react-native";
// import { igStyles } from "./IngredientListStyles";
function IngredientList(props)
{

    function renderIgs({ item })
    {
        return (<Text>{item}</Text>);
    }

    const listHeight = props.ingredients.length * 4;

    const igStyles = StyleSheet.create({
        ingredient: {
            maxHeight: listHeight + "%",
            padding: 10,
            borderWidth: 1,
            marginBottom: 10
        }
    });

    return (
        <View style={igStyles.ingredient}>
            <FlatList
                data={props.ingredients}
                renderItem={renderIgs}
            />
        </View>
    );
}

export default IngredientList;