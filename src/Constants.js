export const defaultImage = require("../assets/food_unavailable.jpg");

/**
 * @typedef {{
 *  	id: string,
 * 		name: string,
 *  	image: string,
 *  	ingredients: Array<string>,
 * 		source: string,
 * 		rating: string
 * 	}} recipe
 */

export const NoMoreRecipes = {
    id: "",
    name: "No more Recipes",
    image: "",
    ingredients: ["None"],
    source: "",
    rating: "0.0"
};
