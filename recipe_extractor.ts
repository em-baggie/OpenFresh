

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
The best apple crumble
Orlando Murrin
A star rating of 4.7 out of 5.
445 ratings
Rate
165 comments
Get 5 issues for £5 when you subscribe to our magazine
Preparation and cooking time
Prep:15 mins
Cook:40 mins
Easy
Serves 4
You can't beat a traditional apple filling topped with crispy, buttery crumble - classic comfort food at its best

Nutrition: Per serving
NutrientUnit
kcal
608
fat
24g
saturates
14g
carbs
90g
sugars
55g
fibre
5g
protein
6g
salt
0.6g

Ingredients
For the filling
575g Bramley apple (3 medium apples), peeled, cored and sliced to 1cm thick
2 tbsp golden caster sugar
For the crumble
175g plain flour
110g golden caster sugar
110g cold butter
For the topping (optional)
1 tbsp rolled oats
1 tbsp demerara sugar
double cream, clotted cream or custard, to serve
Method
STEP 1
Heat the oven to 190C/170 fan/gas 5.

STEP 2
Toss 575g peeled, cored and sliced Bramley apples with 2 tbsp golden caster sugar and put in a 23cm round baking dish at least 5cm deep, or a 20cm square dish. Flatten down with your hand to prevent too much crumble falling through.

STEP 3
Put 175g plain flour and 110g golden caster sugar in a bowl with a good pinch of salt.

STEP 4
Slice in 110g cold butter and rub it in with your fingertips until the mixture looks like moist breadcrumbs. Shake the bowl and any big bits will come to the surface – rub them in. Alternatively, pulse in a processor until sandy (don’t over-process).

STEP 5
Pour the crumb mix over the apples to form a pile in the centre, then use a fork to even out.

STEP 6
Gently press the surface with the back of the fork so the crumble holds together and goes crisp, then lightly drag the fork over the top for a decorative finish.

STEP 7
Sprinkle 1 tbsp rolled oats and 1 tbsp demerara sugar over evenly, if you wish.

STEP 8
Set on a baking tray and put in the preheated oven for 35-40 minutes, until the top is golden and the apples feel very soft when you insert a small, sharp knife. Leave to cool for 10 minutes before serving.
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
                                    description: "Name of the ingredient. Do not include the amount of the ingredient."
                                },
                                amount: {
                                    type: "string",
                                    description: "The total weight of the ingredient (taking into account number of items and weight per item), converted to grams. Add 'g' after the number."
                            }
                        },
                        required: ["name"]
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
        content: "You are a helpful assistant designed to output a JSON recipe object.",
    }

    ];

async function getRecipe() {
    try {
    const response = await openai.chat.completions.create({
        model: "gpt-4o",
        messages: messages,
        tools: tools,
        tool_choice: "auto",
      });
    
    const toolCalls = response.choices[0].message.tool_calls;

    // call the function to get the recipe object
    // TO DO: ensure output complies with interfaces defined at the top 

    // inspect tool_calls array
      if (toolCalls) {
        if (toolCalls) {
            for (const toolCall of toolCalls) {
                const functionName = toolCall.function.name;
                const functionArgs = JSON.parse(toolCall.function.arguments);
                console.log(functionName);
                console.log(functionArgs);
            }
        }
        console.log("Recipe extraction completed successfully")
      } 
    } catch (error) {
        console.error("An error occured during recipe extraction")
    }
}

getRecipe()


/*  if (toolCalls) {
            for (const toolCall of toolCalls) {
                const functionName = toolCall.function.name;
                const functionArgs = JSON.parse(toolCall.function.arguments);

                if (functionName === "get_recipe_object") {
                    const recipeObject: Recipe = {
                        title: functionArgs.title,
                        ingredients: functionArgs.ingredients.map((ingredient: any) => ({
                            name: ingredient.name,
                            total_amount: ingredient.amount
                        }))
                    };

                    const jsonString = JSON.stringify(recipeObject, null, 2);
                    console.log(jsonString);
                }
            }
        } */