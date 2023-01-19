import axios from "axios";
import { useContext, useState } from "react";
import {
	Button,
	FlatList,
	Image,
	NativeModules,
	Pressable,
	Text,
	TextInput,
	useWindowDimensions,
	View,
} from "react-native";
import { styles } from "../../AppStyles";
import RecipeOption from "../../components/RecipeOption/RecipeOption";
import RecipeResultsCtx from "../../context/Context";
import BackEndIP from "../../ipaddressesports/BackEndIP";
import { DIETS } from "../../RecipeMetaOptions";
import { SearchOptionsStyle } from "./SearchOptionsStyle";

let BACKEND = "/";
if (__DEV__) {
    BACKEND = BackEndIP;
}

/**
 * Renders a page that has options to search recipes
 *
 * @param {*} navigation
 * @returns Search Options Page
 */
export default function SearchOptions({ navigation }) {
	const ingredients = [
		{
			id: 1,
			ingredient: "fish",
		},
		{
			id: 2,
			ingredient: "chicken",
		},
		{
			id: 3,
			ingredient: "onion",
		},
		{
			id: 4,
			ingredient: "cheese",
		},
		{
			id: 5,
			ingredient: "apple",
		},
	];

	const ctx = useContext(RecipeResultsCtx);

	const {UIManager} = NativeModules;
	UIManager.setLayoutAnimationEnabledExperimental(true);

	// const [addedIgs, setAddedIgs] = useState([]); // array of ingredients selected

	// collection of arrays of optional values
	const [options, setOptions] = useState(
		{
			diet: [],
			health: [],
			cuisineType: [],
			mealType: [],
			dishType: [],
		});

	const [inputIg, setinputIg] = useState(""); // string of ingredients inputted by user
	const [hasError, setHasError] = useState(false); // checks if the user hasn't inputted/selected ingredients
	const [width, setWidth] = useState(useWindowDimensions().width);

	const image = require("../../../assets/searchIcon.png");

	/**
	 * Updates the selected options
	 * 
	 * @param {string} type 
	 * @param {Array<string>} optionsArray 
	 */
	function updateOptions(type, optionsArray) {
		setOptions((preveState) => {
			let newState = {...preveState}
			newState[type] = optionsArray

			return newState;
		});
	}

	/**
	 * Checks if all the options array are empty
	 * 
	 * @returns true if all options are empty, false otherwise.
	 */
	function isOptionsEmpty() {
		let emptyCount = 0;
		let numProps = 0
		for (const option in options) {
			if (option.length <= 0) emptyCount += 1;
			numProps += 1;
		}

		return emptyCount >= numProps
	}

	/**
	 * Fetches recipes using the options object and inputIg
	 */
	async function fetchFood() {
		if (inputIg.length <= 0 && isOptionsEmpty()) {
			setHasError(true);
			return;
		}

		setHasError(false);

		let queryOptions = "";

		if (isOptionsEmpty) {
			for (const option in options)
			{
				options[option].forEach((item, index) => {
					queryOptions += `${option}=${item}`
					if (index < options[option].length - 1) {
						queryOptions += "&"
					}
				});
			}
		}

		// if (addedIgs.length > 0) {
		// 	for (let i = 0; i < addedIgs.length; i++) {
		// 		queryOptions += addedIgs[i].ingredient;
		// 		if (i - 1 < addedIgs.length) {
		// 			queryOptions += " ";
		// 		}
		// 	}
		// }

		let query = "";
		if (inputIg.trim().length > 0 && queryOptions.length > 0) {
			query = `ingredients=${inputIg.trim()}&${queryOptions}`;
		}
		else if (inputIg.trim().length > 0) {
			query = `ingredients=${inputIg.trim()}`
		}
		else if (queryOptions.length > 0) {
			query = queryOptions;
		}

		try {
			let response = await axios({
				method: "get",
				url: `${BACKEND}/?${query}`,
				responseType: "json",
			});

			if (199 < response.status < 300) {
				let content = await response.data;

				ctx.getRecipes(content.results);
				ctx.setAddRecipesLink(content.addRecipesLink);
			}
		} catch {
			ctx.getRecipes([
				{
					name: "No Recipe Name Available",
					image: require("../../../assets/favicon.png"),
					ingredients: ["None"],
					source: "",
				},
			]);
		}

		return navigation.navigate("Home");
	}

	/**
	 * Updates the inputIg with the text entered
	 * by user.
	 *
	 * @param {string} igs
	 */
	function inputIngredients(igs) {
		setinputIg(igs);
	}

	/**
	 * Displays the error message when no inputs are given.
	 * @returns Error display message or none.
	 */
	function TextError() {
		return hasError ? (
			<Text style={SearchOptionsStyle.errorMsg}>
				Please enter food name/ingredients
			</Text>
		) : null
	}

	return (
		<View style={{...SearchOptionsStyle.container, ...styles.pageContainer, width: width < 700 ? "100%": "70%"}}>
			<View style={SearchOptionsStyle.textButtonContainer}>
				<Pressable
					style={SearchOptionsStyle.imgContainer}
					onPress={fetchFood}
				>
					<Image
						style={SearchOptionsStyle.searchIcon}
						source={image}
					/>
				</Pressable>

				<TextInput
					style={[
						SearchOptionsStyle.input,
						{ borderColor: hasError ? "red" : "black" },
					]}
					onChangeText={inputIngredients}
					placeholder="Search"
				/>
			</View>

			<TextError/>

			<RecipeOption
				name={"diet"}
				data={DIETS}
				updateData={updateOptions}
			/>
		</View>
	);
}
