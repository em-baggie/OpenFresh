import dotenv from 'dotenv';
dotenv.config();

import { GetRecipe } from './functions/get_recipe'
import { ExtractIngredients, Ingredient } from './functions/extract_ingredients'
import { Login } from './functions/login'
import { SearchForIngredient, ChosenIngredient } from './functions/search_for_ingredients'
import { AddToBasket } from './functions/add_to_basket'

// example ingredient interfaces 
// interface chosenIngredient {
//     puid: string;
//     quantity: 1;
//   }

// const test: chosenIngredient = {
//     puid: '7874865',
//     quantity: 1,
// }

async function main() {

    // get recipe
    let recipe;
    const recipeFile = "./recipe.txt"; 
    try {// Assume this file does not exist
        recipe = await GetRecipe(recipeFile); // This may throw an error
    } catch (error) {
        console.error(`Error in main function while getting recipe from file "${recipeFile}":`, (error as Error).message);
        return; // Exit early if an error occurs
    }

    // extract ingredients
    let ingredients;
    try {
        ingredients = await ExtractIngredients(recipe);
    } catch (error) {
        console.error('Error extracting ingredients:', (error as Error).message);
    }

    // search for ingredients
    try {
        for (const ingredient of ingredients) {
            const chosen = await SearchForIngredient(ingredient);
        }
    
    }

    // log in, get cookies

    // add ingredients to basket

    // redirect to checkout

    try {

        // log in and extract cookies
        const cookies = await Login();



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
