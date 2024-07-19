// User should ensure they are logged into sainsbury's prior to running program

//import { getBasket } from './functions/get_basket'
import { getRecipe } from './functions/get_recipe'
import { getIngredients } from './functions/ingredients_extractor'
import { searchChoose } from './functions/search_choose';
import { login_get_cookies } from './functions/login'

async function main() {

    try {
        //log in and extract cookies
        login_get_cookies();

        // get recipe text
        const recipe_file = "./recipe.txt";
        const recipe = getRecipe(recipe_file);
        console.log(recipe);

        // get ingredients from recipe text

        // search for ingredients

        // add ingredients to basket and redirect to checkout

    } catch(error) {
        console.error('Error performing main function:', error);
    }
} 

main()