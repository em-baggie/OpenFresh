
// Module for logging in and extracting session info - use selenium
// Webdriver <-> chromedriver <-> browser

import { Builder } from 'selenium-webdriver';

export async function login_get_cookies() {

    // start session
    const driver = await new Builder().forBrowser("chrome").build();

    // navigate to webpage
    await driver.get("https://account.sainsburys.co.uk/gol/login");

    // establish waiting strategy
    await driver.manage().setTimeouts({implicit: 500});

    // find log in elements (email/pw)

    // 

    // request cookie information

    // end session
    await driver.quit();

}