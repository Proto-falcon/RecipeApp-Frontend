import { FlatList, Text, View } from "react-native";
import { igStyles } from "./IngredientListStyles";

/**
 * Renders a list of Ingredients
 * 
 * @param {{ingredients: Array<string>}} props 
 * @returns {JSX.Element}
 */
export default function IngredientList(props)
{
    /**
     * Text for a single ingredient
     * 
     * @param {string} item
     * @param {number} index 
     * @returns {JSX.Element} An ingredient
     */
    function renderIgs({ item, index })
    {
        return (<Text>{index + 1}.  {item}</Text>);
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
