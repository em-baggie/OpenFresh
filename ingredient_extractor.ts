// Use puppeteer to extract recipe text from webpages - try this in future, for now use copy/paste
// Output from this file - text string that can be fed into openai
//import puppeteer from "puppeteer-core";

//create new interface and  - takes recipe text, extracts ingredients forming simple structured data (use interface like in ss)
// use openai chat completions functions
// feed these ingredients into search_choose function 
// want to outpu a JSON array of ingredients, and 1 JSON recipe object

import dotenv from 'dotenv';
import OpenAI from "openai";
import { ChatCompletionMessageParam } from 'openai/resources/index.mjs';

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
    const messages = [{"role": 'user' as const, "content": recipeText}];
    const tools = [
        {

                description: "This is a template that you can start from to build your tool",
                name: "new_tool",
                parameters: {
                    type: "object",
                    properties: {
                        array_property_name: {
                            description: "A property that returns an array of items (can be any type mentioned below, including an object)",
                            items: {
                                type: "string"
                            },
                            type: "array"
                        },
                        boolean_property_name: {
                            description: "A property that returns a boolean",
                            type: "boolean"
                        },
                        enum_property_name: {
                            description: "A property that returns a value from a list of enums (can be any type)",
                            enum: [
                                "option 1",
                                "option 2",
                                "option 3"
                            ],
                            type: "string"
                        },
                        number_property_name: {
                            description: "A property that returns a number",
                            type: "number"
                        },
                        object_property_name: {
                            description: "A property that returns an object",
                            properties: {
                                foo: {
                                    description: "A property on the object called 'foo' that returns a string",
                                    type: "string"
                                },
                                bar: {
                                    description: "A property on the object called 'bar' that returns a number",
                                    type: "number"
                                }
                            },
                            type: "object"  // This was missing
                        },
                        string_property_name: {
                            description: "A property that returns a string",
                            type: "string"
                        }
                    },
                    required: [
                        "array_property_name",
                        "number_property_name"
                    ]
                }
        }
    ];
    
    // work out the error below!

    const response = await openai.chat.completions.create({
        model: "gpt-4o",
        messages,
        tools,
        tool_choice: "auto", // auto is default, but we'll be explicit
      });
      const responseMessage = response.choices[0].message;


}