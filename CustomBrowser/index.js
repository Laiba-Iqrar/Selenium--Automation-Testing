var webdriver = require("selenium-webdriver");
var chrome = require("selenium-webdriver/chrome");

// Set up Chrome options
var options = new chrome.Options();

// Specify the user data directory and the profile to use
options.addArguments("user-data-dir=C:\\Users\\CloudJunction\\AppData\\Local\\Google\\Chrome\\User Data");
options.addArguments("profile-directory=Profile 4");

// Initialize the WebDriver with the specified options
var driver = new webdriver.Builder()
    .forBrowser('chrome')
    .setChromeOptions(options)
    .build();

// Navigate to a page to verify the profile is working
driver.get("http://google.com").then(() => {
    console.log("Profile 4 loaded successfully.");
}).catch((err) => {
    console.error("Error:", err);
});
