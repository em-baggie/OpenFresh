import axios from 'axios';
import { ChosenIngredient } from '../ingredients/search_for_ingredients';

interface SessionData {
    cookies: string;
    wc_auth_token: string;
    auth_token: string;
 }

async function AddToBasket(session_data: SessionData, chosen_ingredient: ChosenIngredient) {

    const currentTime = new Date();
    const pickTime = currentTime.toISOString().slice(0, 19) + 'Z';

    const url = 'https://www.sainsburys.co.uk/groceries-api/gol-services/basket/v2/basket/item';
  
    const params = {
        pick_time: pickTime,
        store_number: '0054',
        slot_booked: false,
    }
  
    const data = 
    {
        "product_uid": chosen_ingredient.puid,
        "quantity": chosen_ingredient.quantity,
        "selected_catchweight": "",
        "uom": "ea"
    }
  
    const header = {
        // ':authority': 'www.sainsburys.co.uk',
        // ':method': 'POST',
        // //'path': 'groceries-api/gol-services/basket/v2/basket?pick_time=2024-07-07T18:27:18.270Z&store_number=2168',
        // ':scheme': 'https',
        'Accept': 'application/json',
        'Accept-Encoding': 'gzip, deflate, br, zstd',
        'Accept-Language': 'en-US,en;q=0.9',
        'Authorization': `Bearer ${session_data.auth_token}`,
        //'Content-Length': '75',
        'Content-Type': 'application/json',
        'Cookie': session_data.cookies, // add to this,
        //'Enabled-Feature-Flags':
        'Origin': 'https://www.sainsburys.co.uk',
        'Priority': 'u=1, i',
        //'Referer': 'https://www.sainsburys.co.uk/gol-ui/SearchResults/ham',
        //'Sec-Ch-Ua': '"Not/A)Brand";v="8", "Chromium";v="126", "Google Chrome";v="126"'
        //'Sec-Ch-Ua-Mobile': '?0',
        //'Sec-Ch-Ua-Platform': '"macOS"',
        //'Sec-Fetch-Dest': 'empty',
        //'Sec-Fetch-Mode': 'cors'
        //'Sec-Fetch-Site': 'same-origin',
        //'Traceparent': '00-e53957c9c7a494fa86194a014efc61c0-2b06b82d0f64991f-01',
        //'Tracestate': '2092320@nr=0-1-1782819-181742266-2b06b82d0f64991f----1722702124068',
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36',
        'Wcauthtoken': session_data.wc_auth_token,
    }

    try {
        await axios.post(url, data, { headers: header, params: params });
    } catch (error) {
        console.error('Error adding item to basket:', error);
        throw new Error('Failed to add item to basket');
    }
  
  }

  export async function AddEachIngredientToBasket(session_data: SessionData, ingredients: ChosenIngredient[]) {
    try {
        for (const ingredient of ingredients) {
            await AddToBasket(session_data, ingredient);
        }
        console.log("Ingredients added to basket.");
    } catch (error) {
        throw new Error(`Error adding ingredients to basket. Reason: ${error}`);
    }
  }