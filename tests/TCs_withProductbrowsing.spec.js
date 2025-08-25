import { test, expect } from '@playwright/test';
import {BasePage} from '../pages/basepage'; 
import {HomePage} from '../pages/homepage';
import {ProductsPage} from '../pages/productspage';
import {TopMenuPage} from '../pages/topmenupage';


test.describe('Product Browsing Tests', () => {
    let basePage, homePage, productsPage, topMenuPage;


    test.beforeEach(async ({ page }) => {
       homePage = new HomePage(page);
       basePage = new BasePage(page);
        productsPage = new ProductsPage(page);
        topMenuPage = new TopMenuPage(page);
        await basePage.goto();
    });

    test('TC1_Verify navigation to all the categories', async ({}) => {
        await topMenuPage.selectMenuItem('Books');
        expect(basePage.getPageURL()).toContain('/books');
        await topMenuPage.selectMenuItem('Computers');
        expect(basePage.getPageURL()).toContain('/computers');
        await topMenuPage.selectMenuItem('Electronics');
        expect(basePage.getPageURL()).toContain('/electronics');
        await topMenuPage.selectMenuItem('Apparel-shoes');
        expect(basePage.getPageURL()).toContain('/apparel-shoes');
        await topMenuPage.selectMenuItem('Digital-downloads');
        expect(basePage.getPageURL()).toContain('/digital-downloads');
        await topMenuPage.selectMenuItem('Jewelry');
        expect(basePage.getPageURL()).toContain('/jewelry');
        await topMenuPage.selectMenuItem('Gift-Cards');
        expect(basePage.getPageURL()).toContain('/gift-cards');
        
    });

    test('TC2_Verify Books category page', async ({page}) => {
        await topMenuPage.selectMenuItem('Books');
        expect(basePage.getPageURL()).toContain('/books');
        const pageTitle = await basePage.getPageTitle();
        expect(pageTitle).toContain('Books');
        const productCount = await productsPage.getProductCount();
        console.log(`Number of products in Books category: ${productCount}`);
        expect(productCount).toBeGreaterThan(0);
        expect (await productsPage.verifysortbyisDisplayed()).toBeTruthy();
        expect (await productsPage.verifyDisplayPerPageIsDisplayed()).toBeTruthy();
        await productsPage.selectSortBy('Price: Low to High');
        await productsPage.waitforallProductstoLoad();
        const sortedProducts = await productsPage.getProductCount();
        console.log(`Number of products after sorting : ${sortedProducts}`);
        expect(sortedProducts).toBe(productCount);
        expect (await productsPage.verifyFilterByPriceIsDisplayed()).toBeTruthy();
        await productsPage.selectPriceRangeByText('25.00 - 50.00');
        const productcountafterFilter = await productsPage.getProductCount();
        console.log(`Number of products after price filter: ${productcountafterFilter}`);
        expect(productcountafterFilter).toBeLessThan(productCount);
        await productsPage.removePriceRangeFilter();
        expect(await productsPage.getProductCount()).toEqual(productCount);
        await productsPage.selectDisplayPerPageOption('8');
        expect(await productsPage.getProductCount()).toBeLessThanOrEqual(8);

    });

    test('TC3_Verify Computers category page', async ({}) => {
        await topMenuPage.selectMenuItem('Computers');
        expect(basePage.getPageURL()).toContain('/computers');
        const pageTitle = await basePage.getPageTitle();
        expect(pageTitle).toContain('Computers');
        const subCategoryCount = await productsPage.getSubCategoryGridItemscount();
        console.log(`Number of Computers category: ${subCategoryCount}`);
        expect(subCategoryCount).toBeGreaterThan(0);
        expect(await productsPage.verifySubCategoryGridContainerisdisplayed()).toBeTruthy();
        expect (await productsPage.verifyFilterByPriceIsDisplayed()).toBeFalsy();
        expect (await productsPage.verifysortbyisDisplayed()).toBeFalsy();
        expect (await productsPage.verifyDisplayPerPageIsDisplayed()).toBeFalsy();

        await topMenuPage.selectMenuItem('Computers','Desktops');
        expect(basePage.getPageURL()).toContain('/desktops');
        const desktopPageTitle = await basePage.getPageTitle();
        expect(desktopPageTitle).toContain('Desktops');
        const desktopProductCount = await productsPage.getProductCount();
        console.log(`Number of products in Desktops category: ${desktopProductCount}`);
        expect(desktopProductCount).toBeGreaterThan(0);
        expect (await productsPage.verifysortbyisDisplayed()).toBeTruthy();
        expect (await productsPage.verifyDisplayPerPageIsDisplayed()).toBeTruthy();
        await productsPage.selectSortBy('Name: A to Z');
        await productsPage.waitforallProductstoLoad();  
        const sortedDesktopProducts = await productsPage.getProductCount();
        console.log(`Number of products after sorting in Desktops: ${sortedDesktopProducts}`);  
        expect(sortedDesktopProducts).toBe(desktopProductCount);
        expect (await productsPage.verifyFilterByPriceIsDisplayed()).toBeTruthy();
        await productsPage.selectPriceRangeByText('Under 1000.00');
        const desktopProductCountAfterFilter = await productsPage.getProductCount();
        console.log(`Number of products after price filter in Desktops: ${desktopProductCountAfterFilter}`);
        expect(desktopProductCountAfterFilter).toBeLessThan(desktopProductCount); 
        await productsPage.removePriceRangeFilter();
        expect(await productsPage.getProductCount()).toEqual(desktopProductCount);
        await productsPage.selectDisplayPerPageOption('4');
        expect(await productsPage.getProductCount()).toBeLessThanOrEqual(4);

    });

    test('TC4_Verify Electronics category page', async ({}) => {
        await topMenuPage.selectMenuItem('Electronics');
        expect(basePage.getPageURL()).toContain('/electronics');
        const pageTitle = await basePage.getPageTitle();
        expect(pageTitle).toContain('Electronics');
        const subCategoryCount = await productsPage.getSubCategoryGridItemscount();
        console.log(`Number of category in Electronics: ${subCategoryCount}`);
        expect(subCategoryCount).toBeGreaterThan(0);
        expect(await productsPage.verifySubCategoryGridContainerisdisplayed()).toBeTruthy();
        expect (await productsPage.verifyFilterByPriceIsDisplayed()).toBeFalsy();
        expect (await productsPage.verifysortbyisDisplayed()).toBeFalsy();
        expect (await productsPage.verifyDisplayPerPageIsDisplayed()).toBeFalsy();

        await topMenuPage.selectMenuItem('Electronics','Cell phones');
        expect(basePage.getPageURL()).toContain('/cell-phones');
        const cellphonePageTitle = await basePage.getPageTitle();
        expect(cellphonePageTitle).toContain('Cell phones');
        const cellphoneProductCount = await productsPage.getProductCount();
        console.log(`Number of products in Cell phone category: ${cellphoneProductCount}`);
        expect(cellphoneProductCount).toBeGreaterThan(0);
        expect (await productsPage.verifysortbyisDisplayed()).toBeTruthy();
        expect (await productsPage.verifyDisplayPerPageIsDisplayed()).toBeTruthy();
        await productsPage.selectSortBy('Price: Low to High');
        await productsPage.waitforallProductstoLoad();  
        const sortedcellphonesProducts = await productsPage.getProductCount();
        console.log(`Number of products after sorting in Desktops: ${sortedcellphonesProducts}`);  
        expect(sortedcellphonesProducts).toBe(cellphoneProductCount);
        expect (await productsPage.verifyFilterByPriceIsDisplayed()).toBeFalsy();
        await productsPage.selectDisplayPerPageOption('12');
        expect(await productsPage.getProductCount()).toBeLessThanOrEqual(12);

    });

    test('TC5_Open each product and verify details in Books', async ({}) => {
        await topMenuPage.selectMenuItem('Books'); 
        expect(basePage.getPageURL()).toContain('/books');
        const productCount = await productsPage.getProductCount();
        console.log(`Number of products in gift cards category: ${productCount}`);
        expect(productCount).toBeGreaterThan(0);
        for(let i=0; i<productCount; i++) {
            const productName = await productsPage.getProductNameByIndex(i);
            console.log(`Verifying product: ${productName}`);
            await productsPage.openProductByIndex(i);
            const detailProductName = await productsPage.getProductTitleOnDetailPage();
            expect(detailProductName).toBe(productName);
            await productsPage.waitforpageLoad();
           // expect(await productsPage.isAddToCartButtonVisible()).toBeTruthy();
            expect(await productsPage.isPriceVisible()).toBeTruthy();
            expect(await productsPage.isProductImageVisible()).toBeTruthy();
            await productsPage.navigateBackToProductsPage();
        } 
        console.log('All products verified successfully.');
    });


});

