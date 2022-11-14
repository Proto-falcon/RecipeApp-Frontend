import { StyleSheet } from "react-native"

export const formStyle = StyleSheet.create(
    {
        container:
        {
            flex: 1,
            flexBasis:100
        },
        inputText:
        {
            height: 40,
		    margin: 12,
		    borderWidth: 1,
		    padding: 10
	    },

        errorMsg:
        {
            color: "white",
            backgroundColor: "red",
            padding: 5,
            fontWeight: "bold",
            fontSize: 20
        },

        list: {
            marginTop: 10
        }
    });
