import { useState } from "react";
import { Button, Text, TextInput, View } from "react-native";
import backendip from "../../ipaddressesports/backendip";
import { textFormStyle } from "./TextFormStyles";
import favicon from "../../../assets/favicon.png";
import axios from "axios";

export default function TextForm(props) {
	const [hasError, setHasError] = useState(false);
	const [inputIg, setinputIg] = useState("");

	async function fetchFood() {
		if (inputIg.length <= 0) {
			setHasError(true);
			return;
		}

		setHasError(false);
		
		try {
			let response = await axios({
				method: "get",
				url:
					"http://" + backendip + "/?ingredients=" + inputIg,
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

	function inputIngredients(igs) {
		setinputIg(igs);
	}

	return (
		<>
			<Button
				title="Fetch Recipes"
				onPress={fetchFood}
				color="#fd5d00"
			/>
			<TextInput
				style={[
					textFormStyle.inputText,
					{ borderColor: hasError ? "red" : "black" },
				]}
				onChangeText={inputIngredients}
				placeholder="Enter Food name/ingredients"
			/>

            { hasError ? <Text style={textFormStyle.errorMsg}>Please enter food name/ingredients</Text> : null }
		</>
	);
}
