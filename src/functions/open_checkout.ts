import { Builder, By, WebDriver, Browser, until } from 'selenium-webdriver';
import { SessionData } from './login';

export async function OpenCheckout(session_data: SessionData): Promise<void> {
    const driver = await new Builder().forBrowser(Browser.CHROME).build();

    try {
        // Navigate to the Sainsbury's checkout page
        await driver.get("https://www.sainsburys.co.uk/gol-ui/trolley");

        console.log("Checkout page opened successfully.");
        
        // Wait for user input before quitting the driver
        console.log("Press any key to close the browser once checkout is complete.");
        await new Promise(resolve => process.stdin.once('data', resolve)); // Wait for user to press Enter

    } catch (error) {
        throw new Error(`Error opening checkout page. Reason: ${error}`);
    } finally {
        await driver.quit();
        process.exit(0); // Ensure the process exits after quitting the driver
    }
}