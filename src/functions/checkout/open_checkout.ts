import { Builder, Browser} from 'selenium-webdriver';
import { SessionData } from '../auth/login';

export async function OpenCheckout(session_data: SessionData): Promise<void> {
    const driver = await new Builder().forBrowser(Browser.CHROME).build();
    console.log("Please manually login to Sainsbury's and navigate to the checkout page.");
    await driver.sleep(5000);

    try {
        // Navigate to the Sainsbury's checkout page
        await driver.get("https://www.sainsburys.co.uk/gol-ui/trolley");
        
        // Wait for user input before quitting the driver
        console.log("Press enter to quit the program once checkout is complete.");
        await new Promise(resolve => process.stdin.once('data', resolve)); // Wait for user to press Enter

    } catch (error) {
        throw new Error(`Error opening checkout page. Reason: ${error}`);
    } finally {
        await driver.quit();
        process.exit(0); // Ensure the process exits after quitting the driver
    }
}