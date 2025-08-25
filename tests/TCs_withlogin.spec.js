import {test,expect} from '@playwright/test';
import {BasePage} from '../pages/basepage'; 
import {HomePage} from '../pages/homepage';
import {LoginPage} from '../pages/loginpage';
import testdata from '../utils/testdata';

test('TC1_Verify Login with Valid Credentials', async({page}) => {
    const loginPage = new LoginPage(page);
    const homePage = new HomePage(page);
    const basePage = new BasePage(page);

    await basePage.goto(); 
    await homePage.clickLogin(); // Click on the login link 
    await expect(page).toHaveURL('/login'); // Verify the URL is correct
    await expect(loginPage.emailInput).toBeVisible(); // Verify the email input is visible
    await expect(loginPage.passwordInput).toBeVisible(); // Verify the password input is visible
    await expect(loginPage.loginButton).toBeVisible(); // Verify the login button is visible
    await loginPage.login(testdata.valid.email, testdata.valid.password); // Enter a valid email
    await expect(loginPage.isLoggedIn()).toBeTruthy(); // Verify the user is logged in
    await expect(page).toHaveURL('/'); // Verify the URL is redirected to home page

});

test('TC_2Verify Login with Invalid Credentials', async({page}) => {
    const loginPage = new LoginPage(page);
    const homePage = new HomePage(page);
    const basePage = new BasePage(page);

    await basePage.goto(); 
    await homePage.clickLogin(); // Click on the login link 
    await expect(page).toHaveURL('/login'); // Verify the URL is correct
    await loginPage.login(testdata.invalid.email, testdata.invalid.password); // Enter an invalid email
    const errormessage = await loginPage.getErrorMessage(); // Log the error message
    await expect(errormessage).toBe('Login was unsuccessful. Please correct the errors and try again.') // Verify the error message
});

test('TC3_Verify Logout after logging with Valid Credentials', async({page}) => {
    const loginPage = new LoginPage(page);
    const homePage = new HomePage(page);
    const basePage = new BasePage(page);

    await basePage.goto(); 
    await homePage.clickLogin(); // Click on the login link 
    await expect(page).toHaveURL('/login'); // Verify the URL is correct
    await loginPage.login(testdata.valid.email, testdata.valid.password); // Enter a valid email
    await expect(loginPage.isLoggedIn()).toBeTruthy(); // Verify the user is logged in
    await expect(page).toHaveURL('/'); // Verify the URL is redirected to home page
    await homePage.clickLogout(); // Click on the logout link
    await expect(loginPage.logoutLink).not.toBeVisible(); // Verify the logout link is not visible
});

