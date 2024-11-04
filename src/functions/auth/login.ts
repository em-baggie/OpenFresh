import { Builder, By, WebDriver, Browser, until, Key } from 'selenium-webdriver';

export interface SessionData {
   cookies: string;
   wc_auth_token: string;
   auth_token: string;
}

export async function Login(): Promise<SessionData>  {
  const email = process.env.EMAIL!;
  const password = process.env.PASSWORD!;

  if (!email || !password) {
      throw new Error('Environment variables EMAIL and PASSWORD are not defined');
  }

  const driver = await new Builder().forBrowser(Browser.CHROME).build();

  async function acceptCookies() {
    try {
      let isCookieBannerDisplayed = await driver
        .wait(until.elementLocated(By.id("onetrust-accept-btn-handler")), 5000)
        .catch(() => null);

      await driver.sleep(2000); 
      if (isCookieBannerDisplayed) {
        const btn = (
          await driver.findElements(By.id("onetrust-accept-btn-handler"))
        )[0];
        await driver.wait(until.elementIsVisible(btn), 5000);
        await driver.wait(until.elementIsEnabled(btn), 5000);
        await btn.click();
      }
      await driver.sleep(2000); 
    } catch(error) {
        throw new Error(`Error accepting cookies. Reason: ${error}`);
    }
  }

  try {
    console.log("Beginning login process.");

    await driver.get("https://www.sainsburys.co.uk/");

    await acceptCookies();
    
    const login = await driver.findElement(By.css('[data-id="loginForm"]'));
    await login.click();

    const groceryLogin = await driver.findElement(By.css('[data-testid="account-links-list-item-link"]'));
    await groceryLogin.click();

    await driver.wait(
        until.elementLocated(By.css('[data-testid="username"]')),
        5000
      );

    await acceptCookies();

    console.log("Entering email and password.");
    let emailBox = await driver.findElement(By.css('[data-testid="username"]'));
    await emailBox.sendKeys(email);

    let passwordField = await driver.findElement(By.css('[data-testid="password"]'));
    await passwordField.sendKeys(password, Key.RETURN);

    console.log("Retrieving cookies.");
    await driver.sleep(5000);

    const cookies = await driver.manage().getCookies();

    const cookieString = cookies.map(cookie => `${cookie.name}=${cookie.value}`).join('; ');

    // Extract the wc_auth_token from the cookie string
    const wcAuthTokenMatch = cookieString.match(/WC_AUTHENTICATION_\d+=([^;]+)/);
    const wc_auth_token = wcAuthTokenMatch ? wcAuthTokenMatch[1] : "";

    // Extract access_token from the cookie string, if available
    const accessToken = await driver.executeScript("return JSON.parse(localStorage.getItem('oidc.user:https://account.sainsburys.co.uk:gol')).access_token;");
    const auth_token = typeof accessToken === 'string' ? accessToken : ""; 

    if (!wc_auth_token) {
       throw new Error("WC_AUTH_TOKEN not found in the cookie string.");
    }
    if (!auth_token) {
      throw new Error("AUTH_TOKEN not found in the cookie string.");
    }

    const session_data: SessionData = {
        cookies: cookieString,
        wc_auth_token,
        auth_token,
    };

    console.log("Logged in and retrieved session data.");
  
    await driver.quit();

    return session_data;

  } catch (err) {
     throw new Error(`Error logging in and retrieving cookies. Reason: ${err}`);
  } 
}