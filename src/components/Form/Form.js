import { useState } from "react";
import axios from "axios";
import { Button, FlatList, Text, TextInput, View } from "react-native";
import BackEndIP from "../../ipaddressesports/BackEndIP";
import { formStyle } from "./FormStyles";
import favicon from "../../../assets/favicon.png";

/**
 * Legacy form replaced by SearchOptions.
 * Might change it in the future.
 * 
 * @param {*} props 
 * @returns {JSX.Element}
 */
export default function Form(props) {
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
	const [addedIgs, setAddedIgs] = useState([]);
	const [inputIg, setinputIg] = useState("");
	const [hasError, setHasError] = useState(false);

	function addIngredients(ingredient) {
		setAddedIgs((prevState) => {
			let newList = [];
			newList = newList.concat(prevState);
			newList.push(ingredient);

			return newList;
		});
	}

	function removeIngredients(ingredient) {
		setAddedIgs((prevState) => {
			let newState = [];

			prevState.forEach((ig) =>
				ig.id != ingredient.id ? newState.push(ig) : null
			);
			return newState;
		});
	}

	function ingredientIncluded(item) {
		let exists = false;
		addedIgs.forEach((ig) => {
			if (ig.id == item.id) {
				exists = true;
			}
		});

		return exists;
	}

	function selectIgHandler(ingredient) {
		let exists = ingredientIncluded(ingredient);

		if (exists) {
			removeIngredients(ingredient);
		} else {
			addIngredients(ingredient);
		}
	}

	async function fetchFood() {
		if ((inputIg.length <= 0) && (addedIgs.length <= 0)) {
			setHasError(true);
			return;
		}

		setHasError(false);

		let textQuery = inputIg;
		let queryOptions = "";
		if (addedIgs.length > 0)
		{
			for (let i = 0; i < addedIgs.length; i++)
			{
				queryOptions += addedIgs[i].ingredient;
				if ((i - 1) < addedIgs.length)
				{
					queryOptions += " ";
				}
			}
		}

		let query = "";
		if (textQuery.trim().length > 0)
		{
			query = textQuery + " " + queryOptions;
		} else
		{
			query = queryOptions;
		}

		try {
			let response = await axios({
				method: "get",
				url:
					"http://" + BackEndIP + "/api/fetchRecipes/?ingredients=" + query,
				responseType: "json",
			});

			if (199 < response.status < 300) {
				let content = await response.data;
				props.setData(content.results);
				props.setLink(content.addRecipesLink);
			}
		} catch {
			props.setData([
				{
					name: "No Recipe Name Available",
					image: favicon,
					ingredients: ["None"],
					source: "",
				}])
		}
	}

	function inputIngredients(igs) {
		setinputIg(igs);
	}

	function renderIgOptions({ item }) {
		return (
			<Button
				onPress={(e) => selectIgHandler(item)}
				color={ingredientIncluded(item) ? "#00ff0d" : "#fd5d00"}
				title={item.ingredient}
			/>
		);
	}

	return (
		<View style={formStyle.container}>
			<Button
				style={{borderRadius: 10}}
				title="Fetch Recipes"
				onPress={fetchFood}
				color="#fd5d00"
			/>
			<TextInput
				style={[
					formStyle.inputText,
					{ borderColor: hasError ? "red" : "black" },
				]}
				onChangeText={inputIngredients}
				placeholder="Enter Food name/ingredients"
			/>
			
			<View style={{ height: 140 }}>
				<FlatList
					style={formStyle.list}
					data={ingredients}
					renderItem={renderIgOptions}
					extraData={addedIgs}
					keyExtractor={(item) => item.id}
				/>
			</View>

            { hasError ? <Text style={formStyle.errorMsg}>Please enter food name/ingredients</Text> : null }
		</View>
	);
}
