import axios from "axios";
import { useEffect, useState } from "react";
import {
	FlatList,
	Pressable,
	ScrollView,
	Text,
	useWindowDimensions,
	View,
} from "react-native";
import BACKEND from "../../ipaddressesports/BackEndIP";
import RecipeCover from "../RecipeCover/RecipeCover";
import WrappingItems from "../WrappingItems/WrappingItems";

/**
 * Renders a list of Recipes
 * @typedef {import("../../Constants").recipe} recipe
 * @param {{
 * 	recipes: Array<recipe>,
 *  recipeLink?: string,
 *  setData?: (recipeResults: Array<recipe>, addRecipesLink: string) => void,
 * }} props
 * @returns List of Recipes
 */
export default function RecipeList(props) {
	
	const NoMoreRecipes = {
		id: "",
		name: "No more Recipes",
		image: "",
		ingredients: [],
		source: "",
		rating: "0.0"
	};

	const [recipes, setRecipes] = useState(props.recipes);
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
			props.recipes.length < 20 &&
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
		if (props.showEnd || props.setData !== undefined) {
			if (
				props.recipeLink != undefined &&
				props.recipeLink != "" &&
				!loadedAllRecipes
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
			} else if (
				recipes[recipes.length - 1].id != "" &&
				loadedAllRecipes &&
				props.showEnd
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

	const width = useWindowDimensions().width;
	const numCols = Math.floor(width / 300);
	return (
		<View style={{width: "100%"}}>
			{numCols <= 1 ? (
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
						loadMore={!loadedAllRecipes && props.recipeLink !== ""}
					/>
				</ScrollView>
			)}
		</View>
	);
}
