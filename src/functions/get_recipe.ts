import { promises as fs} from 'fs';

export async function GetRecipe(fp: string): Promise<string> {

    try {
        await fs.access(fp, fs.constants.R_OK);
    } catch(err) {
        console.error("Error when trying to access the file", err);
        throw err;
    }

    try {
        const data = await fs.readFile(fp);
        const recipeText = data.toString();
        return recipeText;
    }  catch(err) {
        console.error("Error reading file", err)
        throw err;
    }

}