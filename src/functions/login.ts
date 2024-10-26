// Uses selenium to log into Sainsburys and extract cookies

import dotenv from 'dotenv';
dotenv.config({ path: '../../.env' });

import { Builder, By, WebDriver, Browser, until, Options, Key } from 'selenium-webdriver';

export async function login_get_cookies(): Promise<string | undefined>  {
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

        console.log("Email and password entered");

        await driver.sleep(30000); 

       /*  ///////////
        
        let groceries_button = await driver.findElement(By.css('[data-test-id="desktop-nav-item-link"]'));
        await groceries_button.click();

          // <button data-test-id="desktop-nav-item-link" class="nav__menu-link" aria-label="Groceries">Groceries<svg alt="" title="Open groceries menu" class="nav__menu-chevron ln-c-icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>Arrow down</title><path d="M12 14.586L5.707 8.293a1 1 0 0 0-1.414 1.414l7 7a1 1 0 0 0 1.414 0l7-7a1 1 0 1 0-1.414-1.414L12 14.586z" fill="currentColor"></path></svg></button>

        console.log("Groceries button selected"); */
        
        // extract cookies
  
        const cookies = await driver.manage().getCookies();
        const cookieString = cookies.map(cookie => `${cookie.name}=${cookie.value}`).join('; ');
        console.log(cookieString);
        
        return cookieString;

        // end session
    } catch (error) {
        console.error('Error logging in and retrieving cookies:', error);
    }
}

// Remove this line to prevent immediate execution
// login_get_cookies();
