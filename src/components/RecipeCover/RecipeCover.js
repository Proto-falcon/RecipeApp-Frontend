import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { useContext, useState } from "react";
import { Image, Pressable, Text, View } from "react-native";
import { CsrfCtx } from "../../context/CsrfToken";
import BACKEND from "../../ipaddressesports/BackEndIP";
import { recipeListStyle } from "../RecipeList/RecipeListStyle";
import { RecipeResultsCtx } from "../../context/Context";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { defaultImage } from "../../Constants";

/**
 * Renders a recipe with in image and name
 * 
 * @typedef {import("../../Constants").recipe} recipe 
 * @param {{
 *      item: recipe,
 * 		height: number | string,
 * 		width: number | string,
 * 		flexGrow?: number
 * }} prop
 * @returns A recipe with image and name
 */
export default function RecipeCover({ item, height, width, flexGrow }) {
	const navigation = useNavigation();
	const authCtx = useContext(CsrfCtx);
	const recipeResultsCtx = useContext(RecipeResultsCtx);
	const [rating, setRating] = useState(() => {
		if (item.rating === null) {
			return "No Rating";
		} else {
			return item.rating;
		}
	});

	const [image, setImage] = useState(() => {
		if (item.image !== "") {
			let image = item.image;
			if (!image.startsWith("http")) {
				return {
					uri: `${BACKEND}${item.image}`,
					height: "100%",
					width: "100%",
				};
			} else {
				return { uri: item.image, height: "100%", width: "100%" };
			}
		} else {
			return defaultImage;
		}
	});

	/**
	 * Adds going to be viewed recipe in recents for the logged in user
	 * before going to recipe page.
	 *
	 * @param {recipe} recipe
	 */
	async function toRecipeInfo(recipe) {
		try {
			await axios.post(
				`${BACKEND}/api/setRecentRecipe/`,
				{ id: recipe.id },
				{
					headers: {
						"X-CSRFToken": authCtx.token,
						credentials: "include",
					},
					withCredentials: true,
					responseType: "json",
				}
			);
		} catch (error) {}
		recipeResultsCtx.setCurrentRecipeURI(recipe.id);
		navigation.navigate("RecipeInfo", { id: recipe.id });
	}

	if (item.id === "") {
		return (
			<View
				key={item.id}
				style={{ width: width, height: height, flexGrow: flexGrow }}
			>
				<View style={recipeListStyle.foodPicContainer}>
					<Image
						style={recipeListStyle.foodPic}
						source={image}
					/>
				</View>
				<Text style={recipeListStyle.foodName}>{item.name}</Text>
			</View>
		);
	} else {
		return (
			<Pressable
				key={item.id}
				onPress={() => toRecipeInfo(item)}
				style={{ width: width, height: height, flexGrow: flexGrow }}
			>
				<View style={recipeListStyle.foodPicContainer}>
					<Image
						style={recipeListStyle.foodPic}
						source={image}
					/>
				</View>
				<View style={recipeListStyle.nameRatingContainer}>
					<Text style={recipeListStyle.foodName}>{item.name}</Text>
					<Text style={recipeListStyle.foodName}><FontAwesomeIcon icon={"star"} /> {rating}</Text>
				</View>
			</Pressable>
		);
	}
}
