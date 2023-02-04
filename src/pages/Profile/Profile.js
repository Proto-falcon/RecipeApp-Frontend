import { useContext, useEffect, useState } from "react";
import { Text, View } from "react-native";
import { styles } from "../../AppStyles";
import AccountCtx from "../../context/account";
import CsrfCtx from "../../context/CsrfToken";
import BACKEND from "../../ipaddressesports/BackEndIP";
import { profileStyles } from "./ProfileStyles";

export default function Profile({route, navigation }) {

    const authCtx = useContext(CsrfCtx);
    const accCtx = useContext(AccountCtx);

    const [mount, setMount] = useState(true);
	
	// Calls when `Form` component is mounted
	useEffect(() => {accCtx.checkCred(authCtx, BACKEND)}, [mount]);

    return (
        <View style={{...styles.pageContainer}}>
            <Text
                style={{...profileStyles.userField, fontWeight: "bold"}}
            >
                Username:
            </Text>
            <Text
                style={profileStyles.userField}
            >
                {accCtx.username}
            </Text>
            <Text
                style={{...profileStyles.userField, fontWeight: "bold"}}
            >
                Password:
            </Text>
            <Text
                style={profileStyles.userField}
            >
                {accCtx.email}
            </Text>
        </View>
    );
}