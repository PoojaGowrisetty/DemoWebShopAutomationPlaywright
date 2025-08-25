import { test, expect } from '@playwright/test';
import {BasePage} from '../pages/basepage'; 
import {HomePage} from '../pages/homepage';
import {ProductsPage} from '../pages/productspage';
import {TopMenuPage} from '../pages/topmenupage';


test.describe('Add to Cart Functionality Tests', () => {
    let basePage, homePage, productsPage, topMenuPage;


    test.beforeEach(async ({ page }) => {
       homePage = new HomePage(page);
       basePage = new BasePage(page);
        productsPage = new ProductsPage(page);
        topMenuPage = new TopMenuPage(page);
        await basePage.goto();
    });

    test('TC1_Add to Cart from Home Page', async ({}) => {
        const productIndex = 1; // Index of the product to add to cart
        await homePage.addToCartFromHomePageByIndex(productIndex);
        const notificationText = await homePage.getBarNotificationText();
        expect(notificationText).toContain('The product has been added to your shopping cart');
        const cartQty = await homePage.getShoppingCartQty();
        expect(cartQty).toBe('(1)');    
        
    });

    test('TC2_Add to cart from products listing page', async ({}) => {
        await topMenuPage.selectMenuItem('Books');
        expect(basePage.getPageURL()).toContain('/books');
        const initialCartQty = await homePage.getShoppingCartQty();
        expect(initialCartQty).toBe('(0)');
        await productsPage.addToCartFromProductName('Computing and Internet');
        const notificationText = await homePage.getBarNotificationText();
        expect(notificationText).toContain('The product has been added to your shopping cart');
        const updatedCartQty = await homePage.getShoppingCartQty();
        expect(updatedCartQty).toBe('(1)');    
        
    });

    test('TC3_Add to cart from product details page', async ({}) => {
        await topMenuPage.selectMenuItem('Books');
        expect(basePage.getPageURL()).toContain('/books');
        const initialCartQty = await homePage.getShoppingCartQty();
        expect(initialCartQty).toBe('(0)');
        await productsPage.clickOnProductByName('Computing and Internet');
        expect(basePage.getPageURL()).toContain('/computing-and-internet');
        const isAddToCartVisible = await productsPage.isAddToCartButtonindetailsPageVisible();
        expect(isAddToCartVisible).toBeTruthy();
        await productsPage.addToCartFromDetailsPage();
        const notificationText = await homePage.getBarNotificationText();
        expect(notificationText).toContain('The product has been added to your shopping cart');
        const updatedCartQty = await homePage.getShoppingCartQty();
        expect(updatedCartQty).toBe('(1)');    
        
    });

    test('TC4_adding multiple products to cart', async ({}) => {
        await topMenuPage.selectMenuItem('Books');
        expect(basePage.getPageURL()).toContain('/books');
        const initialCartQty = await homePage.getShoppingCartQty();
        expect(initialCartQty).toBe('(0)');
        await productsPage.addToCartFromProductName('Computing and Internet');
        let notificationText = await homePage.getBarNotificationText();
        expect(notificationText).toContain('The product has been added to your shopping cart');
        let updatedCartQty = await homePage.getShoppingCartQty();
        expect(updatedCartQty).toBe('(1)');    
        await productsPage.addToCartFromProductName('Fiction');
        await productsPage.waitforpageLoad();
        notificationText = await homePage.getBarNotificationText();
        expect(notificationText).toContain('The product has been added to your shopping cart');
        updatedCartQty = await homePage.getShoppingCartQty();
        expect(updatedCartQty).toBe('(2)');    
        
    });

});