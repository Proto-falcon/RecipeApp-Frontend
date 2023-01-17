import { Link } from "@react-navigation/native";
import { useContext } from "react";
import { Image, View } from "react-native";
import RecipeResultsCtx from "../../context/Context";
import RecipeList from "../RecipeList/RecipeList";
import { SearchStyle } from "./SearchStyle";

/**
 * Renders the page with recipe results depending on
 * the options selected in Search Options page 🔎
 *
 * @returns {JSX.Element} Search Results Page
 */
export default function Search() {
	const ctx = useContext(RecipeResultsCtx);

	const image = require("../../../assets/searchIcon.png");

	return (
		<View style={SearchStyle.container}>
			<Link
				to={{ screen: "Search" }}
				style={SearchStyle.imgContainer}
			>
				<Image
					style={SearchStyle.searchIcon}
					source={image}
				/>
			</Link>
			<RecipeList
				recipes={ctx.results}
				setData={ctx.addRecipes}
				recipeLink={ctx.moreRecipesLink}
			/>
		</View>
	);
}
