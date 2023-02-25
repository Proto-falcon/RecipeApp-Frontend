import axios from "axios";
import { Suspense, useContext, useEffect, useState } from "react";
import {
	ActivityIndicator,
	FlatList,
	Image,
	Linking,
	Pressable,
	Text,
	View,
} from "react-native";
import { styles } from "../../AppStyles";
import { recipeListStyle } from "../../components/RecipeList/RecipeListStyle";
import { AccountCtx } from "../../context/account";
import BACKEND from "../../ipaddressesports/BackEndIP";
import NavBar from "../../components/NavBar/NavBar";
import { CsrfCtx } from "../../context/CsrfToken";
import { NavBarStyle } from "../../components/NavBar/NavBarStyle";

export default function RecipeInfo({ route, navigation }) {

	const accCtx = useContext(AccountCtx);
	const authCtx = useContext(CsrfCtx);

    const [workingLink, setWorkingLink] = useState(false);
    const [mounted, setMounted] = useState(true);
	const [name, setName] = useState("Recipe Unavailable");
	const [image, setImage] = useState(require("../../../assets/favicon.png"));
	const [ingredients, setIngredients] = useState([]);
	const [source, setSource] = useState("");

	/**
	 * Checks if the link works or not
	 */
    async function testLink() {
		if (source.length > 0) {
			let canOpen = await Linking.canOpenURL(source);
			if (canOpen) {
				setWorkingLink(true);
			}
		}
    }

	/**
	 * Gets the relevant info about the recipe
	 */
	async function getRecipe() {
		try {
			let response = await axios.get(`${BACKEND}/api/getRecipe/?id=${route.params.id}`);
			let content = await response.data;
			setName(content.name);
			setImage({uri: `${BACKEND}/${content.image}` ,height: "100%", width: "100%"});
			setIngredients(content.ingredients);
			setSource(content.source);
		} catch (error) {
		}
	}

	// Fetches the recipes from the backend
    useEffect(() => {
		accCtx.checkCred(authCtx, BACKEND)
		getRecipe();
	}, [mounted]);

	useEffect(() => {testLink()}, [source]);

	return (
		<View style={styles.pageContainer}>
			<NavBar
				routeName={route.name}
				style={NavBarStyle.container}
			/>
			<Suspense fallback={<ActivityIndicator size="large" />}>
				<View style={{ alignItems: "center" }}>
					<Text
						style={{
							textAlign: "center",
							fontSize: 30,
							fontWeight: "bold",
							textDecorationLine: "underline",
						}}
					>
						{name}
					</Text>
					<View
						style={{
							...recipeListStyle.foodPicContainer,
							...recipeListStyle.foodPic,
						}}
					>
						<Image
							style={{ resizeMode: "contain" }}
							source={image}
						/>
					</View>
					<Pressable
						style={{
							backgroundColor: "#fd5d00",
							margin: 10,
							padding: 10,
							borderRadius: 20,
						}}
						onPress={async () => {
							if (workingLink) {
								return Linking.openURL(source)}}
							}
					>
						<Text style={{ fontWeight: "bold", fontSize: 15 }}>{workingLink ? "Source": "No Source"}</Text>
					</Pressable>
					<Text style={{fontWeight: "bold", fontSize: 20, textDecorationLine: "underline", textAlign: "center" }}>Ingredients</Text>
					<FlatList
						data={ingredients}
						renderItem={({ item, index }) => (
							<Text style={{textAlign: "left"}}>
								{index + 1}. {item.text}
							</Text>
						)}
					/>
				</View>
			</Suspense>
		</View>

	);
}
