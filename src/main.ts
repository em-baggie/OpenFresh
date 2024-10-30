import dotenv from 'dotenv';
dotenv.config();

import { GetRecipe } from './functions/get_recipe'
import { ExtractIngredients, Ingredient } from './functions/extract_ingredients'
import { Login } from './functions/login'
import { SearchForIngredients, ChosenIngredient } from './functions/search_for_ingredients'
import { AddToBasket } from './functions/add_to_basket'

interface chosenIngredient {
    puid: string;
    quantity: 1;
  }

const test: chosenIngredient = {
    puid: '7874865',
    quantity: 1,
}

async function main() {
    try {
        // log in and extract cookies
        const cookies = await Login();

        if (cookies) {
            AddToBasket(cookies, test);
        } else {
            console.error('Cookies are undefined. Please check the login process.');
        }

        // get recipe
        // const recipe_file = "./recipe.txt";
        // const recipe = await getRecipe(recipe_file);

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
