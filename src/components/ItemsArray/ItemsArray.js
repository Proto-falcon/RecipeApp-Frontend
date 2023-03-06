/**
 * Renders an array of elements so that you can easily
 * render them within components that use Virtualized lists.
 * (Flatlist and ScrollView)
 * 
 * @param {{
 * 		data: any[],
 * 		renderItem: ({item, index: number}) => JSX.Element
 * }} props
 * @returns {JSX.Element} Array of items elements
 */
export default function ItemsArray(props) {
	let recipes = [];

	if (props.data !== undefined) {
		if (props.data.length > 0) {
			props.data.forEach((recipe, index) =>
				recipes.push(props.renderItem({ item: recipe, index: index }))
			);
		}
	}

	return recipes;
}
