import { Link } from "@react-navigation/native";
import { Image } from "react-native";
import { styles } from "../../AppStyles";
import { SearchStyle } from "../../pages/Search/SearchStyle";

/**
 * Renders the Search Button
 * @returns Button that links to the Search Options page
 */
export default function SearchButton() {
	const image = require("../../../assets/searchIcon.png");
	return (
		<Link
			to={{ screen: "Search" }}
			style={SearchStyle.imgContainer}
		>
			<Image
				style={styles.searchIcon}
				source={image}
			/>
		</Link>
	);
}
