import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { Link } from "@react-navigation/native";
import { SearchStyle } from "../../pages/Search/SearchStyle";

/**
 * Renders the Search Button
 * @returns Button that links to the Search Options page
 */
export default function SearchButton() {
	return (
		<Link
			to={{ screen: "Search" }}
			style={SearchStyle.imgContainer}
		>
			<FontAwesomeIcon icon={"magnifying-glass"} size={20} />
		</Link>
	);
}
