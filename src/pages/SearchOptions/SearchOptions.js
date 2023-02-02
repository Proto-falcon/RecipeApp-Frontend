import axios from "axios";
import { useContext, useEffect, useState } from "react";
import {
	FlatList,
	Image,
	Pressable,
	SectionList,
	Text,
	TextInput,
	useWindowDimensions,
	View,
} from "react-native";
import { styles } from "../../AppStyles";
import RecipeOption from "../../components/RecipeOption/RecipeOption";
import RecipeResultsCtx from "../../context/Context";
import { SearchOptionsStyle } from "./SearchOptionsStyle";
import RecipeMetaOptions from "../../RecipeMetaOptions";
import TextError from "../../components/TextError/TextError";
import BackEndIP from "../../ipaddressesports/BackEndIP";
import accountCtx from "../../context/account";
import NavBar from "../../components/NavBar/NavBar";
import LogOutButton from "../../components/Buttons/LogOutButton";
import SearchButton from "../../components/Buttons/SearchButton";
import LoginButton from "../../components/Buttons/LogInButton";
import SignUpButton from "../../components/Buttons/SignUpButton";

/**
 * Renders a page that has options to search recipes
 *
 * @param {*} navigation
 * @returns Search Options Page
 */
export default function SearchOptions({ navigation }) {
	const ctx = useContext(RecipeResultsCtx);
	const accCtx = useContext(accountCtx);

	// collection of arrays of optional values
	const [options, setOptions] = useState({
		diet: [],
		health: [],
		cuisineType: [],
		mealType: [],
		dishType: [],
	});
	const [optionTypes, setNumOptions] = useState(() => {
		let num = [];
		for (const i in options) {
			num.push(i);
		}
		return num;
	});
	const [optionType, setOptionType] = useState(optionTypes[0]);
	const [inputIg, setinputIg] = useState(""); // string of ingredients inputted by user
	const [hasError, setHasError] = useState(false); // checks if the user hasn't inputted/selected ingredients
	const [width, setWidth] = useState(useWindowDimensions().width);
	const [height, setHeight] = useState(useWindowDimensions().height);

	// Changes the navigation bar if the user is logged in or not.
	useEffect(() => {
		if (accCtx.loggedIn) {
			navigation.setOptions({
				headerRight: () => (
					<NavBar>
						<LogOutButton />
					</NavBar>
				),
			});
		}
		else {
			navigation.setOptions({
				headerRight: () => (
					<NavBar>
						<LoginButton />
						<SignUpButton />
					</NavBar>
				),
			});
		}
	}, [accCtx.loggedIn]);

	/**
	 * Updates the selected options
	 *
	 * @param {string} type
	 * @param {Array<string>} optionsArray
	 */
	function updateOptions(type, optionsArray) {
		setOptions((preveState) => {
			let newState = { ...preveState };
			newState[type] = optionsArray;

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
		for (const option in options) {
			if (options[option].length <= 0) {
				emptyCount += 1;
			}
		}
		return emptyCount >= optionTypes.length;
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
			let i = 0;
			for (const option in options) {
				options[option].forEach((item, index) => {
					queryOptions += `${option}=${item}`;
					if (index < options[option].length - 1) {
						queryOptions += "&";
					}
				});
				if (queryOptions.length > 0 && (i < optionTypes.length)) {
					queryOptions += "&";
				}
				i += 1;
			}
		}

		let query = "";
		if (inputIg.trim().length > 0 && queryOptions.length > 0) {
			query = `ingredients=${inputIg.trim()}&${queryOptions}`;
		} else if (inputIg.trim().length > 0) {
			query = `ingredients=${inputIg.trim()}`;
		} else if (queryOptions.length > 0) {
			query = queryOptions;
		}

		try {
			let response = await axios({
				method: "get",
				url: `${BackEndIP}/api/fetchRecipes/?${query}`,
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

		ctx.setIsLoading(true);

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

	function renderOptionTypes({ item }) {
		return (
			<Pressable
				style={SearchOptionsStyle.optionTypes}
				onPress={() => setOptionType(item)}
			>
				<Text style={{fontWeight:"bold"}}>{item}</Text>
			</Pressable>
		);
	}

	function SelectedOptions() {
		const OPTIONLISTWIDTH = "100%";
		let optionObjArray = []

		for (const option in options) {
			optionObjArray.push({
				optionType: option,
				data: options[option]
			})
		}

		return (
			<View style={{...SearchOptionsStyle.selectedOptionsContainer, width: OPTIONLISTWIDTH}}>
				<Text style={{...SearchOptionsStyle.text, ...SearchOptionsStyle.selectedMetaText, fontWeight: "bold"}}>Selected Options</Text>
				<SectionList
				style={{width: "100%"}}
					sections={optionObjArray}
					renderItem={({item}) => <Text style={{...SearchOptionsStyle.text}}>{item}</Text>}
					renderSectionHeader={({section: {optionType}}) => {
						return (
							<Text style={{...SearchOptionsStyle.optionTypeHeader, ...SearchOptionsStyle.selectedMetaText, ...SearchOptionsStyle.text}}>
								{optionType}
							</Text>);
					}}
				/>
			</View>);
	}

	return (
		<View
			style={{
				...SearchOptionsStyle.container,
				...styles.pageContainer,
				width: width < 700 ? "100%" : "70%",
			}}
		>
			<View style={SearchOptionsStyle.textButtonContainer}>
				<Pressable
					style={SearchOptionsStyle.imgContainer}
					onPress={fetchFood}
				>
					<Image
						style={SearchOptionsStyle.searchIcon}
						source={require("../../../assets/searchIcon.png")}
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

			<TextError
				hasError={hasError}
				style={styles.errorMsg}
				message={"Please enter food name/ingredients"}
			/>

			<View
				style={{
					...SearchOptionsStyle.optionsContainer,
					maxHeight: height / 2.5,
					flexDirection: "row"
				}}
			>
				<SelectedOptions/>
				<View style={{ borderWidth: 2, marginBottom: 5, height: 99 }}>
					<FlatList
						data={optionTypes}
						renderItem={renderOptionTypes}
					/>
				</View>
				<RecipeOption
					style={{height: "55%", maxHeight: "55%" }}
					type={optionType}
					data={RecipeMetaOptions[optionType]}
					selectedData={options[optionType]}
					updateData={updateOptions}
				/>
			</View>
		</View>
	);
}
