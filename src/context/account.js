import axios from "axios";
import { createContext, useState } from "react";

// Context for account info
const AccountCtx = createContext({
	loggedIn: false,
	username: "",
	email: "",
	setLoginStatus: () => {},
	setUsername: (newUsername) => {},
	setEmail: (newEmail) => {},
	checkCred: (csrfCtx, domain) => {},
});

/**
 * Account System
 *
 * @param {{children: any}} props
 * @returns App UI
 */
export function AccountProvider(props) {
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");

	/**
	 * Checks whether the user is still logged in or not
	 *
	 * @param {{
	 *     token: string;
	 *     setCsrfToken: (newToken: any) => void;
	 * }} csrfCtx
	 * @param {string} domain
	 */
	async function updateCred(csrfCtx, domain) {
		if (!isLoggedIn) {
			try {
				let response = await axios.get(`${domain}/api/checkLogin/`);
				let content = await response.data;
				csrfCtx.setCsrfToken(content.token);
				if (content.user != false) {
					LogInHandler();
					setUsernameHandler(content.user.username);
					setEmailHandler(content.user.email);
				}
			} catch (error) {
				
			}
		}
	}

	/**
	 * Inverts the `isLoggedIn` state
	 */
	function LogInHandler() {
		setIsLoggedIn((prevState) => !prevState);
	}

	/**
	 * Sets a new valid `email`
	 *
	 * @param {string} newEmail
	 */
	function setEmailHandler(newEmail) {
		if (newEmail == "") {
			setEmail("");
		} else if (
			newEmail.match(
				/^([a-zA-Z0-9]+\.?[a-zA-Z0-9]*)@[a-zA-Z0-9^\.]+\.([a-zA-Z]+\.?[a-zA-Z]*)$/
			)
		) {
			setEmail(newEmail);
		}
	}

	/**
	 * Sets a new `username`
	 *
	 * @param {string} newUsername
	 */
	function setUsernameHandler(newUsername) {
		if (newUsername.length > 0) {
			setUsername(newUsername);
		} else {
			setUsername("");
		}
	}

	return (
		<AccountCtx.Provider
			value={{
				loggedIn: isLoggedIn,
				username: username,
				email: email,
				setLoginStatus: LogInHandler,
				setUsername: setUsernameHandler,
				setEmail: setEmailHandler,
				checkCred: updateCred,
			}}
		>
			{props.children}
		</AccountCtx.Provider>
	);
}

export default AccountCtx;
