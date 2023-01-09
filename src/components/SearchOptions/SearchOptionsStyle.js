import { StyleSheet } from "react-native";

export const SearchOptionsStyle = StyleSheet.create(
    {
        container: {
            flex: 1,
            width: "70%",
            alignItems: "center",
            marginTop: 10,
            marginLeft: "auto",
            marginRight: "auto",
        },

        textButtonContainer: {
            flexDirection: "row",
            flexBasis:50,
            maxHeight:50,
        },

        searchIcon: {
            height: 25,
            marginTop: 7,
            width: "100%",
            resizeMode: "contain",
        },

        imgContainer: {
            flexBasis:20,
            height: 30,
        },

        input: {
            height: 40,
            marginLeft: 10,
            padding: 15,
            paddingBottom: 10,
            borderColor: "black",
            borderWidth: 1,
            borderRadius: 20
        },

        errorMsg:
        {
            color: "white",
            backgroundColor: "red",
            padding: 10,
            fontWeight: "bold",
            fontSize: 20,
            borderRadius: 20,
        },

        list: {
            marginTop: 10
        }
    });