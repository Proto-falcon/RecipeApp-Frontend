import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
		alignSelf: "stretch",
		justifyContent: "center",
		height: "100%"
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
	}
});