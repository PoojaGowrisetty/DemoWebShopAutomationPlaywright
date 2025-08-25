import { BasePage } from "./basepage";

class ProductsPage extends BasePage {
    constructor(page) {
        super(page);
        
        this.pagetitle = page.locator('div.page-title');
        this.productsortby = page.locator('div.product-sorting');
        this.selectsortby  = page.locator('select#products-orderby');
        this.displayperpage = page.locator('div.product-page-size');
        this.selectdisplaypageoptions = page.locator('select#products-pagesize');
        this.filterByPrice = page.locator('div.product-filters.price-range-filter');
        this.productgrid = page.locator('//div[@class = "product-grid"]/div');
        this.addtoCartButtonOnDetailpage = page.locator('//div[@class = "add-to-cart-panel"]/input[@value="Add to cart"]');
        this.removepricerangefilterlink = page.locator('a.remove-price-range-filter');
        this.productgridcontainer = page.locator('div.product-grid');
        this.subcatergorygridcontainer = page.locator('div.sub-category-grid');
        this.subcatergorygridItems = page.locator('//div[@class = "sub-category-grid"]/div')
        this.productTitleOnDetailPage = page.locator('div.product-name h1');
        this.productpriceonDetailPage = page.locator('div.product-price');
        this.productImageonDetailPage = page.locator('div.gallery img');
        this.addtoCartButton = 'input[value="Add to cart"]';

    }

    async verifysortbyisDisplayed() {
        return await this.productsortby.isVisible();
    }

    async verifyDisplayPerPageIsDisplayed() {
        return await this.displayperpage.isVisible();
    }
    
    async verifyFilterByPriceIsDisplayed() {
        return await this.filterByPrice.isVisible();}


    async selectSortBy(option) {
        await this.selectsortby.selectOption( option);
    }

    async selectDisplayPerPageOption(option) {
        await this.selectdisplaypageoptions.selectOption(option);
    }

    async getFilterByPrice() {
        return await this.filterByPrice.textContent();
    }

    async productGridIsDisplayed() {
        return await this.productgrid.isVisible();
    }

    async waitforallProductstoLoad() {
        await this.productgridcontainer.waitFor({ state: 'visible'});
    }
    async getProductCount() {
        const products = await this.productgrid.all();
        return products.length;
    }
     
    async selectPriceRangeByText(priceText) {
    await this.page.click(`text=${priceText}`);
    }

   async clickOnProductByName(productName) {
        const productLink = this.page.locator(`//div[@class='product-item']//a[(text()= '${productName}')]`);       
        await productLink.click();
    }    

    async addToCartFromProductName(productName) {
        const addToCartButton = this.page.locator(`//a[contains(text(), '${productName}')]/ancestor::div[@class='product-item']//input[@value='Add to cart']`);
        await addToCartButton.click();
    }


    async removePriceRangeFilter() {
        await this.removepricerangefilterlink.click();
    }

    async getSubCategoryGridItemscount() {
        return this.subcatergorygridItems.count();
    }

    async verifySubCategoryGridContainerisdisplayed() {
        return await this.subcatergorygridcontainer.isVisible();
    }

    async getProductNameByIndex(index) {
        const product = this.productgrid.nth(index);
        const title =  await product.locator('h2.product-title').textContent();
        return title.trim();
    }

    async openProductByIndex(index) {
        const product = this.productgrid.nth(index);
        await product.locator('h2.product-title a').click();
    }

    async getProductTitleOnDetailPage() {
        const producttitle =  await this.productTitleOnDetailPage.textContent();
        return producttitle.trim();
    }

    async isAddToCartButtonindetailsPageVisible() {
    try {
        await this.addtoCartButtonOnDetailpage.waitFor({ state: 'visible', timeout: 5000 });
        return await this.addtoCartButtonOnDetailpage.isVisible();
    } catch (error) {
        console.log('Add to Cart button not visible within timeout:', error.message);
        return false;
    }
    }

    async addToCartFromDetailsPage() {
        return this.addtoCartButtonOnDetailpage.click();
    }
    async isPriceVisible() {
        return await this.productpriceonDetailPage.isVisible();
    }   

    async isProductImageVisible() {
        return await this.productImageonDetailPage.isVisible();
    }

    async navigateBackToProductsPage() {
        await this.page.goBack();
    }

    async waitforpageLoad() {
        await this.page.waitForLoadState('load');
    }

}




export { ProductsPage };