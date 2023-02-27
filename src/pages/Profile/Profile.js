import axios from "axios";
import { lazy, Suspense, useContext, useEffect, useState } from "react";
import {
	ActivityIndicator,
	Platform,
	ScrollView,
	Text,
	useWindowDimensions,
	View,
} from "react-native";
import { styles } from "../../AppStyles";
import { FormStyle } from "../Form/FormStyles";
import { profileStyles } from "./ProfileStyles";
import { AccountCtx } from "../../context/account";
import { CsrfCtx } from "../../context/CsrfToken";
import BACKEND from "../../ipaddressesports/BackEndIP";
import NavBar from "../../components/NavBar/NavBar";
import { NavBarStyle } from "../../components/NavBar/NavBarStyle";
const RecipesArray = lazy(() => import("../../components/RecipesArray/RecipesArray"));
const RecipeCover = lazy(() => import("../../components/RecipeCover/RecipeCover"));
const IndiviudalForm = lazy(() =>
	import("../../components/IndividualForm/IndividualForm")
);
const TextError = lazy(() => import("../../components/TextError/TextError"));

const emailRegExp =
	/^([a-zA-Z0-9]+\.?[a-zA-Z0-9]*)@[a-zA-Z0-9^\.]+\.([a-zA-Z]+\.?[a-zA-Z]*)$/;

/**
 * Renders the profile page
 *
 * @param {{route: any, navigation: any}} prop
 * @returns Profile Page
 */
export default function Profile({ route, navigation }) {
	const authCtx = useContext(CsrfCtx);
	const accCtx = useContext(AccountCtx);

	const NoRecentRecipes = {
		id: "",
		name: "No Recent Recipes",
		image: "",
		ingredients: [],
		source: "",
	};

	const [newUsername, setNewUserName] = useState("");
	const [newEmail, setNewEmail] = useState("");
	const [newPassword, setNewPassword] = useState("");
	const [width, setWidth] = useState(useWindowDimensions().width);
	const [usernameUpdated, setUsernameUpdated] = useState(false);
	const [emailUpdated, setEmailUpdated] = useState(false);
	const [passwordUpdated, setPasswordUpdated] = useState(false);

	const [recentRecipes, setRecentRecipes] = useState([]);
	const [responded, setResponded] = useState(false);

	const [errorBackColor, setErrorBackColor] = useState("red");
	const [errorMsg, setErrorMsg] = useState("");

	const [mount, setMount] = useState(true);

	/**
	 * Fetches most recent recipes that the user has viewd
	 */
	async function getRecentRecipes() {
		try {
			let response = await axios.get(`${BACKEND}/api/getRecentRecipes/`);
			let content = await response.data;
			setResponded(true);

			if (content["results"].length <= 0) {
				setRecentRecipes([NoRecentRecipes]);
			}
			
			setRecentRecipes(content["results"]);
		} catch (error) {}
	}

	// Calls when `Form` component is mounted
	useEffect(() => {
		getRecentRecipes();
	}, [mount]);

	/**
	 * Sets the new username
	 *
	 * @param {string} usernameTxt
	 */
	function updateUsernameHandler(usernameTxt) {
		setNewUserName(usernameTxt);
	}

	/**
	 * Sets the new email
	 *
	 * @param {string} emailTxt
	 */
	function updateEmailHander(emailTxt) {
		setNewEmail(emailTxt);
	}

	/**
	 * Sets then new password
	 *
	 * @param {string} passwordTxt
	 */
	function updatePaswordHandler(passwordTxt) {
		setNewPassword(passwordTxt);
	}

	/**
	 * Submits the updated username
	 */
	async function submitUsername() {
		if (newUsername === "") {
			ErrorHandler("You haven't entered a username", 0, true);
			return;
		}
		try {
			let response = await axios.put(
				`${BACKEND}/api/updateUserInfo/`,
				{ username: newUsername },
				{
					headers: {
						"X-CSRFToken": authCtx.token,
						credentials: "include",
					},
					withCredentials: true,
					responseType: "json",
				}
			);
			let content = await response.data;

			accCtx.setUsername(newUsername);

			let message = "";
			for (const msg in content) {
				message = content[msg];
			}

			ErrorHandler(message, 0, false);
		} catch (error) {
			ErrorHandler(error.response.data.message, 0, true);
		}
	}

	/**
	 * Submits the updated email
	 */
	async function submitEmail() {
		if (newEmail === "" || newEmail.match(emailRegExp) === null) {
			ErrorHandler("You haven't entered a valid email", 1, true);
			return;
		}
		try {
			let response = await axios.put(
				`${BACKEND}/api/updateUserInfo/`,
				{ email: newEmail },
				{
					headers: {
						"X-CSRFToken": authCtx.token,
						credentials: "include",
					},
					withCredentials: true,
					responseType: "json",
				}
			);
			let content = await response.data;

			accCtx.setEmail(newEmail);

			let message = "";
			for (const msg in content) {
				message = content[msg];
			}

			ErrorHandler(message, 1, false);
		} catch (error) {
			ErrorHandler(error.response.data.message, 1, true);
		}
	}

	/**
	 * Submits the updated password
	 */
	async function submitPassword() {
		if (newPassword === "") {
			ErrorHandler("You haven't entered a password", 2, true);
			return;
		}
		try {
			let response = await axios.put(
				`${BACKEND}/api/updateUserInfo/`,
				{ password: newPassword },
				{
					headers: {
						"X-CSRFToken": authCtx.token,
						credentials: "include",
					},
					withCredentials: true,
					responseType: "json",
				}
			);
			let content = await response.data;

			let message = "";
			for (const msg in content) {
				message = content[msg];
			}

			ErrorHandler(message, 2, false);
		} catch (error) {
			ErrorHandler(error.response.data.message, 2, true);
		}
	}

	/**
	 * Displays the error message via toggling the `error` state
	 *
	 * @param {string} message
	 * @param {number} fieldId
	 * @param {boolean} isError
	 */
	function ErrorHandler(message, fieldId, isError) {
		if (isError) {
			setErrorBackColor("red");
		} else {
			setErrorBackColor("green");
		}
		switch (fieldId) {
			case 0:
				setUsernameUpdated(true);
				setEmailUpdated(false);
				setPasswordUpdated(false);
				break;
			case 1:
				setUsernameUpdated(false);
				setEmailUpdated(true);
				setPasswordUpdated(false);
				break;
			case 2:
				setUsernameUpdated(false);
				setEmailUpdated(false);
				setPasswordUpdated(true);
				break;
			default:
				setUsernameUpdated(false);
				setEmailUpdated(false);
				setPasswordUpdated(false);
		}
		setErrorMsg(message);
	}

	const recentRecipesBorders = {
		borderLeftWidth: width < 700 ? 0 : 2,
		borderRightWidth: width < 700 ? 0 : 2,
		borderBottomWidth: width < 700 ? 0 : 2,
	};

	const customWidth = width < 700 ? width * 0.7 : width * 0.3;
	const numCols = Math.floor(width / 300);

	return (
		<View style={styles.pageContainer}>
			<NavBar
				routeName={route.name}
				style={{
					...NavBarStyle.container,
					alignItems: Platform.OS === "web" ? "center" : "flex-end",
				}}
			/>
			<Suspense fallback={<ActivityIndicator size="large" />}>
				<View>
					<ScrollView>
						<View
							style={{
								alignItems: "center",
							}}
						>
							<IndiviudalForm
								containerStyle={{ alignItems: "center" }}
								label="Username:"
								labelStyle={{
									...profileStyles.userField,
									fontWeight: "bold",
								}}
								labelValueHidden={false}
								labelValue={accCtx.username}
								labelValueStyle={profileStyles.userField}
								placeholder="Please enter new username"
								onChangeText={updateUsernameHandler}
								inputPromptStyle={{
									...FormStyle.formInput,
									width: customWidth,
								}}
								submitText="Update Username"
								submitHandler={submitUsername}
								submitStyle={profileStyles.submitButton}
							/>
							<TextError
								style={{
									...styles.errorMsg,
									backgroundColor: errorBackColor,
								}}
								hasError={usernameUpdated}
								message={errorMsg}
							/>
							<IndiviudalForm
								containerStyle={{ alignItems: "center" }}
								label="Email:"
								labelStyle={{
									...profileStyles.userField,
									fontWeight: "bold",
								}}
								labelValueHidden={false}
								labelValue={accCtx.email}
								labelValueStyle={profileStyles.userField}
								placeholder="Please enter new email"
								onChangeText={updateEmailHander}
								inputPromptStyle={{
									...FormStyle.formInput,
									width: customWidth,
								}}
								submitText="Update Email"
								submitHandler={submitEmail}
								submitStyle={profileStyles.submitButton}
							/>
							<TextError
								style={{
									...styles.errorMsg,
									backgroundColor: errorBackColor,
								}}
								hasError={emailUpdated}
								message={errorMsg}
							/>
							<IndiviudalForm
								containerStyle={{ alignItems: "center" }}
								label="Password:"
								labelStyle={{
									...profileStyles.userField,
									fontWeight: "bold",
								}}
								labelValueHidden={true}
								placeholder="Please enter new Password"
								onChangeText={updatePaswordHandler}
								inputPromptStyle={{
									...FormStyle.formInput,
									width: customWidth,
								}}
								submitText="Update Password"
								submitHandler={submitPassword}
								submitStyle={profileStyles.submitButton}
							/>
							<TextError
								style={{
									...styles.errorMsg,
									backgroundColor: errorBackColor,
								}}
								hasError={passwordUpdated}
								message={errorMsg}
							/>
						</View>
						<Text
							style={{
								fontSize: 30,
								fontWeight: "bold",
								textAlign: "center",
							}}
						>
							Recent Recipes
						</Text>
						<View
							style={{
								...recentRecipesBorders,
								...profileStyles.recentRecipes,
								padding: width < 700 ? 0 : 3,
								paddingBottom: numCols <= 1 ? 50 : 0
							}}
						>
							{(recentRecipes.length > 0) || (responded) ? (
								<RecipesArray
									data={recentRecipes}
									renderItem={({ item }) => (
										<RecipeCover
											key={item.id}
											width={numCols <= 1 ? "100%" : 300}
											height={300}
											item={item}
										/>
									)}
								/>
							) : (
								<ActivityIndicator size="large" />
							)}
						</View>
					</ScrollView>
				</View>
			</Suspense>
		</View>
	);
}
