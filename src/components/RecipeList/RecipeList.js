import axios from "axios";
import { useEffect, useState } from "react";
import {
	FlatList,
	useWindowDimensions,
	View,
} from "react-native";
import BACKEND from "../../ipaddressesports/BackEndIP";
import RecipeCover from "../RecipeCover/RecipeCover";

/**
 * Renders a list of Recipes
 * @typedef {{
 *  	id: string,
 * 		name: string,
 *  	image: any,
 *  	ingredients: Array<string>,
 * 		source: string
 * 	}} recipe
 *
 * @param {{
 * 	recipes: Array<recipe>,
 *  recipeLink?: string,
 *  setData?: (recipeResults: Array<recipe>, addRecipesLink: string) => void,
 * 	showEnd: boolean,
 * 	navigation: any
 * }} props
 * @returns List of Recipes
 */
export default function RecipeList(props) {
	const [recipes, setRecipes] = useState(props.recipes); // List of recipes
	const [isMoreRecipes, setIsMoreRecipes] = useState(true);
	const [loadedAllRecipes, setLoadedAllRecipes] = useState(false);

	/**
	 * Forces it to update the list because some reason
	 * it doens't register it on first render
	 */
	useEffect(() => {
		setRecipes(props.recipes);
	}, [props.recipes]);

	/**
	 * Adds more recipes to the current list
	 * when the user scrolls near the bottom
	 *
	 * @param {{distanceFromEnd: number}?} info
	 */
	async function loadMoreRecipes({ distanceFromEnd }) {
		if (props.showEnd || props.setData !== undefined) {
			if (
				props.recipeLink != undefined &&
				props.recipeLink != "" &&
				isMoreRecipes
			) {
				try {
					let response = await axios({
						method: "get",
						url: `${BACKEND}/api/addRecipes/?nextLink=${props.recipeLink}`,
						responseType: "json",
					});

					let content = await response.data;
					props.setData(content.results, content.addRecipesLink);
				} catch (error) {
					setIsMoreRecipes(false);
				}
			} else if (
				recipes[recipes.length - 1].id != "" &&
				!loadedAllRecipes &&
				props.showEnd
			) {
				setRecipes((prevState) => {
					let newState = [...prevState];
					newState.push({
						id: "",
						name: "No more Recipes",
						image: "",
						ingredients: [],
						source: "",
					});

					return newState;
				});
				setLoadedAllRecipes((prevState) => !prevState);
			}
		}
	}

	/**
	 * Checks if the scroll view is near the bottom or not
	 *
	 * @param {{
	 * 		layoutMeasurement: {width: number, height: number},
	 * 		contentOffset: {x: number, y: number},
	 * 		contentSize: {width: number, height: number}
	 * }} event
	 * @returns `true` for near the bottom, `false` otherwise
	 */
	function isCloseToBottom({
		layoutMeasurement,
		contentOffset,
		contentSize,
	}) {
		const paddingToBottom = contentSize.height * 0.2;
		return (
			layoutMeasurement.height + contentOffset.y >=
			contentSize.height - paddingToBottom
		);
	}

	let listStyle = {
		flex: 1,
		width: "100%",
		alignItems: "center"
	};

	return (
		<View style={listStyle}>
			<FlatList
				numColumns={Math.round(useWindowDimensions().width / 300)}
				data={recipes}
				renderItem={({ item }) => (
					<RecipeCover
						height={300}
						width={300}
						item={item}
					/>
				)}
				onEndReached={loadMoreRecipes}
				onEndReachedThreshold={2}
				extraData={recipes}
			/>
		</View>
	);
}
