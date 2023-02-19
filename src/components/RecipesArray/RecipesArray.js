/**
 * Renders recipes as an array of elements
 * @typedef {{
 *  	id: string,
 * 		name: string,
 *  	image: any,
 *  	ingredients: Array<string>,
 * 		source: string
 * 	}} recipe
 * @param {{
 * 		data: recipe[],
 * 		renderItem: ({item: recipe}) => JSX.Element
 * }} props
 * @returns {JSX.Element} Array of recipe elements
 */
export default function RecipesArray(props) {
	let recipes = [];

	if (props.data !== undefined) {
		if (props.data.length > 0) {
			props.data.forEach((recipe) =>
				recipes.push(props.renderItem({ item: recipe }))
			);
		}
	}

	return recipes;
}
