import axios from 'axios';

interface Basket {
    basket_id: number,
    order_id: number,
    cookies: string,
}

export async function getBasket(): Promise<Basket> {
    const url = 'https://www.sainsburys.co.uk/groceries-api/gol-services/basket/v2';
    const params = {}; //payload tab
    const header = {};

    try {

    } catch(err) {
        console.log("Error finding basket/order id. Please ensure you are logged in and try again", err)
        throw(err);
    }
}