// Uses selenium to log into Sainsburys and extract cookies

import dotenv from 'dotenv';
dotenv.config();

import { Builder, By, WebDriver, Browser, until, Options, Key } from 'selenium-webdriver';

export async function login_get_cookies() {
        const email = process.env.EMAIL!;
        const password = process.env.PASSWORD!;

        if (!email || !password) {
            throw new Error('Environment variables EMAIL and PASSWORD are not defined');
        }
    
        // start session
        const driver = await new Builder().forBrowser(Browser.CHROME).build();

        // accept cookies function
        async function acceptCookies() {
            try {
              // Check if the cookie banner is displayed and accept cookies
              let isCookieBannerDisplayed = await driver
                .wait(until.elementLocated(By.id("onetrust-accept-btn-handler")), 5000)
                .catch(() => null);
        
              await driver.sleep(2000); // animation
              if (isCookieBannerDisplayed) {
                const btn = (
                  await driver.findElements(By.id("onetrust-accept-btn-handler"))
                )[0];
                await driver.wait(until.elementIsVisible(btn), 5000);
                await driver.wait(until.elementIsEnabled(btn), 5000);
                await btn.click();
              }
              await driver.sleep(2000); // animation
            } catch(error) {
                console.error("error accepting cookies", error)
            }
          }

        try {
        // navigate to webpage
        await driver.get("https://www.sainsburys.co.uk/");

        await acceptCookies();
        
        const login = await driver.findElement(By.css('[data-id="loginForm"]'));
        await login.click();

        const groceryLogin = await driver.findElement(By.css('[data-testid="account-links-list-item-link"]'));
        await groceryLogin.click();

        console.log("Logging in...");

        await driver.wait(
            until.elementLocated(By.css('[data-testid="username"]')),
            5000
          );
    
        await acceptCookies();

        // Locate and fill in the email field
        let emailBox = await driver.findElement(By.css('[data-testid="username"]'));
        await emailBox.sendKeys(email);

        let passwordField = await driver.findElement(By.css('[data-testid="password"]'));
        await passwordField.sendKeys(password, Key.RETURN);

        // extract cookies
        const cookies = await driver.manage().getCookies();
        console.log(cookies);
        
        // end session
        await driver.quit();
    } catch (error) {
        console.error('Error logging in and retrieving cookies:', error);
    }
}