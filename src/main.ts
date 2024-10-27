// User should ensure they are logged into sainsbury's prior to running program

import dotenv from 'dotenv';
dotenv.config();

import { getRecipe } from './functions/get_recipe'
import { getIngredients } from './functions/ingredients_extractor'
import { searchChoose } from './functions/search_choose';
import { login_get_cookies } from './functions/login'

async function main() {
    try {
        // log in and extract cookies
        const cookies = await login_get_cookies();

        // get recipe
        const recipe_file = "./recipe.txt";
        const recipe = await getRecipe(recipe_file);

        // get ingredients from recipe text
        // const ingredients = await getIngredients(recipe);

        // for (const ingredient of ingredients) {
        //     sear
        // }

        // search for ingredients

        // add ingredients to basket and redirect to checkout

    } catch(error) {
        console.error('Error performing main function:', error);
    }
} 

main();
