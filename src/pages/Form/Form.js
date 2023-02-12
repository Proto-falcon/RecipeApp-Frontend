import axios from "axios";
import { lazy, useContext, useEffect, useState } from "react";
import { Platform, Pressable, Text, View } from "react-native";
import { styles } from "../../AppStyles";
import { FormStyle } from "./FormStyles";
import BACKEND from "../../ipaddressesports/BackEndIP";
import { CsrfCtx } from "../../context/CsrfToken";
import { AccountCtx } from "../../context/account";

const FormField = lazy(() => import("../../components/FormField/FormField"));
const TextError = lazy(() => import("../../components/TextError/TextError"));
const UserEmailForms = lazy(() => import("../../components/UserEmailForms/UserEmailForms"));

const emailRegExp = /^([a-zA-Z0-9]+\.?[a-zA-Z0-9]*)@[a-zA-Z0-9^\.]+\.([a-zA-Z]+\.?[a-zA-Z]*)$/

/**
 * Renders the Text Form with multiple fields
 * It can be either login or sign up form
 *
 * @param {
 * 	{
 * 		navigation: *,
 * 		route: *
 * 	}} props
 * @returns Text Form
 */
export default function Form({ route, navigation }) {
	
	const authCtx = useContext(CsrfCtx);
	const accCtx = useContext(AccountCtx);

	const [toLogin, setToLogin] = useState(route.params.toLogin);
	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPasword] = useState("");
    const [formValid, setFormValid] = useState(true);
	const [errorMsg, setErrorMsg] = useState("");
	const [mount, setMount] = useState(true);
	const [fieldWidth, setFieldWidth] = useState({
		width: "25%",
        minWidth: "25%",
        maxWidth: "25%",
	});
	
	// Calls when `Form` component is mounted
	useEffect(() => {
		accCtx.checkCred(authCtx, BACKEND);
		
		if (Platform.OS != "web") {
			setFieldWidth({
				width: "50%",
        		minWidth: "50%",
        		maxWidth: "50%",
			});
		}
	}, [mount]);

	/**
	 * Updates the `username` state with `newUsername`
	 *
	 * @param {string} newUsername
	 */
	function usernameHandler(newUsername) {
		if (newUsername.length > 50) {
			setFormValid(false);
			setErrorMsg("Username too long");
		} else {
			setFormValid(true);
			setUsername(newUsername);
		}
	}

	/**
	 * Updates the `email` state with `newEmail` if it's valid
	 *
	 * @param {string} newEmail
	 */
	function emailHandler(newEmail) {
		if (
			newEmail.match(emailRegExp) != null
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
	 * Submits the sign up & login form with the user
	 */
    async function onSubmitHandler() {
        if (toLogin && (username.length <= 0 || password <= 0)) {
			setErrorMsg("Please fill all the fields/ enter corretly.");
            setFormValid(false);
        }
		else if (!toLogin && (username.length <= 0 || email.length <=0 || password <= 0)) {
			setErrorMsg("Please fill all the fields/ enter corretly.");
            setFormValid(false);
		}
		else {
            setFormValid(true);
			let method = "post";
			let path = "signup/";
			if (toLogin) {
				method = "put";
				path = "login/";
			}

			try {
				let response = await axios(
					{
						method: method,
						headers: {"X-CSRFToken": authCtx.token, "credentials": "include"},
						withCredentials: true,
						url: `${BACKEND}/api/${path}`,
						responseType: "json",
						data: {
							username: username,
							email: email,
							password: password
						}
					}
				);
					
				let content = await response.data;
				if (content.signUpSuccess) {
					accCtx.setLoginStatus(true);
					accCtx.setUsername(username);
					accCtx.setEmail(email);
					navigation.navigate("Home");
				}
				else if (content.loginSuccess) {
					accCtx.setLoginStatus(true);
					accCtx.setUsername(content.user.username);
					accCtx.setEmail(content.user.email);
					navigation.navigate("Home");
				}

			} catch (error) {
				setErrorMsg(error.response.data.message);
				setFormValid(false)
			}
        }
    }

	function SubmitButton() {
		return (
			<Pressable style={FormStyle.submitButton} onPress={onSubmitHandler}>
				<Text style={{fontWeight: "bold",}}>{toLogin ? "Login" : "Sign Up"}</Text>
			</Pressable>
		);
	}

	return (
		<View style={{ ...styles.pageContainer, alignItems: "center"}}>
			<UserEmailForms
				toLogin={toLogin}
				usernameHandler={usernameHandler}
				emailHandler={emailHandler}
				containerStyle={fieldWidth}
				labelStyle={FormStyle.formLabel}
				inputStyle={{...FormStyle.formInput, borderColor: formValid ? "black" : "red"}}
			/>
			<FormField
				label={"Password:"}
				placeholder={"Please enter password:"}
				isPassword={true}
				onChangeTextHandler={passwordHandler}
                containerStyle={fieldWidth}
                labelStyle={FormStyle.formLabel}
                inputStyle={{...FormStyle.formInput, borderColor: formValid ? "black" : "red"}}
			/>
			<SubmitButton />

			<TextError
				hasError={!formValid}
				style={styles.errorMsg}
				message={errorMsg}
			/>
		</View>
	);
}

