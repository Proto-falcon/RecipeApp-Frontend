import axios from "axios";
import { lazy, Suspense, useContext, useEffect, useState } from "react";
import {
	ActivityIndicator,
	Image,
	Linking,
	Platform,
	Pressable,
	ScrollView,
	Text,
	useWindowDimensions,
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
import { RecipeResultsCtx } from "../../context/Context";

const WrappingItems = lazy(() =>
	import("../../components/WrappingItems/WrappingItems")
);
const ItemsArray = lazy(() => import("../../components/ItemsArray/ItemsArray"));

export default function RecipeInfo({ route, navigation }) {
	const accCtx = useContext(AccountCtx);
	const authCtx = useContext(CsrfCtx);
	const recipeResultsCtx = useContext(RecipeResultsCtx);

	const [workingLink, setWorkingLink] = useState(false);
	const [mounted, setMounted] = useState(true);
	const [name, setName] = useState("Recipe Unavailable");
	const [image, setImage] = useState(require("../../../assets/favicon.png"));
	const [ingredients, setIngredients] = useState([]);
	const [source, setSource] = useState("");
	const [cautions, setCautions] = useState([]);

	const [categories, setCategories] = useState({});

	const [calories, setCalories] = useState("0.0");
	const [nutrients, setNutrients] = useState([]);

	const [ratingRange, setRatingRange] = useState([0, 1]);
	const [rating, setRating] = useState("0.0");
	const [selectedRating, setSelectedRating] = useState(0);

	// Fetches the recipes from the backend
	useEffect(() => {
		accCtx.checkCred(authCtx, BACKEND);
		if (
			recipeResultsCtx.currentRecipeURI !== "" &&
			recipeResultsCtx.currentRecipeURI !== route.params.id
		) {
			navigation.setParams({ id: recipeResultsCtx.currentRecipeURI });
		}
		getRecipe();
	}, [
		mounted,
		route.key,
		recipeResultsCtx.currentRecipeURI,
		route.params.id,
	]);

	useEffect(() => {
		testLink();
	}, [source]);

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
			<Text
				key={index}
				style={{ textAlign: "center", width: "100%" }}
			>
				{index + 1}. {item}
			</Text>
		);
	}

	/**
	 * Renders a cautions text
	 *
	 * @param {{item: string, index: number}} param
	 * @returns
	 */
	function renderCautions({ item, index }) {
		return (
			<Text
				key={index}
				style={{
					color: "white",
					fontWeight: "bold",
					textAlign: "center",
					flex: 1,
					// maxWidth: "40%",
					padding: 3,
					fontSize: 20,
				}}
			>
				{item}
			</Text>
		);
	}

	/**
	 * @typedef {{
	 * 		label: string,
	 * 		quantity: number,
	 * 		unit: string
	 * } | string} nutrient
	 *
	 * @param {{item: nutrient, index: number}} param
	 * @returns
	 */
	function renderNutrients({ item, index }) {
		if (typeof item.quantity === "number") {
			return (
				<View
					key={index}
					style={{
						...recipeInfoStyles.nutrientRow,
						borderBottomWidth: 1,
					}}
				>
					<Text
						style={{
							...recipeInfoStyles.nutrientCell,
							textAlign: "left",
							borderRightWidth: 2,
						}}
					>
						{item.label}
					</Text>
					<Text
						style={{
							...recipeInfoStyles.nutrientCell,
							textAlign: "right",
						}}
					>
						{item.quantity.toFixed(1)}
						{item.unit}
					</Text>
				</View>
			);
		} else {
			return (
				<View
					key={index}
					style={{
						flexDirection: "row",
						justifyContent: "space-between",
						borderBottomWidth: 2,
					}}
				>
					<Text
						style={{
							...recipeInfoStyles.nutrientCell,
							textAlign: "left",
							fontWeight: "bold",
							borderRightWidth: 2,
						}}
					>
						{item.label}
					</Text>
					<Text
						style={{
							...recipeInfoStyles.nutrientCell,
							textAlign: "right",
							fontWeight: "bold",
						}}
					>
						{item.quantity}
						{item.unit}
					</Text>
				</View>
			);
		}
	}

	/**
	 * Renders a list of sub categories in wider category
	 *
	 * @param {{
	 * 		item: {
	 * 			category: string,
	 * 			values: string[]
	 * 		},
	 * 		index: number
	 * }} param
	 * @returns List of sub categories that the recipe is in
	 */
	function renderCategories({ item, index }) {
		return (
			<View
				key={index}
				style={{ borderBottomWidth: 1 }}
			>
				<Text style={{ ...recipeInfoStyles.recipeName, fontSize: 20 }}>
					{item.category}
				</Text>
				<View
					style={{ justifyContent: "center", alignItems: "center" }}
				>
					<WrappingItems
						style={{ justifyContent: "center" }}
						items={item.values}
						renderItems={({ item, index }) => (
							<Text
								key={index}
								style={{ padding: 3 }}
							>
								{item}
							</Text>
						)}
					/>
				</View>
			</View>
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
			setCautions(content.cautions);

			setCategories([
				{ category: "Diets", values: content.diets },
				{ category: "Healths", values: content.healths },
				{ category: "Cuisines", values: content.cuisineTypes },
				{ category: "Meals Types", values: content.mealTypes },
				{ category: "Dish Types", values: content.dishTypes },
			]);

			let nutrientsArray = [];
			content.nutrients.forEach((nutrient) => {
				if (nutrient.label === "Energy") {
					setCalories(
						`${Math.round(nutrient.quantity)} ${nutrient.unit}`
					);
				} else {
					nutrientsArray.push(nutrient);
				}
			});

			setNutrients(nutrientsArray);

			updateRatingRange(content.minRating, content.maxRating);
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
				<ScrollView contentContainerStyle={{ alignItems: "center" }}>
					<Text
						style={{ ...recipeInfoStyles.recipeName, fontSize: 50 }}
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
					<View style={recipeInfoStyles.srcRatingContainer}>
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
								<FontAwesomeIcon icon={"star"} /> Overal Rating:{" "}
								{rating}
							</Text>
							<View style={recipeInfoStyles.ratingsContainer}>
								<WrappingItems
									items={ratingRange}
									renderItems={renderRatingOptions}
								/>
							</View>
						</View>
					</View>
					<View
						style={{
							paddingTop: 10,
							alignItems: "center",
							width:
								useWindowDimensions().width < 700
									? "100%"
									: "50%",
						}}
					>
						<Text style={recipeInfoStyles.recipeName}>
							Ingredients
						</Text>
						<View
							style={{
								borderWidth: 2,
								width: "100%"
							}}
						>
							<ItemsArray
								data={ingredients}
								renderItem={RenderIngredients}
							/>
						</View>
					</View>
					<View style={{ alignItems: "center" }}>
						{cautions.length > 0 ? (
							<>
								<Text
									style={{
										...recipeInfoStyles.cautionsText,
										...recipeInfoStyles.cautionsHeader,
									}}
								>
									Cautions
								</Text>
								<WrappingItems
									style={{
										borderWidth: 2,
										backgroundColor: "#951831",
									}}
									items={cautions}
									renderItems={renderCautions}
								/>
							</>
						) : undefined}
						<Text
							style={{
								...recipeInfoStyles.recipeName,
								textDecorationLine: "none",
							}}
						>
							Calories: {calories}
						</Text>
						<View
							style={{
								borderWidth: 2,
								borderBottomWidth: 0,
								width:
									useWindowDimensions().width < 700
										? "100%"
										: "50%",
							}}
						>
							<ItemsArray
								data={categories}
								renderItem={renderCategories}
							/>
						</View>
					</View>
					<View>
						<Text style={{ ...recipeInfoStyles.recipeName }}>
							Nutrient Information
						</Text>
					</View>
					<View
						style={{
							borderWidth: 2,
							borderBottomWidth: 0,
							marginTop: 10,
							width:
								useWindowDimensions().width < 700
									? "100%"
									: "50%",
						}}
					>
						<ItemsArray
							data={[
								{
									label: "Label",
									quantity: "Quantity",
									unit: "(Units)",
								},
							].concat(nutrients)}
							renderItem={renderNutrients}
						/>
					</View>
				</ScrollView>
			</Suspense>
		</View>
	);
}
