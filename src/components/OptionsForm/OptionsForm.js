import axios from "axios";
import { useEffect, useState } from "react";
import { Button, FlatList, View } from "react-native";
import { optionStyle } from "./OptionsFormStyles";
import favicon from "../../../assets/favicon.png"
import backendip from "../../ipaddressesports/backendip";

export default function OptionsForm(props) {
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
		if (addedIgs.length <= 0) {
			setHasError(true);
			return;
		}

		setHasError(false);

		try {
			let response = await axios({
				method: "get",
				url:
					"http://" +
					backendip +
					"/?ingredients=" +
					addedIgs.reduce((prevIg, currentIg) => {
						return prevIg.ingredient + "_" + currentIg.ingredient;
					}, ""),
				responseType: "json",
			});

			if (199 < response.status < 300) {
				let content = await response.data;
				props.setData((prevState) => {
					return {
						...prevState,
						...content,
						image: { uri: content["image"] },
					};
				});
			}
		} catch {
			props.setData((prevState) => {
				return {
					...prevState,
					name: "No Recipe Name Available",
					image: favicon,
					ingredients: ["None"],
					source: "",
				};
			});
		}
	}

	function renderIgOptions({ item }) {
		return (
			<Button
				onPress={(e) => selectIgHandler(item)}
				color={ingredientIncluded(item) ? "#00ff0d" : "#fd5d00"}
				title={item.ingredient}
			/>
		);
		e;
	}

	return (
		<>
			<Button
				title="Fetch Recipes"
				onPress={fetchFood}
				color="#fd5d00"
			/>
			<View style={{ height: 140 }}>
				<FlatList
					style={optionStyle.list}
					data={ingredients}
					renderItem={renderIgOptions}
					extraData={addedIgs}
					keyExtractor={(item) => item.id}
				/>
			</View>
		</>
	);
}
