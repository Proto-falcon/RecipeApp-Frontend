import axios from "axios";
import { useContext, useState } from "react";
import { Button, FlatList, Image, Pressable, Text, TextInput, View } from "react-native";
import RecipeResultsCtx from "../../context/Context";
import BackEndIP from "../../ipaddressesports/BackEndIP";
import { SearchOptionsStyle } from "./SearchOptionsStyle";

export default function SearchOptions({ navigation })
{
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

	const ctx = useContext(RecipeResultsCtx)

	const [addedIgs, setAddedIgs] = useState([]);
	const [inputIg, setinputIg] = useState("");
	const [hasError, setHasError] = useState(false);

    const image = require("../../../assets/searchIcon.png");

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
					"http://" + BackEndIP + "/?ingredients=" + query,
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
				}])
		}

		return navigation.navigate("Home");
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
        <View style={SearchOptionsStyle.container}>
			<View style={SearchOptionsStyle.textButtonContainer}>
				<Pressable style={SearchOptionsStyle.imgContainer} onPress={fetchFood}>
					<Image style={SearchOptionsStyle.searchIcon} source={image}/>
				</Pressable>
				
				<TextInput
					style={[SearchOptionsStyle.input,
						{ borderColor: hasError ? "red" : "black" },
					]}
					onChangeText={inputIngredients}
					placeholder="Search"
				/>
			</View>

			{ hasError ? <Text style={SearchOptionsStyle.errorMsg}>Please enter food name/ingredients</Text> : null }

			<View style={{ height: 140 }}>
				<FlatList
					style={SearchOptionsStyle.list}
					data={ingredients}
					renderItem={renderIgOptions}
					extraData={addedIgs}
					keyExtractor={(item) => item.id}
				/>
			</View>

        </View>
    );
}