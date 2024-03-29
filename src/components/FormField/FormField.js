import { Text, TextInput, View } from "react-native";

/**
 * Renders a form field
 *
 * @param { {
 *      label: string,
 *      placeholder: string,
 *      isPassword: boolean,
 * 		autoCapitalize: string,
 * 		keyType: string
 *      onChangeTextHandler: (text: string) => void,
 *      inputStyle: *,
 *      labelStyle: *,
 *      containerStyle: *,
 *  }
 * } props
 *
 * @returns A text label with text field
 */
export default function FormField({
	label,
	placeholder = "",
	isPassword = false,
	autoCapitalize = "sentences",
	keyType = undefined,
	onChangeTextHandler = undefined,
	inputStyle = {},
	labelStyle = {},
	containerStyle = {},
}) {
	return (
		<View style={{ ...containerStyle }}>
			<Text style={{ ...labelStyle }}>{label}</Text>
			<TextInput
				style={{ ...inputStyle }}
				secureTextEntry={isPassword}
				autoCapitalize={autoCapitalize}
				keyboardType={keyType}
				onChangeText={onChangeTextHandler}
				placeholder={placeholder}
			/>
		</View>
	);
}
