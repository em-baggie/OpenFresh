
// Module for logging in and extracting session info - use selenium
// Webdriver <-> chromedriver <-> browser

import { Builder, By, WebDriver, Browser, until, Options } from 'selenium-webdriver';

import dotenv from 'dotenv';
dotenv.config();

export async function login_get_cookies() {

    try {
        // start session
        const driver = await new Builder().forBrowser(Browser.CHROME).build();

        // navigate to webpage
        await driver.get("https://account.sainsburys.co.uk/gol/login");

        // find log in elements (email/pw) and establish waiting strategy to ensure elements appeared before action taken on elements
        const email_box = await driver.findElement(By.id("username"));
        const password_box = await driver.findElement(By.id("password"));
        const accept_cookies_button = await driver.findElement(By.id("onetrust-accept-btn-handler"));

        await driver.wait(until.elementIsVisible(accept_cookies_button), 5000);
        await accept_cookies_button.click();

        await driver.wait(until.elementIsVisible(password_box), 5000);
        await driver.wait(until.elementIsVisible(email_box), 5000);

        // log in
        await email_box.sendKeys('emma.baghurst@gmail.com');
        await password_box.sendKeys(process.env.PASSWORD!);

        const button = await driver.findElement(By.css('[data-testid="log-in"]'));
        await button.click();

        // extract cookies
        const cookies = await driver.manage().getCookies();
        console.log(cookies);

        // end session
        await driver.quit();
    } catch (error) {
        console.error('Error logging in and retrieving cookies:', error);
    }
}

login_get_cookies();