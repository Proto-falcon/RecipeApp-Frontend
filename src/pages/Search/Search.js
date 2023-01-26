import { useContext, useEffect } from "react";
import { View } from "react-native";
import RecipeResultsCtx from "../../context/Context";
import RecipeList from "../../components/RecipeList/RecipeList";
import { SearchStyle } from "./SearchStyle";
import { styles } from "../../AppStyles";

/**
 * Renders the page with recipe results depending on
 * the options selected in Search Options page 🔎
 *
 * @returns Search Results Page
 */
export default function Search() {
	const ctx = useContext(RecipeResultsCtx);
	useEffect(() => ctx.setIsLoading(false), [ctx.isLoading]);
	return (
		<View style={{...SearchStyle.container, ...styles.pageContainer}}>
			{!ctx.isLoading && <RecipeList
				recipes={ctx.results}
				setData={ctx.addRecipes}
				recipeLink={ctx.moreRecipesLink}
			/>}
		</View>
	);
}
