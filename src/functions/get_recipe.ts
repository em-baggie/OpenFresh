import { promises as fs} from 'fs';

export async function getRecipe(fp: string): Promise<string> {

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
/* open('recipe.txt', 'r', (err, fd) => {
    if (err) {
        if (err.code === 'ENOENT') {
            console.error('recipe file does not exist', err);
            return;
        }
        throw err;
    }

    try {
        readFile('/recipe.txt', (err, data) => {
            if (err) {
                throw err;
            }
            const recipeText = data;
            console.log(data)
            return recipeText;
        });
    } catch (err) {
        console.error('Error reading the file:', err)
        throw(err)   }
})
} */
