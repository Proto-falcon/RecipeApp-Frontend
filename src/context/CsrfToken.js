import { createContext, useState } from "react";

const CsrfCtx = createContext({
	token: "",
	setCsrfToken: (newToken) => {},
});

/**
 * Context Manager for Csrf
 *
 * @param {{children: any}} props
 * @returns Components that can use the csrf context
 */
export function CsrfContextProvider(props) {
	const [token, setToken] = useState("");

	/**
	 * Updates the csrf `token`
	 *
	 * @param {string} newToken
	 */
	function updateToken(newToken) {
		setToken(newToken);
	}

	return (
		<CsrfCtx.Provider
			value={{
				token: token,
				setCsrfToken: updateToken,
			}}
		>
			{props.children}
		</CsrfCtx.Provider>
	);
}

export default CsrfCtx;
