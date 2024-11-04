import { promises as fs } from 'fs';

export async function GetRecipe(fp: string): Promise<string> {
    try {
        await fs.access(fp, fs.constants.R_OK);
    } catch (err) {
        throw new Error(`File access error: ${fp}. Reason: ${err}`);
    }

    try {
        const data = await fs.readFile(fp);
        return data.toString();
    } catch (err) {
        throw new Error(`File read error: ${fp}. Reason: ${err}`);
    }
}