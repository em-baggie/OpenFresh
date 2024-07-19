/*
1. add ingredients to basket
2. redirect to checkout page for user to checkout
*/

//TOD
// need to somehow incorporate number of items
interface chosenIngredient {
    name: string;
    price: number;
    id: string;
  }

const ingredient = {
    name: "Sainsbury's British Mature Cheddar Cheese 400g",
    price: 3,
    id: '7178868'
}

/* info send to server = payload tab
info server sends back in response tab */
export async function addCheckout(cookie: string, ingredient: chosenIngredient) {

    const url = 'https://www.sainsburys.co.uk/groceries-api/gol-services/basket/v2/basket/';

    const params = {
        // pick_time:
        // store_number: 
    }

    const data = {
        'product_uid': ingredient["id"],
        'quantity': '1',
        //'selected_catchweight': '',
        //'uom': ea,
    }

    const header = {
        //'authority': 'www.sainsburys.co.uk',
        'method': 'POST',
        //'path': 'groceries-api/gol-services/basket/v2/basket?pick_time=2024-07-07T18:27:18.270Z&store_number=2168',
        //'scheme': 'https',
        'Accept': 'application/json',
        'Accept-Encoding': 'gzip, deflate, br, zstd',
        'Accept-Language': 'en-US,en;q=0.9',
        //'Authorization': 'something long',
        //'Content-Length': '75',
        //'Content-Type': 'application/json',
        'Cookie': 

    }

    }