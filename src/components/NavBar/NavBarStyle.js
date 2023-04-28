import { Platform, StyleSheet } from "react-native";

export const NavBarStyle = StyleSheet.create({
	container: {
		backgroundColor: "#fd5d00",
		flexDirection: "column",
		flexBasis: 75,
		padding: 10,
		justifyContent: "center",
		alignItems: "flex-start"
	},
});

export const navBarHeight = 100;

export const platformStyles = Platform.OS !== "web" ? {
	maxHeight: navBarHeight, minHeight:navBarHeight
} : {};

/**
 * Changes the size of the top padding depending on whether it's on 
 * `web` or `android`.
 * @returns Padding Top Size
 * 
 */
export function changeNavBarPaddingTop() {
    return Platform.OS !== "web" ? 40 : 10
}
