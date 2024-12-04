const { Builder } = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");

const downloadFilePath = "D:\\ChromeDownloads";

const chromePrefs = {
    "profile.default_content_settings.popups": 0,
    "download.default_directory": downloadFilePath,
    "download.prompt_for_download": false,
    "safebrowsing.enabled": true
};

const options = new chrome.Options();
options.setUserPreferences(chromePrefs);

(async function setupDriver() {
    const driver = await new Builder()
        .forBrowser("chrome")
        .setChromeOptions(options)
        .build();

    try {
        await driver.get("https://support.staffbase.com/hc/en-us/article_attachments/360009197031/username.csv");
        console.log("File download initiated...");
    } catch (error) {
        console.error("An error occurred:", error);
    } finally {
        await driver.quit();
    }
})();
