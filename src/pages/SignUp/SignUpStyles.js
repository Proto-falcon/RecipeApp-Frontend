import { StyleSheet } from "react-native";

export const SignUpStyles = StyleSheet.create(
    {
        formContainer: {
            width: "25%",
            minWidth: "25%",
            maxWidth: "25%",
        },

        formInput: {
            padding: 5,
            marginTop: 10,
            borderWidth: 2,
            borderRadius: 20
        },

        formLabel: {
            marginRight: 10,
            textAlign: "left",
            fontWeight: "bold",
        },

        submitButton: {
            padding: 10,
            margin: 10,
            borderRadius: 15, 
            backgroundColor: "#fd5d00"
        },
    }
);