import { useContext, useEffect, useState } from "react";
import { Platform, View } from "react-native";
import RecipeResultsCtx from "../../context/Context";
import RecipeList from "../../components/RecipeList/RecipeList";
import { SearchStyle } from "./SearchStyle";
import { styles } from "../../AppStyles";
import BackEndIP from "../../ipaddressesports/BackEndIP";
import * as KeyChain from "react-native-keychain";
import CsrfCtx from "../../context/CsrfToken";
import axios from "axios";

let BACKEND = "/";
if (__DEV__) {
	BACKEND = BackEndIP;
}

/**
 * Renders the page with recipe results depending on
 * the options selected in Search Options page 🔎
 *
 * @returns Search Results Page
 */
export default function Search() {
	const ctx = useContext(RecipeResultsCtx);
	const authCtx = useContext(CsrfCtx);

	const [isMounted, setIsMounted] = useState(true);

	useEffect(() => ctx.setIsLoading(false), [ctx.isLoading]);

	async function checkCred() {
		if (Platform.OS != "web") {
			const credentials = await KeyChain.getGenericPassword();
			console.log(credentials)
		}
		let response = await axios.get(`${BACKEND}/api/getToken/`, {withCredentials: true})
		console.log(response.headers);
		let content = await response.data;
		authCtx.setCsrfToken(content.token)
		document.cookie = `csrftoken=${content.token};`;
	}


	useEffect(() => {
		checkCred();
		
		authCtx.setCsrfToken
	}, [isMounted])

	return (
		<View style={{...SearchStyle.container, ...styles.pageContainer}}>
			{!ctx.isLoading && <RecipeList
				recipes={ctx.results}
				setData={ctx.addRecipes}
				recipeLink={ctx.moreRecipesLink}
			/>}
		</View>
	);
}
