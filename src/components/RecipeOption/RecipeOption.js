import { useEffect, useState } from "react";
import { Button, FlatList, View } from "react-native";
import { optiionStyles } from "./RecipeOptionStyle";

/**
 * Displays a list of recipe options from the data given via
 *
 * @param {{
 *      name: string
 *      updateData: (type:string, options: Array<str>) => void,
 *      data: Array<string>,
 *  }
 * } props
 * 
 * Data is array of data to be displayed and
 * updateData is for updating data of the parent component.
 * 
 * @returns List of Recipe Options
 */
export default function RecipeOption(props) {
	const [selectedData, setSelectedData] = useState([]);

	useEffect(() => props.updateData(props.name, selectedData), [props.name, selectedData]);

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
	function renderOptionOptions({ item }) {
		return (
			<Button
				onPress={(e) => selectOptionHandler(item)}
				color={optionIncluded(item) ? "#00ff0d" : "#fd5d00"}
				title={item}
			/>
		);
	}

	return (
		<View style={{ ...optiionStyles.listsContainer, height: "25%" }}>
			<FlatList
				style={optiionStyles.list}
				data={props.data}
				renderItem={renderOptionOptions}
				extraData={selectedData}
			/>
		</View>
	);
}
