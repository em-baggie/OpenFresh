/* info send to server = payload tab
info server sends back in response tab */


// things we have: 
// interface chosenIngredient {
//     id: string;
//     quantity: 1;
//   }

// interface SessionData {
//     cookies: string;
//     wc_auth_token: string;
//  }


import axios from 'axios';

interface chosenIngredient {
    puid: string;
    iuid: string;
    quantity: 1;
}

const test_ingredient: chosenIngredient = {
    puid: '',
    iuid: '',
    quantity: 1,
}

async function addCheckout(cookie: string, chosen_ingredient: chosenIngredient) {

    const url = 'https://www.sainsburys.co.uk/groceries-api/gol-services/basket/v2/basket/';
  
    const params = {
        // pick_time:
        // store_number: 
        // slot_booked:
    }
  
    const data = {
        'item_uid': chosen_ingredient["iuid"],
        'product_uid': chosen_ingredient["puid"],
        'quantity': '1'
        //'selected_catchweight': "",
        //'uom': ea,
    }
  
    const header = {
        'authority': 'www.sainsburys.co.uk',
        'method': 'PUT',
        //'path': 'groceries-api/gol-services/basket/v2/basket?pick_time=2024-07-07T18:27:18.270Z&store_number=2168',
        'scheme': 'https',
        'Accept': 'application/json',
        //'Accept-Encoding': 'gzip, deflate, br, zstd',
        //'Accept-Language': 'en-US,en;q=0.9',
        'Authorization': 'something long', //NEED TO FIND THIS!!!
        //'Content-Length': '75',
        'Content-Type': 'application/json',
        'Cookie': '', // add to this,
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
        'Wcauthtoken': '',// ADD THIS: 
    }
    try {
        const response = await axios.post(url, data, { headers: header, params: params });
        console.log('Item added to basket:', response.data);
        return response.data; // Return the response data
    } catch (error) {
        console.error('Error adding item to basket:', error);
        throw new Error('Failed to add item to basket'); // Throw an error for further handling
    }
  
  }

  addCheckout(cookie, test);
    