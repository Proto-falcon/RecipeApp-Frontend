import { lazy, Suspense, useContext, useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";
import { RecipeResultsCtx } from "../../context/Context";
import { SearchStyle } from "./SearchStyle";
import { styles } from "../../AppStyles";
import { CsrfCtx } from "../../context/CsrfToken";
import { AccountCtx } from "../../context/account";
import BACKEND from "../../ipaddressesports/BackEndIP";
import { NavBarStyle } from "../../components/NavBar/NavBarStyle";
import NavBar from "../../components/NavBar/NavBar";
const RecipeList = lazy(() => import("../../components/RecipeList/RecipeList"));

/**
 * Renders the page with recipe results depending on
 * the options selected in Search Options page 🔎
 *
 * @returns Search Results Page
 */
export default function Search({ route, navigation }) {
	const ctx = useContext(RecipeResultsCtx);
	const csrfCtx = useContext(CsrfCtx);
	const accCtx = useContext(AccountCtx);

	const [isMounted, setIsMounted] = useState(true);

	useEffect(() => ctx.setIsLoading(false), [ctx.isLoading]);

	// Checks the user has logged in when the app boots up
	useEffect(() => {
		accCtx.checkCred(csrfCtx, BACKEND);
	}, [isMounted]);

	return (
		<View style={styles.pageContainer}>
			<NavBar
				routeName={route.name}
				style={NavBarStyle.container}
			/>
			<Suspense fallback={<ActivityIndicator size="large" />}>
				<View
					style={{
						...SearchStyle.container,
					}}
				>
					{!ctx.isLoading && (
						<RecipeList
							recipes={ctx.results}
							setData={ctx.addRecipes}
							recipeLink={ctx.moreRecipesLink}
							showEnd={true}
						/>
					)}
				</View>
			</Suspense>
		</View>
	);
}
