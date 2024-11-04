import { Builder, Browser} from 'selenium-webdriver';
import { SessionData } from '../auth/login';

export async function OpenCheckout(session_data: SessionData): Promise<void> {
    const driver = await new Builder().forBrowser(Browser.CHROME).build();
    console.log("\nPlease manually login to Sainsbury's and navigate to the checkout page. Press enter to quit the program once checkout is complete.");
    await driver.sleep(5000);

    try {
        await driver.get("https://www.sainsburys.co.uk/gol-ui/trolley");
        await new Promise(resolve => process.stdin.once('data', resolve));

    } catch (error) {
        throw new Error(`Error opening checkout page. Reason: ${error}`);
    } finally {
        await driver.quit();
        process.exit(0);
    }
}