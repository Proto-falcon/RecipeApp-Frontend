import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
	searchIcon: {
		height: 20,
		width: 20,
		resizeMode: "contain",
		marginRight: 10
	},

	navLink: {
		padding: 5
	},

	navText: {
		color: "white",
		fontSize: 18,
		fontWeight: "500",
		marginLeft: 10,
	},

	usernameText: {
		color: "black",
		fontSize: 12,
		fontWeight: "400",
		marginLeft: 10,
		marginTop: 5
	},

	pageContainer: {
		flex: 1,
		backgroundColor: "#ffffff"
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