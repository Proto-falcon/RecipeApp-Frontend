import { StyleSheet } from "react-native";

export const SearchStyle = StyleSheet.create(
    {
        container: {
            alignItems: "center",
        },

        imgContainer: {
            margin: 7
        },

        listHeaderContainer: {
            borderRadius: 10
        },

        listHeader: {
            width: 165,
            fontSize: 20,
            fontWeight: "bold",
            textAlign: "center",
            padding: 10
        },

        chosenList: {
			backgroundColor: "#0098ff",
			color: "#ffffff",
			borderRadius: 10
		}
    });