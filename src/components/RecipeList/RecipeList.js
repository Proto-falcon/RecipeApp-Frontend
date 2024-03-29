import axios from "axios";
import { useEffect, useState } from "react";
import {
	FlatList,
	Platform,
	Pressable,
	ScrollView,
	Text,
	View,
} from "react-native";
import BACKEND from "../../ipaddressesports/BackEndIP";
import RecipeCover from "../RecipeCover/RecipeCover";
import WrappingItems from "../WrappingItems/WrappingItems";
import { NoMoreRecipes } from "../../Constants";

/**
 * Renders a list of Recipes
 * @typedef {import("../../Constants").recipe} recipe
 * @param {{
 * 	recipes: Array<recipe>,
 * 	canLoad: boolean
 *  recipeLink?: string,
 *  setData?: (recipeResults: Array<recipe>, addRecipesLink: string) => void,
 * }} props
 * @returns List of Recipes
 */
export default function RecipeList(props) {

	const [recipes, setRecipes] = useState(props.recipes);

	const [lastLoaded, setLastLoaded] = useState(new Date().getTime());
	const [loadedAllRecipes, setLoadedAllRecipes] = useState(false);

	/**
	 * Updates the `recipes` array and checks if there are more recipes to load
	 *
	 * When the Search page is the first screen loaded it will never `unmount` while navigating
	 * to other screens then back to it because `react-navigation` it keeps previously loaded screens mounted.
	 * If you go back to a previously loaded screen it will unmount the screens that you loaded after that screen.
	 */
	useEffect(() => {
		if (
			props.canLoad && props.recipes.length < 20 &&
			(props.recipeLink !== "" || props.recipeLink !== undefined) &&
			props.recipes[props.recipes.length - 1].id !== ""
		) {
			setLoadedAllRecipes(true);
			setRecipes(() => {
				let recArray = props.recipes;
				recArray.push(NoMoreRecipes);
				return recArray;
			});
		}
		setRecipes(props.recipes);
	}, [props.recipes]);

	/**
	 * Adds more recipes to the current list
	 * when the user scrolls near the bottom
	 *
	 * @param {{distanceFromEnd: number}?} info
	 */
	async function loadMoreRecipes({ distanceFromEnd }) {
		if (props.setData !== undefined && props.canLoad) {
			const lastFetched = new Date().getTime();
			if (
				props.recipeLink != undefined &&
				props.recipeLink != "" &&
				!loadedAllRecipes && (lastFetched - lastLoaded > 6000)
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
					setLoadedAllRecipes(true);
				}
				setLastLoaded(lastFetched);
			} else if (
				recipes[recipes.length - 1].id != "" &&
				loadedAllRecipes
			) {
				setRecipes((prevState) => {
					let newState = [...prevState];
					newState.push(NoMoreRecipes);

					return newState;
				});
			}
		}
	}

	/**
	 * Renders the load more button to load more recipes
	 *
	 * @param {{loadMore: boolean}} props
	 * @returns Load more button
	 */
	function LoadMoreRecipesButton({ loadMore }) {
		if (loadMore) {
			return (
				<Pressable
					style={{ backgroundColor: "ff6e00", padding: 5 }}
					onPress={loadMoreRecipes}
				>
					<Text
						style={{
							textAlign: "center",
							fontWeight: "bold",
							fontSize: 50,
						}}
					>
						Load More
					</Text>
				</Pressable>
			);
		}
	}

	return (
		<View style={{width: "100%"}}>
			{Platform.OS != "web" ? (
				<FlatList
					data={recipes}
					renderItem={({ item }) => (
						<RecipeCover
							height={300}
							width={"100%"}
							item={item}
						/>
					)}
					onEndReached={loadMoreRecipes}
					onEndReachedThreshold={2}
					extraData={recipes}
				/>
			) : (
				<ScrollView>
					<WrappingItems
						items={recipes}
						renderItems={({ item, index }) => (
							<RecipeCover
								key={index}
								height={300}
								width={300}
								item={item}
								flexGrow={1}
							/>
						)}
					/>
					<LoadMoreRecipesButton
						loadMore={props.canLoad && !loadedAllRecipes && props.recipeLink !== ""}
					/>
				</ScrollView>
			)}
		</View>
	);
}
