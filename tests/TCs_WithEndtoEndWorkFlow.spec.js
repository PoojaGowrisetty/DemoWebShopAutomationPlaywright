import { test, expect } from '@playwright/test';
import {BasePage} from '../pages/basepage'; 
import {HomePage} from '../pages/homepage';
import {ProductsPage} from '../pages/productspage';
import {TopMenuPage} from '../pages/topmenupage';
import {Cartpage } from '../pages/cartpage';
import {CheckoutPage} from '../pages/checkoutpage';
import {LoginPage} from '../pages/loginpage';
import { RegisterPage } from '../pages/registerpage';
import testdata from '../utils/testdata';



test.describe('End to end Worflow Tests', () => {
    let registerPage,loginPage,basePage, homePage, productsPage, topMenuPage, cartPage, checkoutPage;


    test.beforeEach(async ({ page }) => {
        registerPage = new RegisterPage(page);
        loginPage = new LoginPage(page);
        homePage = new HomePage(page);
        basePage = new BasePage(page);
        productsPage = new ProductsPage(page);
        topMenuPage = new TopMenuPage(page);
        cartPage = new Cartpage(page);
        checkoutPage = new CheckoutPage(page);
        await basePage.goto();
    });

    test.only("TC1_End to End purchase multiple categories from Register to Checkout", async ({}) => {
        //Register and Login
        await homePage.clickRegister();
        expect(basePage.getPageURL()).toContain('/register');
        await registerPage.registerNewUser("Male");
        const message = (await registerPage.getRegistrationSuccessMessage()).trim();
        expect(message).toBe('Your registration completed');
        await registerPage.clickContinueAfterRegistration();
        expect(await homePage.verifyUserLoggedIn()).toBeTruthy();
        // Purchase Books
        await topMenuPage.selectMenuItem('Books');
        expect(basePage.getPageURL()).toContain('/books');
        const initialCartQty = await homePage.getShoppingCartQty();
        expect(initialCartQty).toBe('(0)');
        await productsPage.addToCartFromProductName('Fiction');
        const notificationText1 = await homePage.getBarNotificationText();
        expect(notificationText1).toContain('The product has been added to your shopping cart');
        const updatedCartQty1 = await homePage.getShoppingCartQty();
        expect(updatedCartQty1).toBe('(1)');
        // Purchase Jewelry
        await topMenuPage.selectMenuItem('Jewelry');
        expect(basePage.getPageURL()).toContain('/jewelry');
        await productsPage.addToCartFromProductName('Black & White Diamond Heart');
        const notificationText2 = await homePage.getBarNotificationText();
        expect(notificationText2).toContain('The product has been added to your shopping cart');
        const updatedCartQty2 = await homePage.getShoppingCartQty();
        expect(updatedCartQty2).toBe('(2)');
        // Purchase Digital Downloads
        await topMenuPage.selectMenuItem('digital-downloads');
        expect(basePage.getPageURL()).toContain('/digital-downloads');
        await productsPage.addToCartFromProductName('3rd Album');
        const updatedCartQty3 = await homePage.getShoppingCartQty();
        expect(updatedCartQty3).toBe('(3)');
        // Purchase Computers 
        await topMenuPage.selectMenuItem('Computers','Accessories');
        expect(basePage.getPageURL()).toContain('/accessories');
        const desktopsPageTitle = await basePage.getPageTitle();
        expect(desktopsPageTitle).toContain('Accessories');
        await productsPage.addToCartFromProductName('TCP Instructor Led Training');
        const updatedCartQty4 = await homePage.getShoppingCartQty();
        expect(updatedCartQty4).toBe('(4)');
        // go to cart and validate
        await homePage.clickShoppingCart();
        expect(basePage.getPageURL()).toContain('/cart');
        const cartItemCount = await cartPage.getCartItemCount();
        expect(cartItemCount).toBe(4); // Four different products added
        const cartQty = await cartPage.getcartItemQuantity();
        expect(cartQty).toBe(1); // Quantity should be 1 for each product
        const productNamesInCart = await cartPage.getProductNamesInCart();
        expect(productNamesInCart).toContain('Fiction');
        expect(productNamesInCart).toContain('Black & White Diamond Heart');
        expect(productNamesInCart).toContain('3rd Album');
        expect(productNamesInCart).toContain('TCP Instructor Led Training');
        expect(productNamesInCart.length).toBe(4); // Four different products added
        await cartPage.agreeToTerms();
        await cartPage.proceedToCheckout();
        // checkout page validations
        expect(basePage.getPageURL()).toContain('/onepagecheckout');
        await checkoutPage.enterBillingAddress("new user");
        await checkoutPage.selectshippingAddressOption();
        await checkoutPage.selectShippingMethod("Next Day Air (0.00)");
        await checkoutPage.selectPaymentMethod("Check / Money Order (5.00)");
        await checkoutPage.continueFromPaymentInfo();
        await checkoutPage.confirmOrder();
        const orderConfirmationMsg = await checkoutPage.getOrderConfirmationMessage();
        expect(orderConfirmationMsg).toContain('Your order has been successfully processed!');


     });

    test('TC2_Purchasing Books with login User', async ({}) => {
        // Login
        await homePage.clickLogin();
        expect(basePage.getPageURL()).toContain('/login');
        await loginPage.login(testdata.valid.email, testdata.valid.password); // Enter a valid email
        expect(loginPage.isLoggedIn()).toBeTruthy();
        // Navigate to Books category
        await topMenuPage.selectMenuItem('Books');
        expect(basePage.getPageURL()).toContain('/books');
        const initialCartQty = await homePage.getShoppingCartQty();
        expect(initialCartQty).toBe('(0)');

        // Add product to cart from product listing page
        await productsPage.addToCartFromProductName('Computing and Internet');
        const notificationText1 = await homePage.getBarNotificationText();
        expect(notificationText1).toContain('The product has been added to your shopping cart');
        const updatedCartQty1 = await homePage.getShoppingCartQty();
        expect(updatedCartQty1).toBe('(1)');    

        // Navigate to product details page
        await productsPage.clickOnProductByName('Computing and Internet');
        expect(basePage.getPageURL()).toContain('/computing-and-internet');
        const isAddToCartVisible = await productsPage.isAddToCartButtonindetailsPageVisible();
        expect(isAddToCartVisible).toBeTruthy();

        // Add product to cart from product details page
        await productsPage.addToCartFromDetailsPage();
        const notificationText2 = await homePage.getBarNotificationText();
        expect(notificationText2).toContain('The product has been added to your shopping cart');
        const updatedCartQty2 = await homePage.getShoppingCartQty();
        expect(updatedCartQty2).toBe('(2)'); 
        
        // go to cart and validate
        await homePage.clickShoppingCart();
        expect(basePage.getPageURL()).toContain('/cart');
        const cartItemCount = await cartPage.getCartItemCount();
        expect(cartItemCount).toBe(1); // Only one unique product added twice
        const cartQty = await cartPage.getcartItemQuantity();
        expect(cartQty).toBe(2); // Quantity should be 2
        const productNamesInCart = await cartPage.getProductNamesInCart();
        expect(productNamesInCart).toContain('Computing and Internet');
        expect(productNamesInCart.length).toBe(1); // Only one unique product added twice
        await cartPage.agreeToTerms();
        await cartPage.proceedToCheckout();
        // checkout page validations
        expect(basePage.getPageURL()).toContain('/onepagecheckout');
        await checkoutPage.enterBillingAddress("Existuser");
        await checkoutPage.selectshippingAddressOption();
        await checkoutPage.selectShippingMethod("Ground (0.00)");
        await checkoutPage.selectPaymentMethod("Cash On Delivery (COD) (7.00)");
        await checkoutPage.continueFromPaymentInfo();
        await checkoutPage.confirmOrder();
        const orderConfirmationMsg = await checkoutPage.getOrderConfirmationMessage();
        expect(orderConfirmationMsg).toContain('Your order has been successfully processed!');

        
    });


     test('TC3_Purchasing Apparel & Shoes without login User', async ({}) => {
        // Navigate to Apparel & Shoes category
        await topMenuPage.selectMenuItem('apparel-shoes');
        expect(basePage.getPageURL()).toContain('/apparel-shoes');
        const initialCartQty = await homePage.getShoppingCartQty();
        expect(initialCartQty).toBe('(0)');

        // Add product to cart from product listing page
        await productsPage.addToCartFromProductName('Casual Golf Belt');
        const notificationText1 = await homePage.getBarNotificationText();
        expect(notificationText1).toContain('The product has been added to your shopping cart');
        const updatedCartQty1 = await homePage.getShoppingCartQty();
        expect(updatedCartQty1).toBe('(1)');    

        // Navigate to product details page
        await productsPage.clickOnProductByName('Blue Jeans');
        expect(basePage.getPageURL()).toContain('/blue-jeans');
        const isAddToCartVisible = await productsPage.isAddToCartButtonindetailsPageVisible();
        expect(isAddToCartVisible).toBeTruthy();

        // Add product to cart from product details page
        await productsPage.addToCartFromDetailsPage();
        const notificationText2 = await homePage.getBarNotificationText();
        expect(notificationText2).toContain('The product has been added to your shopping cart');
        const updatedCartQty2 = await homePage.getShoppingCartQty();
        expect(updatedCartQty2).toBe('(2)'); 
        
        // go to cart and validate
        await homePage.clickShoppingCart();
        expect(basePage.getPageURL()).toContain('/cart');
        const cartItemCount = await cartPage.getCartItemCount();
        expect(cartItemCount).toBe(2); // Two different products added
        const cartQty = await cartPage.getcartItemQuantity();
        expect(cartQty).toBe(1); // Quantity should be 1 for each product
        const productNamesInCart = await cartPage.getProductNamesInCart();
        expect(productNamesInCart).toContain('Blue Jeans');
        expect(productNamesInCart).toContain('Casual Golf Belt');
        expect(productNamesInCart.length).toBe(2); // Two different products added
        await cartPage.agreeToTerms();
        await cartPage.proceedToCheckout();
        // Redirected to login page since user is not logged in
        expect(basePage.getPageURL()).toContain('/login');
        await loginPage.login(testdata.validuser2.email, testdata.validuser2.password); // Enter a valid email
        expect(basePage.getPageURL()).toContain('/cart');
        await cartPage.agreeToTerms();
        await cartPage.proceedToCheckout();
        expect(basePage.getPageURL()).toContain('/onepagecheckout');
        await checkoutPage.enterBillingAddress("Existuser");
        await checkoutPage.selectshippingAddressOption();
        await checkoutPage.selectShippingMethod("Next Day Air (40.00)");
        await checkoutPage.selectPaymentMethod("Check / Money Order (5.00)");
        await checkoutPage.continueFromPaymentInfo();
        await checkoutPage.confirmOrder();
        const orderConfirmationMsg = await checkoutPage.getOrderConfirmationMessage();
        expect(orderConfirmationMsg).toContain('Your order has been successfully processed!');

     });

     


});