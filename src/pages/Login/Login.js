import { Text, View } from "react-native";
import { styles } from "../../AppStyles";
import BackEndIP from "../../ipaddressesports/BackEndIP";

export default function Login({ navigation }) {

    const authCtx = useContext(CsrfCtx);
	const accCtx = useContext(accountCtx);

    return (
        <View style={{...styles.pageContainer}}>
            <Text>Login Page</Text>
        </View>
    );
}