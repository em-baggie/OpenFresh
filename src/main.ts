// User should ensure they are logged into sainsbury's prior to running program

import { getBasket } from './functions/get_basket'
import { getRecipe } from './functions/get_recipe'
import { getIngredients } from './functions/recipe_extractor'
import { searchChoose } from './functions/search_choose';

async function main() {

    // get log in parameters to include later in requests
    try {
        const login_params = getBasket();
        console.log(login_params);
    } catch(err) {
        console.error("Issue with log in", err);
    }

    // get recipe string from file
    const recipe_file = "./recipe.txt";
    try {
        const recipe = getRecipe(recipe_file);
        console.log(recipe);
    } catch(err) {
        console.error("Unable to get recipe from file", err);
    }

    // get ingredients from recipe


    // search, choose and add ingredients to basket

    // redirect to checkout

}

main()