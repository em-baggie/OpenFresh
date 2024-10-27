import { login_get_cookies } from './src/functions/login'// Adjust the path as necessary

import { config } from 'dotenv'; 

config();

async function run() {
    try {
        const cookies = await login_get_cookies();
        console.log('Cookies:', cookies);
    } catch (error) {
        console.error('Error during login:', error);
    }
}

run();