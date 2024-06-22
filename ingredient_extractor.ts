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

const recipeText: string = "ENTER RECIPE HERE HERE";

async function getRecipe() {
    const messages = [
        { role: 'user', content: recipeText},
        { role: 'system', content: "create a recipe object from the inputted recipe text"}
      ];
      const tools = [
        {
            type: "function",
            function: {
                description: "Create a recipe object",
                parameters: {
                    type: "object",
                    properties: {
                        title: {
                            type: "string",
                            description: "The title of the recipe"
                        },
                        ingredients: {
                            type: "array",
                            items: {
                                type: "object",
                                properties: {
                                    name: {
                                        type: "string",
                                        description: "Name of the ingredient"
                                    },
                                    total_amount: {
                                        type: "string",
                                        description: "Total amount of the ingredient. Either the quantity (number) or if weight per item is mentioned, the total amount of the ingredient in grams"
                                    }
                                },
                                required: ["name", "total_amount"],
                            },
                        },
                    },
                    required: ["title", "ingredients"]
                }
            }
        }
    ];
    
    // work out the error below!

    const response = await openai.chat.completions.create({
        model: "gpt-4o",
        messages: messages,
        tools: tools,
        tool_choice: "auto", // auto is default, but we'll be explicit
      });
      const responseMessage = response.choices[0].message;


}