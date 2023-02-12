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
		justifyContent: "center",
		paddingTop: 10,
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

	exclude: {
		flexDirection: "row",
		padding: 5,
		paddingLeft: 7,
		marginLeft: 5,
		marginTop: 5,
		marginBottom: 5,
		backgroundColor: "#ff5c5c",
		borderRadius: 10,
	},

	excludedHeader: {
		fontWeight: "bold",
		fontSize: 20,
		textAlign: "center",
	},

	excludeList: { paddingLeft: 5, justifyContent: "center" },

	excluded: {
		width: "100%",
		borderTopWidth: 2,
		borderLeftWidth: 2,
		borderRightWidth: 2,
	},

	optionsContainer: {
		flexDirection: "row",
		flexWrap: "wrap",
		justifyContent: "space-evenly",
		minWidth: 400,
		width: "30%",
	},

	optionTypesContainer: { borderWidth: 2, marginBottom: 5, height: 99 },

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
		fontSize: 25,
	},

	selectedOptionsContainer: {
		height: HEIGHT,
		minHeight: HEIGHT,
		maxHeight: HEIGHT,
		borderWidth: 2,
		marginBottom: 5,
	},
});
