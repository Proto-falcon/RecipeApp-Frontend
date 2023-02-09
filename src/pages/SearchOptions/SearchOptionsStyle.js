import { StyleSheet } from "react-native";
const HEIGHT = "80%";
export const SearchOptionsStyle = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		marginTop: 10,
		marginLeft: "auto",
		marginRight: "auto",
	},

	textButtonContainer: {
		flexDirection: "row",
		flexBasis: 50,
		maxHeight: 50,
	},

	searchIcon: {
		height: 25,
		marginTop: 7,
		width: "100%",
		resizeMode: "contain",
	},

	imgContainer: {
		flexBasis: 20,
		height: 30,
	},

	input: {
		height: 40,
		marginLeft: 10,
		padding: 15,
		paddingBottom: 10,
		borderColor: "black",
		borderWidth: 1,
		borderRadius: 20,
	},

	optionsContainer: {
		flexDirection: "row",
		flexWrap: "wrap",
		justifyContent: "space-evenly",
		minWidth: 400,
		width: "30%",
	},

	optionTypes: {
		width: 100,
		backgroundColor: "#ff9100",
		alignItems: "center",
	},

	text: {
		textAlign: "center",
		padding: 5,
	},

	optionTypeHeader: {
		backgroundColor: "#ffee00",
		fontWeight: "bold",
	},

	selectedMetaText: {
		fontSize: 25
	},

	selectedOptionsContainer: {
		height: HEIGHT,
		minHeight: HEIGHT,
		maxHeight: HEIGHT,
		borderWidth: 2,
		marginBottom: 5
	},
});
