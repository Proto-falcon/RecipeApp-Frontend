import { StyleSheet } from "react-native";

export const profileStyles = StyleSheet.create({
	userField: {
		textAlign: "center",
		fontSize: 25,
	},

	submitButton: {
		backgroundColor: "#ff9100",
		fontWeight: "bold",
		padding: 10,
		margin: 10,
		borderRadius: 15,
		backgroundColor: "#fd5d00",
		width: 150,
	},

	recentRecipes: {
		borderTopWidth: 2,
		flexDirection: "row",
		flexWrap: "wrap",
		justifyContent: "center"
	},

	subHeader: {
		width: 160,
		fontSize: 20,
		fontWeight: "bold",
		textAlign: "center",
		padding: 10
	},
	
});
