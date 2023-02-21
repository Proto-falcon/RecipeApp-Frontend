import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { Link } from "@react-navigation/native";
import { SearchStyle } from "../../pages/Search/SearchStyle";

/**
 * Renders the Search Button
 * 
 * @param {{ show: boolean }} props
 * 
 * @returns Button that links to the Search Options page
 */
export default function SearchButton({ show }) {

	if (show) {
		return (
			<Link
				to={{ screen: "Search" }}
				style={SearchStyle.imgContainer}
			>
				<FontAwesomeIcon icon={"magnifying-glass"} size={20} />
			</Link>
		);
	} else {
		return undefined;
	}
	
}
