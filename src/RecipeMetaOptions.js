const DIETS = [
	"balanced",
	"high-fiber",
	"high-protein",
	"low-carb",
	"low-fat",
	"low-sodium",
];
const HEALTHS = [
	"alcohol-cocktail",
	"alcohol-free",
	"celery-free",
	"crustacean-free",
	"dairy-free",
	"DASH",
	"egg-free",
	"fish-free",
	"fodmap-free",
	"gluten-free",
	"immuno-supportive",
	"keto-friendly",
	"kidney-friendly",
	"kosher",
	"low-potassium",
	"low-sugar",
	"lupine-free",
	"Mediterranean",
	"mollusk-free",
	"mustard-free",
	"No-oil-added",
	"paleo",
	"peanut-free",
	"Pescatarian",
	"pork-free",
	"red-meat-free",
	"sesame-free",
	"shellfish-free",
	"soy-free",
	"sugar-conscious",
	"sulfite-free",
	"tree-nut-free",
	"vegan",
	"vegetarian",
	"wheat-free",
];

const MEALTYPES = [
	"breakfast",
	"brunch",
	"lunch/dinner",
	"snack",
	"teatime",
];

const DISHTYPES = [
	"alcohol cocktail",
	"biscuits and cookies",
	"bread",
	"cereals",
	"condiments and sauces",
	"desserts",
	"drinks",
	"egg",
	"ice cream and custard",
	"main course",
	"pancake",
	"pasta",
	"pastry",
	"pies and tarts",
	"pizza",
	"preps",
	"preserve",
	"salad",
	"sandwiches",
	"seafood",
	"side dish",
	"soup",
	"special occasions",
	"starter",
	// "sweets",
];

const CUISINETYPES = [
	"american",
	"asian",
	"british",
	"caribbean",
	"central europe",
	"eastern europe",
	"chinese",
	"french",
	"greek",
	"indian",
	"italian",
	"japanese",
	"korean",
	"kosher",
	"mediterranean",
	"mexican",
	"middle eastern",
	"nordic",
	"south american",
	"south east asia",
	"world",
];

export default {
	diet: DIETS,
	health: HEALTHS,
	mealType: MEALTYPES,
    dishType: DISHTYPES,
    cuisineType: CUISINETYPES
};
