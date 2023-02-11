import { useEffect, useState } from "react";
import {
	FlatList,
	Image,
	Linking,
	Pressable,
	Text,
	View,
} from "react-native";
import { styles } from "../../AppStyles";
import { recipeListStyle } from "../../components/RecipeList/RecipeListStyle";

export default function RecipeInfo({ route }) {

    const [workingLink, setWorkingLink] = useState(false);
    const [mounted, setMounted] = useState(true);

    async function testLink() {
        let canOpen = await Linking.canOpenURL(route.params.source);
        if (canOpen) {
            setWorkingLink(true);
        }
    }

    useEffect(() => {testLink()}, [mounted]);

	return (
		<View style={{ ...styles.pageContainer, alignItems: "center" }}>
			<Text
				style={{
					textAlign: "center",
					fontSize: 30,
					fontWeight: "bold",
					textDecorationLine: "underline",
				}}
			>
				{route.params.name}
			</Text>
			<View
				style={{
					...recipeListStyle.foodPicContainer,
					...recipeListStyle.foodPic,
				}}
			>
				<Image
					style={{ resizeMode: "contain" }}
					source={{
						uri: route.params.image,
						height: "100%",
						width: "100%",
					}}
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
                        return Linking.openURL(route.params.source)}}
                    }
			>
				<Text style={{ fontWeight: "bold", fontSize: 15 }}>{workingLink ? "Source": "No Source"}</Text>
			</Pressable>
			<FlatList
				data={route.params.ingredients}
				renderItem={({ item, index }) => (
					<Text>
						{index + 1}. {item}
					</Text>
				)}
			/>
		</View>
	);
}
