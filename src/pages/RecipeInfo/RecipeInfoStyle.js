import { StyleSheet } from "react-native";

export const recipeInfoStyles = StyleSheet.create({
	recipeName: {
		textAlign: "center",
		fontSize: 30,
		fontWeight: "bold",
		textDecorationLine: "underline",
	},

	srcRatingContainer: {
		flexDirection: "row",
		flexWrap: "wrap",
		justifyContent: "space-evenly",
		alignItems: "flex-end",
		width: "70%",
	},

	source: {
		backgroundColor: "#fd5d00",
		margin: 10,
		padding: 10,
		borderRadius: 20,
		alignItems: "center",
		maxHeight: 45,
	},

	cautionsText: {
		color: "#951831",
		fontWeight: "bold",
	},

	ratingsContainer: {
		alignItems: "center",
		borderWidth: 2,
	},

	cautionsHeader: {
		fontSize: 30,
		textDecorationLine: "underline",
		textAlign: "center",
	},

	nutrientRow: {
		flexDirection: "row",
		justifyContent: "space-between",
	},

	nutrientCell: {
		padding: 3,
		flex: 1,
		flexBasis: 150,
	},

	ratingButton: {
		width: 33,
		padding: 10,
	},

	ingredientsHeader: {
		fontWeight: "bold",
		fontSize: 20,
		textDecorationLine: "underline",
		textAlign: "center",
	},
});
