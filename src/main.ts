import dotenv from 'dotenv';
dotenv.config();

import { GetRecipe } from './functions/recipe/get_recipe'
import { ExtractIngredients, Ingredient } from './functions/ingredients/extract_ingredients'
import { Login, SessionData } from './functions/auth/login'
import { SearchForEachIngredient, ChosenIngredient } from './functions/ingredients/search_for_ingredients'
import { AddEachIngredientToBasket } from './functions/checkout/add_to_basket'
import { OpenCheckout } from './functions/checkout/open_checkout';

async function main() {
    // get recipe
    let recipe;
    const recipeFile = "src/functions/recipe/recipe.txt"; 
    try {
        recipe = await GetRecipe(recipeFile); 
    } catch (error) {
        console.error(`Error while getting recipe from file "${recipeFile}":`, (error as Error).message);
        return;
    }

    // extract ingredients
    let ingredients: Ingredient[] = [];
    try {
        ingredients = await ExtractIngredients(recipe);
    } catch (error) {
        console.error('Error extracting ingredients:', (error as Error).message);
        return;
    }

    // log in and get session data
    let session_data: SessionData;
    try {
        session_data = await Login();
    } catch (error) {
        console.error('Error logging in:', (error as Error).message);
        return;
    }

    // search for ingredients
    let chosen_ingredients: ChosenIngredient[] = [];
    try {
        chosen_ingredients = await SearchForEachIngredient(session_data,ingredients)
    } catch (error) {
        console.error('Error searching for ingredients:', (error as Error).message);
        return;
    }

    // add ingredients to basket
    try {
        await AddEachIngredientToBasket(session_data, chosen_ingredients)
    } catch (error) {
        console.error('Error adding ingredients to basket:', (error as Error).message);
        return;
    }

    // redirect to checkout
    try {
        await OpenCheckout(session_data)
    } catch (error) {
        console.error('Error opening checkout:', (error as Error).message);
        return;
    }
    return;
} 

main();