import {
	Pressable,
	Text,
	TextInput,
	useWindowDimensions,
	View,
} from "react-native";

/**
 * Renders a form with a single input text with submit button
 *
 * @param {{
 *      containerStyle: *,
 *      label: string,
 *      labelValueHidden: boolean,
 *      labelValue?: string,
 *      submitText: string,
 *      labelStyle: *,
 *      labelValueStyle?: *,
 *      inputPromptStyle: *,
 *      placeholder: string,
 * 		onBlurCallBack: any,
 * 		onFocusCallBack: any,
 *      onChangeText: (text: string) => void,
 *      submitHandler: () => void,
 *      submitStyle: *
 * }} props
 * @returns Form with 1 input text and a button
 */
export default function IndiviudalForm(props) {
	function DisplayValue() {
		if (!props.labelValueHidden) {
			return (
				<Text style={props.labelValueStyle}>{props.labelValue}</Text>
			);
		} else {
			return <Text />;
		}
	}

	return (
		<View style={props.containerStyle}>
			<Text style={props.labelStyle}>{props.label}</Text>
			<DisplayValue />
			<View
				style={{
					flexDirection:
						useWindowDimensions().width < 700 ? "column" : "row",
					justifyContent: "center",
					alignItems: "center",
                    width: "200%"
				}}
			>
				<TextInput
					style={props.inputPromptStyle}
					placeholder={props.placeholder}
					autoCapitalize="none"
					onBlur={props.onBlurCallBack}
  					onFocus={props.onFocusCallBack}
					onChangeText={props.onChangeText}
				/>
				<Pressable
					style={props.submitStyle}
					onPress={props.submitHandler}
				>
					<Text style={{textAlign: "center"}}>{props.submitText}</Text>
				</Pressable>
			</View>
		</View>
	);
}
