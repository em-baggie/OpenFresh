// Use puppeteer to extract recipe text from webpages - try this in future, for now use copy/paste
// Output from this file - text string that can be fed into openai
//import puppeteer from "puppeteer-core";

//create new interface and  - takes recipe text, extracts ingredients forming simple structured data (use interface like in ss)
// use openai chat completions functions
// feed these ingredients into search_choose function 
// want to outpu a JSON array of ingredients, and 1 JSON recipe object

import dotenv from 'dotenv';
import OpenAI from "openai";

dotenv.config();

const openai = new OpenAI({apiKey: process.env.OPENAI_API_KEY})

interface Ingredient {
    name: string;
    total_amount: string;
}

interface Recipe {
    ingredients: Ingredient[];
    title: string;
}

// simple example recipe below
const recipeText = `
Chocolate Chip Cookies
Ingredients:
- 1 cup unsalted butter
- 1 cup white sugar
- 2 cups all-purpose flour
- 1 cup chocolate chips

Instructions:
1. Preheat your oven to 350°F (175°C).
2. Cream together the butter and sugar until smooth.
3. Gradually blend in the flour, then fold in the chocolate chips.
4. Drop by spoonfuls onto ungreased cookie sheets.
5. Bake for 8 to 10 minutes in the preheated oven, or until edges are nicely browned.
`;

// create function specification - openai generates function arguments that adhere to the specification
const tools = [
    {
        type: "function" as const,
        function: {
            name: "get_recipe_object",
            description: "Create a recipe object",
            parameters: {
                type: "object",
                properties: {
                    title: {
                        type: "string",
                        description: "Title of the recipe",
                    },
                    ingredients: {
                        type: "array",
                        items: {
                            type: "object",
                            properties: {
                                name: {
                                    type: "string",
                                    description: "Name of the ingredient"
                                }
                            },
                            amount: {
                                type: "integer",
                                description: "Total amount of the ingredient. Either the quantity (number) or if weight per item is mentioned, the total amount of the ingredient in grams"
                            }
                        },
                        required: ["name", "amount"]
                    }
                }
            },
            required: ["title", "ingredients"]
        }
    }];

const messages = [{"role": 'user' as const, "content": recipeText}];

async function getRecipe() {
    const response = await openai.chat.completions.create({
        model: "gpt-4o",
        messages,
        tools,
        tool_choice: "auto",
      });

//TO DO - handle response - declare recipe and ingredients variables to be passed into search_choose functions

}
getRecipe();
