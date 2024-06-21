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

function get_ingredients()

interface Ingredient {
    name: string;
    amount: string;
}

interface Recipe {
    ingredients: Ingredient[];
    name: string;
    instructions: string;
}

const text: string = "ENTER RECIPE HERE HERE";

async function extractRecipe(text: string): Promise <Recipe> {

    try 

//Output 
    const completion = await openai.chat.completions.create({
        messages: [{"role": "system", "content": "...."},
            {"role": "user", "content": "..."},],
        model: "gpt-3.5-turbo",
      });
    
      console.log(completion.choices[0]);


      
} catch (error) {
    console.error('Error extracting recipe:', error);
  }
} */
