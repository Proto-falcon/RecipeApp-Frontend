import axios from "axios";
import { lazy, useContext, useEffect, useState } from "react";
import {
	FlatList,
	Pressable,
	Text,
	TextInput,
	useWindowDimensions,
	View,
} from "react-native";
import { styles } from "../../AppStyles";
import { SearchOptionsStyle } from "./SearchOptionsStyle";
import { Link } from "@react-navigation/native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { AccountCtx } from "../../context/account";
import { CsrfCtx } from "../../context/CsrfToken";
import { RecipeResultsCtx } from "../../context/Context";
import RecipeMetaOptions from "../../RecipeMetaOptions";
import BACKEND from "../../ipaddressesports/BackEndIP";
const RecipeOption = lazy(() =>
	import("../../components/RecipeOption/RecipeOption")
);
const TextError = lazy(() => import("../../components/TextError/TextError"));
const NavBar = lazy(() => import("../../components/NavBar/NavBar"));
const LogOutButton = lazy(() =>
	import("../../components/Buttons/LogOutButton")
);
const SelectedOptions = lazy(() =>
	import("../../components/SelectedOptions/SelectedOptions")
);
const WrappingItems = lazy(() =>
	import("../../components/WrappingItems/WrappingItems")
);

/**
 * Renders a page that has options to search recipes
 *
 * @param {{ navigation: * }} props
 * @returns Search Options Page
 */
export default function SearchOptions({ navigation }) {
	const ctx = useContext(RecipeResultsCtx);
	const accCtx = useContext(AccountCtx);
	const authCtx = useContext(CsrfCtx);

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
	const [inputExclude, setInputExclude] = useState("");
	const [exclude, setExclude] = useState([]);
	const [hasError, setHasError] = useState(false); // checks if the user hasn't inputted/selected ingredients
	const [errorMsg, setErrorMsg] = useState("");
	const [mount, setMount] = useState(true);

	// Calls when `Form` component is mounted
	useEffect(() => {
		accCtx.checkCred(authCtx, BACKEND);
	}, [mount]);

	// Changes the navigation bar if the user is logged in or not.
	useEffect(() => {
		if (accCtx.loggedIn) {
			navigation.setOptions({
				headerLeft: () => (
					<NavBar>
						<Link
							style={styles.navLink}
							to={{ screen: "Home" }}
						>
							<Text style={styles.navText}>Home</Text>
						</Link>
						<Link
							style={styles.navLink}
							to={{ screen: "Profile" }}
						>
							<Text style={styles.navText}>Profile</Text>
						</Link>
						<Text style={styles.usernameText}>
							Username: {accCtx.username}
						</Text>
					</NavBar>
				),
				headerRight: () => <LogOutButton />,
			});
		} else {
			navigation.setOptions({
				headerLeft: () => (
					<Link
						style={styles.navLink}
						to={{ screen: "Home" }}
					>
						<Text style={styles.navText}>Home</Text>
					</Link>
				),
				headerRight: () => (
					<NavBar>
						<Link
							to={{ screen: "Login", params: { toLogin: true } }}
							style={styles.navLink}
						>
							<Text style={styles.navText}>Login</Text>
						</Link>
						<Link
							to={{
								screen: "SignUp",
								params: { toLogin: false },
							}}
							style={styles.navLink}
						>
							<Text style={styles.navText}>Sign Up</Text>
						</Link>
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
		if (inputIg.length <= 0 && isOptionsEmpty() && exclude.length <= 0) {
			setHasError(true);
			setErrorMsg("Please enter food name/ingredients");
			return;
		}

		setHasError(false);

		let query = "";

		if (!isOptionsEmpty()) {
			let i = 0;
			for (const option in options) {
				if (
					query.length > 0 &&
					i < optionTypes.length - 1 &&
					options[option].length > 0
				) {
					query += "&";
				}
				options[option].forEach((item, index) => {
					query += `${option}=${item}`;
					if (index < options[option].length - 1) {
						query += "&";
					}
				});
				i += 1;
			}
		}
		console.log(exclude)
		if (exclude.length > 0) {
			ctx.updateExclusions(exclude);
			if (query.length > 0) {
				query += "&";
			}
			exclude.forEach((item, i) => {
				query += `excluded=${item.trim()}`;
				if (i < exclude.length - 1) {
					query += "&";
				}
			});
		}

		if (inputIg.trim().length > 0) {
			if (query.length > 0) {
				query += "&";
			}
			query += `ingredients=${inputIg.trim()}`;
		}

		try {
			let response = await axios({
				method: "get",
				url: `${BACKEND}/api/fetchRecipes/?${query}`,
				responseType: "json",
			});
			let content = await response.data;

			ctx.getRecipes(content.results);
			ctx.setAddRecipesLink(content.addRecipesLink);

			ctx.setIsLoading(true);
			navigation.navigate("Home");
		} catch (error) {
			console.log(error.request);
			setHasError(true);
			setErrorMsg("Unable to retrieve any recipes");
		}
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
	 * Updates `inputExclude` by the text entered by the user
	 *
	 * @param {string} excluded
	 */
	function inputExcludeHandler(excluded) {
		setInputExclude(excluded);
	}

	/**
	 * Adds an excluded ingredient
	 */
	function addExcludeHandler() {
		if (inputExclude !== "") {
			setExclude((preveState) => [...preveState, inputExclude]);
			setInputExclude("");
		}
	}

	/**
	 * Renders the available option.
	 *
	 * @param {{item: string}} param
	 * @returns Button that toggles the option
	 */
	function renderOptionTypes({ item }) {
		return (
			<Pressable
				style={SearchOptionsStyle.optionTypes}
				onPress={() => setOptionType(item)}
			>
				<Text style={{ fontWeight: "bold" }}>{item}</Text>
			</Pressable>
		);
	}

	function removeExlcusions(index) {
		setExclude((preveState) => {
			let newState = [];
			preveState.forEach((element, i) => {
				if (i != index) {
					newState.push(element);
				}
			});
			return newState;
		});
	}

	/**
	 * Renders an excluded ingredient that the user doesn't want to be
	 * displayed in the recipe results.
	 *
	 * @param {{
	 * 		item: string,
	 * 		index: number
	 * }} param
	 * @returns An excluded ingredient
	 */
	function renderExclusions({ item, index }) {
		return (
			<View
				key={index}
				style={SearchOptionsStyle.exclude}
			>
				<Text style={{ textAlign: "center" }}>{item}</Text>
				<Pressable onPress={() => removeExlcusions(index)}>
					<FontAwesomeIcon
						icon={"xmark"}
						size={20}
					/>
				</Pressable>
			</View>
		);
	}

	return (
		<View
			style={{
				...SearchOptionsStyle.container,
				...styles.pageContainer,
				width: useWindowDimensions().width < 700 ? "100%" : "70%",
			}}
		>
			<View style={SearchOptionsStyle.textButtonContainer}>
				<Pressable
					style={SearchOptionsStyle.imgContainer}
					onPress={fetchFood}
				>
					<FontAwesomeIcon
						icon="magnifying-glass"
						size={20}
					/>
				</Pressable>

				<TextInput
					style={[
						SearchOptionsStyle.input,
						{ borderColor: hasError ? "red" : "black" },
					]}
					onChangeText={inputIngredients}
					placeholder="Enter recipe names/ingredients"
					onSubmitEditing={fetchFood}
				/>
			</View>
			<View style={SearchOptionsStyle.textButtonContainer}>
				<Pressable
					onPress={addExcludeHandler}
					style={{ paddingTop: 12 }}
				>
					<FontAwesomeIcon
						icon={"ban"}
						size={20}
					/>
				</Pressable>
				<TextInput
					style={[
						SearchOptionsStyle.input,
						{ borderColor: hasError ? "red" : "black" },
					]}
					onChangeText={inputExcludeHandler}
					value={inputExclude}
					placeholder="Enter ingredients to exclude"
					onSubmitEditing={addExcludeHandler}
				/>
			</View>

			<TextError
				hasError={hasError}
				style={styles.errorMsg}
				message={errorMsg}
			/>

			<View
				style={{
					...SearchOptionsStyle.optionsContainer,
					maxHeight: useWindowDimensions().height / 2.5,
					flexDirection: "row",
				}}
			>
				<View style={SearchOptionsStyle.excluded}>
					<Text
						style={{
							...SearchOptionsStyle.excludedHeader,
							borderBottomWidth: exclude.length <= 0 ? 0 : 2,
						}}
					>
						Excluded
					</Text>
					<WrappingItems
						style={SearchOptionsStyle.excludeList}
						items={exclude}
						renderItems={renderExclusions}
					/>
				</View>

				<SelectedOptions options={options} />
				<View style={SearchOptionsStyle.optionTypesContainer}>
					<FlatList
						data={optionTypes}
						renderItem={renderOptionTypes}
					/>
				</View>
				<RecipeOption
					style={{ height: 99 }}
					type={optionType}
					data={RecipeMetaOptions[optionType]}
					selectedData={options[optionType]}
					updateData={updateOptions}
				/>
			</View>
		</View>
	);
}
