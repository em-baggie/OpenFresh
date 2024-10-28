import { login_get_cookies } from './src/functions/login'// Adjust the path as necessary

import { config } from 'dotenv'; 

config();

async function run() {
    try {
        await login_get_cookies();
    } catch (error) {
        console.error('Error during login:', error);
    }
}

run();