import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Platform, Pressable, Text, View } from "react-native";
import { styles } from "../../AppStyles";
import FormField from "../../components/FormField/FormField";
import TextError from "../../components/TextError/TextError";
import CsrfCtx from "../../context/CsrfToken";
import { SignUpStyles } from "./SignUpStyles";
import BackEndIP from "../../ipaddressesports/BackEndIP";
import accountCtx from "../../context/account";

/**
 * Renders the sign page & manage logic
 *
 * @param {{navigation: *}} props
 * @returns Sign Up Page
 */
export default function SignUp({ navigation }) {

	const authCtx = useContext(CsrfCtx);
	const accCtx = useContext(accountCtx);

	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPasword] = useState("");
    const [formValid, setFormValid] = useState(true);
	const [errorMsg, setErrorMsg] = useState("");

	/**
	 * Updates the `username` state with `newUsername`
	 *
	 * @param {string} newUsername
	 */
	function usernameHandler(newUsername) {
		setUsername(newUsername);
	}

	/**
	 * Updates the `email` state with `newEmail` if it's valid
	 *
	 * @param {string} newEmail
	 */
	function emailHandler(newEmail) {
		if (
			newEmail.match(
				/^([a-zA-Z0-9]+\.?[a-zA-Z0-9]*)@[a-zA-Z0-9^\.]+\.([a-zA-Z]+\.?[a-zA-Z]*)$/
			) != null
		) {
			setEmail(newEmail);
		} else {
			setEmail("");
		}
	}

	/**
	 * Updates the `password` state with `newPassword`
	 *
	 * @param {string} newPassword
	 */
	function passwordHandler(newPassword) {
		setPasword(newPassword);
	}


	/**
	 * Submits the sign up form with the user
	 */
    async function onSubmitHandler() {
        if (username.length <= 0 || email.length <=0 || password <= 0) {
			setErrorMsg("Please fill all the fields/ enter corretly.");
            setFormValid(false);
        } else {
            setFormValid(true);
            let response = await axios(
                {
                    method: "post",
					headers: {"X-CSRFToken": authCtx.token, "credentials": "include"},
					withCredentials: true,
                    url: `${BackEndIP}/api/signup/`,
					responseType: "json",
					data: {
						username: username,
						email: email,
						password: password
					}
                }
            );

			let content = await response.data;
			if (199 < response.status < 300) {
				if (content.signUpSuccess) {
					accCtx.setLoginStatus(true);
					accCtx.setUsername(username);
					accCtx.setEmail(email);
					navigation.navigate("Home");
				}
			}
			else {
				setErrorMsg(content.message);
				setFormValid(false)
			}

        }
    }

	return (
		<View style={{ ...styles.pageContainer, alignItems: "center" }}>
			<FormField
				label={"Username:"}
				placeholder={"Please enter username:"}
				onChangeTextHandler={usernameHandler}
                containerStyle={SignUpStyles.formContainer}
                labelStyle={SignUpStyles.formLabel}
                inputStyle={SignUpStyles.formInput}
			/>
			<FormField
				label={"Email:"}
				placeholder={"Please enter email:"}
				onChangeTextHandler={emailHandler}
                containerStyle={SignUpStyles.formContainer}
                labelStyle={SignUpStyles.formLabel}
                inputStyle={SignUpStyles.formInput}
			/>
			<FormField
				label={"Password:"}
				placeholder={"Please enter password:"}
				isPassword={true}
				onChangeTextHandler={passwordHandler}
                containerStyle={SignUpStyles.formContainer}
                labelStyle={SignUpStyles.formLabel}
                inputStyle={SignUpStyles.formInput}
			/>
			<Pressable style={SignUpStyles.submitButton} onPress={onSubmitHandler}>
				<Text style={{fontWeight: "bold",}}>Sign Up</Text>
			</Pressable>

			<TextError
				hasError={!formValid}
				style={styles.errorMsg}
				message={errorMsg}
			/>
		</View>
	);
}
