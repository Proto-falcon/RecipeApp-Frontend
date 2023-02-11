import { SectionList, Text, View } from "react-native";
import { SearchOptionsStyle } from "../../pages/SearchOptions/SearchOptionsStyle";

/**
 * Renders a list of selected options in their sections
 *
 * @param {{
 *      options: *,
 * }} props
 * 
 * @returns A list of selected options in their sections
 */
export default function SelectedOptions({options}) {
	let optionObjArray = [];

	for (const option in options) {
		optionObjArray.push({
			optionType: option,
			data: options[option],
		});
	}

	return (
		<View
			style={{
				...SearchOptionsStyle.selectedOptionsContainer,
				width: "100%",
			}}
		>
			<Text
				style={{
					...SearchOptionsStyle.text,
					...SearchOptionsStyle.selectedMetaText,
					fontWeight: "bold",
				}}
			>
				Selected Options
			</Text>
			<SectionList
				style={{ width: "100%" }}
				sections={optionObjArray}
				renderItem={({ item }) => (
					<Text style={{ ...SearchOptionsStyle.text }}>{item}</Text>
				)}
				renderSectionHeader={({ section: { optionType } }) => {
					return (
						<Text
							style={{
								...SearchOptionsStyle.optionTypeHeader,
								...SearchOptionsStyle.selectedMetaText,
								...SearchOptionsStyle.text,
							}}
						>
							{optionType}
						</Text>
					);
				}}
			/>
		</View>
	);
}
