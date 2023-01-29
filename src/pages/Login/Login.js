import { Text, View } from "react-native";
import { styles } from "../../AppStyles";
import BackEndIP from "../../ipaddressesports/BackEndIP";

let BACKEND = "/";
if (__DEV__) {
	BACKEND = BackEndIP;
}

export default function Login({ navigation }) {
    return (
        <View style={{...styles.pageContainer}}>
            <Text>Login Page</Text>
        </View>
    );
}