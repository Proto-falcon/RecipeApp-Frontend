import axios from "axios";
import { lazy, Suspense, useContext, useEffect, useState } from "react";
import {
	ActivityIndicator,
	FlatList,
	Image,
	Linking,
	Platform,
	Pressable,
	Text,
	View,
} from "react-native";
import { styles } from "../../AppStyles";
import { recipeListStyle } from "../../components/RecipeList/RecipeListStyle";
import { AccountCtx } from "../../context/account";
import BACKEND from "../../ipaddressesports/BackEndIP";
import NavBar from "../../components/NavBar/NavBar";
import { CsrfCtx } from "../../context/CsrfToken";
import { NavBarStyle } from "../../components/NavBar/NavBarStyle";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { recipeInfoStyles } from "./RecipeInfoStyle";

const WrappingItems = lazy(() =>
	import("../../components/WrappingItems/WrappingItems")
);

export default function RecipeInfo({ route, navigation }) {
	const accCtx = useContext(AccountCtx);
	const authCtx = useContext(CsrfCtx);

	const [workingLink, setWorkingLink] = useState(false);
	const [mounted, setMounted] = useState(true);
	const [name, setName] = useState("Recipe Unavailable");
	const [image, setImage] = useState(require("../../../assets/favicon.png"));
	const [ingredients, setIngredients] = useState([]);
	const [source, setSource] = useState("");

	const [ratingRange, setRatingRange] = useState([0, 1]);
	const [rating, setRating] = useState("0.0");
	const [selectedRating, setSelectedRating] = useState(0);

	/**
	 * Updates the rating range where `min` is the minimum value & `max` is the max value.
	 * If `min` > `max` then sets the range to only `min`.
	 * `min` & `max` values are both included in the range
	 *
	 * @param {number} min
	 * @param {number} max
	 */
	function updateRatingRange(min, max) {
		if (min > max) {
			setRatingRange([min]);
			return;
		}

		let newRange = [];

		for (let index = min; index <= max; index++) {
			newRange.push(index);
		}

		setRatingRange(newRange);
	}

	/**
	 * Updates the `selectedRating` state & sends it to the current server
	 *
	 * @param {number} newRating
	 */
	async function ChangeRating(newRating) {
		setSelectedRating(newRating);

		try {
			await axios.put(
				`${BACKEND}/api/setRating/`,
				{
					id: route.params.id,
					rating: newRating,
				},
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
	}

	/**
	 * Renders Recipe Rating button
	 *
	 * @param {{item: number}} param
	 * @returns Rendered Recipe Rating button
	 */
	function renderRatingOptions({ item, index }) {
		return (
			<Pressable
				key={index}
				style={{
					...recipeInfoStyles.ratingButton,
					backgroundColor:
						selectedRating !== item ? "#fd5d00" : "#00ff0d",
				}}
				onPress={() => ChangeRating(item)}
			>
				<Text style={{ fontWeight: "bold", fontSize: 20 }}>{item}</Text>
			</Pressable>
		);
	}

	/**
	 * Renders recipe Ingredient
	 *
	 * @param {{item: string, index: number}} param
	 * @returns Rendered Recipe Ingredient
	 */
	function RenderIngredients({ item, index }) {
		return (
			<Text style={{ textAlign: "left" }}>
				{index + 1}. {item}
			</Text>
		);
	}

	/**
	 * Checks if the link works or not
	 */
	async function testLink() {
		if (source.length > 0) {
			let canOpen = await Linking.canOpenURL(source);
			if (canOpen) {
				setWorkingLink(true);
			}
		}
	}

	/**
	 * Gets the relevant info about the recipe
	 */
	async function getRecipe() {
		try {
			let response = await axios.get(
				`${BACKEND}/api/getRecipe/?id=${route.params.id}`
			);
			let content = await response.data;
			setName(content.name);
			setImage({
				uri: `${BACKEND}${content.image}`,
				height: "100%",
				width: "100%",
			});
			setIngredients(content.ingredients);
			setSource(content.source);
			updateRatingRange(content.minRating, content.maxRating);
			console.log(content.userRating)
			if (accCtx.loggedIn) {
				setSelectedRating(content.userRating);
			}
			if (content.rating !== null) {
				setRating(content.rating.toFixed(1));
			} else {
				setRating("No Ratings");
			}
		} catch (error) {}
	}

	// Fetches the recipes from the backend
	useEffect(() => {
		accCtx.checkCred(authCtx, BACKEND);
		getRecipe();
	}, [mounted, route.params]);

	useEffect(() => {
		testLink();
	}, [source]);

	return (
		<View style={styles.pageContainer}>
			<NavBar
				routeName={route.name}
				style={{
					...NavBarStyle.container,
					alignItems: Platform.OS === "web" ? "center" : "flex-end",
				}}
			/>
			<Suspense fallback={<ActivityIndicator size="large" />}>
				<View style={{ alignItems: "center" }}>
					<Text
						style={{
							textAlign: "center",
							fontSize: 30,
							fontWeight: "bold",
							textDecorationLine: "underline",
						}}
					>
						{name}
					</Text>
					<View
						style={{
							...recipeListStyle.foodPicContainer,
							...recipeListStyle.foodPic,
						}}
					>
						<Image
							style={{ resizeMode: "contain" }}
							source={image}
						/>
					</View>
					<View
						style={{
							flexDirection: "row",
							flexWrap: "wrap",
							justifyContent: "space-evenly",
							width: "70%",
						}}
					>
						<Pressable
							style={recipeInfoStyles.source}
							onPress={async () => {
								if (workingLink) {
									return Linking.openURL(source);
								}
							}}
						>
							<Text style={{ fontWeight: "bold", fontSize: 15 }}>
								{workingLink ? "Source" : "No Source"}
							</Text>
						</Pressable>
						<View style={{ alignItems: "center" }}>
							<Text style={{ fontSize: 20 }}>
								<FontAwesomeIcon icon={"star"} /> Rating:{" "}
								{rating}
							</Text>
							<View
								style={{
									width: "100%",
									alignItems: "center",
									borderWidth: 2,
								}}
							>
								<WrappingItems items={ratingRange} renderItems={renderRatingOptions} />
							</View>
						</View>
					</View>
					<View style={{ paddingTop: 10 }}>
						<Text
							style={{
								fontWeight: "bold",
								fontSize: 20,
								textDecorationLine: "underline",
								textAlign: "center",
							}}
						>
							Ingredients
						</Text>
						<FlatList
							data={ingredients}
							renderItem={RenderIngredients}
						/>
					</View>
				</View>
			</Suspense>
		</View>
	);
}
