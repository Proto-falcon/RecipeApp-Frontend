import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
		alignSelf: "stretch",
		justifyContent: "center",

	},

	foodPic:
	{
		height: 200,
		width: 200
	},

	foodName:
	{
		marginTop: 20,
		marginBottom: 20,
		fontWeight: "bold",
		padding: 10,
		borderWidth: 1
	},

	inputText:
	{
		height: 40,
		margin: 12,
		borderWidth: 1,
		padding: 10,
	}
});