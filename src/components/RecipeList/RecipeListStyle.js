import { StyleSheet } from "react-native";

export const recipeListStyle = StyleSheet.create(
    {
        list: {
            flex: 1,
            width: "50%",
            maxWidth: 300,
        },
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

        foodName:
        {
            marginTop: 20,
            marginBottom: 20,
            fontWeight: "bold",
            padding: 10,
            borderWidth: 1,
            textAlign: "center"
        }
    });
