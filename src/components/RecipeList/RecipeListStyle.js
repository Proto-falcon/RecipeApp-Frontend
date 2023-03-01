import { StyleSheet } from "react-native";

export const recipeListStyle = StyleSheet.create(
    {
        foodPicContainer:
        {
            alignItems: "center"
        },
        foodPic:
        {
            height: 200,
            width: "100%",
            resizeMode: "contain"
        },

        nameRatingContainer: {
            marginTop: 20,
            marginBottom: 20,
            borderWidth: 1,
            padding: 10,
        },

        foodName:
        {
            fontWeight: "bold",
            textAlign: "center"
        }
    });
