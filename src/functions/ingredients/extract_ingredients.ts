// takes recipe text and extracts ingredients as simple data structure to be used in the search_choose function
// TO DO: handle instances where there is an OPTION of ingredients

import dotenv from 'dotenv';
import OpenAI from "openai";

dotenv.config();

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
})

export interface Ingredient {
    name: string;
    total_amount: string;
}

export async function ExtractIngredients(recipeText: string): Promise<Ingredient[]> {
    const tools = [
        {
            type: "function" as const,
            function: {
                name: "get_recipe_object",
                description: "Create a recipe object. Do not include optional ingredients. Do not duplicate ingredients. Only include ingredients that are required for the recipe. Be very concise.",
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
                                        description: "Provide only the single base ingredient name that you would need to buy it in the supermarket. Do not including any irrelevant information. For example, use 'butter' instead of 'cold butter' or 'hot butter'."
                                    },
                                    amount: {
                                        type: "string",
                                        description: "The total weight of the ingredient (taking into account number of items and weight per item), converted to grams where possible (denote this with 'g'). If no weight is stated, ensure the weight is '0'."
                                }
                            },
                            required: ["name", "amount"]
                        }
                    }
                },
                required: ["title", "ingredients"]
                }
            }
        }
    ];

    const messages = [
        {
            "role": 'user' as const,
            "content": recipeText
        },
        {
            role: "system" as const,
            content: "You are a helpful assistant designed to output a JSON recipe object. You can only call the function once.",
        }

        ];

    try {
    const response = await openai.chat.completions.create({
        model: "gpt-4o",
        messages: messages,
        tools: tools,
        tool_choice: "auto",
      });
    
    const toolCalls = response.choices[0].message.tool_calls;

    if (!toolCalls || toolCalls.length !== 1) {
        throw new Error("No tool calls were made or multiple calls were made to the function");

    } else {
        const arg = JSON.parse(toolCalls[0].function.arguments);
        const transformIngredients = (functionArgs: any): Ingredient[] => {
            return functionArgs.ingredients.map((ingredient: any) => ({
                name: ingredient.name,
                amount: ingredient.amount, 
            }));
        }
        const ingredients = transformIngredients(arg);
        console.log("Ingredients extracted from recipe.");
        return ingredients;
    }

    } catch (err) {
        throw new Error(`Error extracting ingredients from recipe. Reason: ${err}`);
    }
}

