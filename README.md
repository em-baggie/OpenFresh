<h1 align="center">
    <img src="images/openfresh_logo.webp" alt="openfresh logo" height="250">
    <br>
    🥕 OpenFresh 🥦<br>An AI agent for streamlining grocery shopping
</h1>

## Features
- Retrieves relevant ingredients from recipe text file using <a href = "https://platform.openai.com/docs/guides/function-calling">OpenAI function calling</a>
- Searches for these ingredients in Sainsbury's groceries API using reverse engineering of the API response
- Adds the ingredients to the user's Sainsbury's groceries account basket
- Directs the user to the Sainsbury's groceries website to check out and order

## How to run
1. **Clone the repository**: 
   ```
   git clone https://github.com/em-baggie/OpenFresh.git
   cd openfresh
   ```
2. **Install dependencies**: 
   Make sure you have Node.js installed and then run:
   ```
   npm install
   ```
3. **Set up environment variables**: 
   Create a `.env` file in the root directory and add your Sainsbury's account credentials:
   ```
   EMAIL=your_email@example.com
   PASSWORD=your_password
   OPENAI_API_KEY=your_openai_api_key

4. **Edit recipe**:
   Replace the example recipe in `src/functions/recipe/recipe.txt` with your own recipe.
   
5. **Run the program**: 
   Execute the following command to start the program:
   ```
   tsx src/main.ts
   ```
6. **Follow the CL prompts**: 
   The program will guide you through the process of logging in and adding ingredients to your basket.

## Tech Stack used:
- TypeScript
- Javascript (Node.js)
- OpenAI API
- Sainsbury's groceries API
- Selenium WebDriver API