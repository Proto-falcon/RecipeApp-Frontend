import { View } from "react-native";

/**
 * List built for displaying items horizontally that can automatically
 * wraps to the next line. However, it's not built to display lots of items
 * e.g., 100s or 1,000s of items displayed in one screen.
 * 
 * @param {{
 *      style: any,
 *      items: any[],
 *      renderItems: ({item: any, index: number}) => JSX.Element
 * }} props 
 * @returns Horizontal list of items that wraps to next line when
 * the list of items can't fit in 1 line.
 */
export default function WrappingItems({ items, renderItems, style }) {

    function Items() {
        let renderedItems = [];
		items.forEach((item, i) => {
			renderedItems.push(renderItems({ item: item, index: i }));
		});
		return renderedItems;
	}

    return (
        <View
            style={{
                ...style,
                flexDirection: "row",
                flexWrap: "wrap",
            }}
        >
            <Items />
        </View>
    );
}