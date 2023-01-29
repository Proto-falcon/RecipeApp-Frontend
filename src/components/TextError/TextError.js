import { Text } from "react-native";

/**
 * Displays an error message.
 *
 * @param {{
 *      style:*,
 * 		message: string,
 *      hasError: boolean
 * }} props
 *
 * @returns Error display message or none.
 */
export default function TextError(props) {
	return props.hasError ? (
		<Text style={props.style}>{props.message}</Text>
	) : null;
}
