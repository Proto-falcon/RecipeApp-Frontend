import { StyleSheet } from "react-native";

export const recipeInfoStyles = StyleSheet.create(
    {
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
            maxHeight: 45
        },

        ratingsContainer: {
            width: "100%",
            alignItems: "center",
            borderWidth: 2,
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
        }
    }
);