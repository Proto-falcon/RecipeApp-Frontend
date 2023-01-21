import { useEffect, useState } from "react";
import { FlatList, Pressable, Text, View } from "react-native";
import { optionStyles } from "./RecipeOptionStyle";

/**
 * Displays a list of recipe options from the data given via
 *
 * @param {{
 *      type: string
 *      updateData: (type:string, options: Array<str>) => void,
 *      data: Array<string>,
 * 		selectedData: Array<string>
 * 		style: any
 *  }
 * } props
 *
 * `data` is array of data to be displayed and
 * `updateData` is for updating data of the parent component.
 * `selectedData` is data that is already selected.
 *
 * @returns List of Recipe Options
 */
export default function RecipeOption(props) {
	const [selectedData, setSelectedData] = useState(props.selectedData);


	useEffect(() => setSelectedData(props.selectedData), [props.type]);

	useEffect(
		() => props.updateData(props.type, selectedData),
		[selectedData]
	);

	/**
	 * Add selected options to selectedData
	 *
	 * @param {string} option
	 */
	function addOptions(option) {
		setSelectedData((prevState) => {
			let newList = [];
			newList = newList.concat(prevState);
			newList.push(option);

			return newList;
		});
	}

	/**
	 * Removes option from selectedData
	 *
	 * @param {string} RMoption
	 */
	function removeOptions(RMoption) {
		setSelectedData((prevState) => {
			let newState = [];

			prevState.forEach((option) =>
				option != RMoption ? newState.push(option) : null
			);
			return newState;
		});
	}

	/**
	 * Checks that the option is included in selectedData
	 *
	 * @param {string} item
	 * @returns True if exists otherwise false.
	 */
	function optionIncluded(item) {
		let exists = false;
		selectedData.forEach((option) => {
			if (option == item) {
				exists = true;
			}
		});

		return exists;
	}

	/**
	 * Adds selected option when it doesn't existin in selectedData
	 * or removes it when it already exists in selectedData
	 *
	 * @param {string} option
	 */
	function selectOptionHandler(option) {
		let exists = optionIncluded(option);

		if (exists) {
			removeOptions(option);
		} else {
			addOptions(option);
		}
	}

	/**
	 * Renders a button that corresponds to an option.
	 * Changes color depending if it's added or not
	 *
	 * @param {string} item
	 * @returns Button to be rendered in List
	 */
	function renderOptions({ item }) {
		return (
			<Pressable
				onPress={(e) => selectOptionHandler(item)}
				style={{
					width: 175,
					backgroundColor: optionIncluded(item)
						? "#00ff0d"
						: "#fd5d00",
					padding: 5,
					alignItems: "center",
				}}
			>
				<Text style={{fontWeight:"bold"}}>{item}</Text>
			</Pressable>
		);
	}

	return (
		<View style={{ ...optionStyles.listContainer, ...props.style }}>
			<FlatList
				data={props.data}
				renderItem={renderOptions}
				extraData={selectedData}
			/>
		</View>
	);
}
