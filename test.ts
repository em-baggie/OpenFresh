// Function to call OpenAI's API for extracting ingredients
async function extractIngredients(text: string): Promise<Ingredient[]> {
    const response = await openai.createChatCompletion({
        model: "gpt-4",
        messages: [
            { role: "system", content: "You are a helpful assistant." },
            { role: "user", content: text }
        ],
        functions: [extractIngredientsFunction],
        function_call: "auto"
    });

    const ingredientsString = response.data.choices[0].message?.function_call?.arguments;
    return JSON.parse(ingredientsString || '[]');
}

// Function to create a recipe object
async function createRecipe(ingredients: Ingredient[], name: string, instructions: string): Promise<Recipe> {
    const response = await openai.createChatCompletion({
        model: "gpt-4",
        messages: [
            { role: "system", content: "You are a helpful assistant." },
            { role: "user", content: `Ingredients: ${JSON.stringify(ingredients)}\nName: ${name}\nInstructions: ${instructions}` }
        ],
        functions: [createRecipeFunction],
        function_call: "auto"
    });

    const recipeString = response.data.choices[0].message?.function_call?.arguments;
    return JSON.parse(recipeString || '{}');
}

// Extract ingredients and create recipe object
async function processRecipe(recipeText: string) {
    const ingredients = await extractIngredients(recipeText);

    const recipeName = "Chocolate Chip Cookies";
    const recipeInstructions = `
    1. Preheat your oven to 350°F (175°C).
    2. Cream together the butter and sugar until smooth.
    3. Gradually blend in the flour, then fold in the chocolate chips.
    4. Drop by spoonfuls onto ungreased cookie sheets.
    5. Bake for 8 to 10 minutes in the preheated oven, or until edges are nicely browned.
    `;

    const recipe = await createRecipe(ingredients, recipeName, recipeInstructions);
    console.log(recipe);
}

// Run the process
processRecipe(recipeText);

/* 
function getRecipe(recipe: Recipe, ingredient: Ingredient ) {
    recipe = recipe;


}

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
 */
