// User should ensure they are logged into sainsbury's prior to running program

import { getBasket } from './get_basket'
import { getRecipe } from './get_recipe'
import { getIngredients } from './recipe_extractor'
import { searchChooseAdd } from './search_choose_add';

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