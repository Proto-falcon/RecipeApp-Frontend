import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
	searchIcon: {
		height: 20,
		width: 20,
		resizeMode: "contain",
		marginRight: 10
	},

	navText: {
		color: "white",
		fontSize: 18,
		fontWeight: "500",
		marginLeft: 10,
	},

	pageContainer: {
		marginTop: 10,
		textAlign: "center",
	},

	errorMsg: {
		color: "white",
		backgroundColor: "red",
		padding: 10,
		fontWeight: "bold",
		fontSize: 20,
		borderRadius: 20,
	},
});