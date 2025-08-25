import { BasePage } from "./basepage";  

class HomePage extends BasePage {
   constructor(page) {  
         super(page);
    

    this.registerlink = page.locator('a[href="/register"]');
    this.loginlink = page.locator('a.ico-login');
    this.logoutlink = page.locator('a.ico-logout');
    this.shoppingcartlink = page.locator('#topcartlink a.ico-cart');
    this.wishlistlink = page.locator('a.ico-wishlist');
    this.shoppingcartqty = page.locator('span.cart-qty');
    this.wishlistqty = page.locator('span.wishlist-qty');
    this.searchbox = page.locator('input#small-searchterms');
    this.searchbutton = page.locator('button.button-1.search-box-button');
    this.products = page.locator('//div[@class="product-item"]');
    this.barNotification = page.locator('#bar-notification');
    
   }
   
     async open() { 
        await this.goto('/'); }

    async clickRegister() {
        await this.registerlink.click();
    }

    async clickLogin() {
        await this.loginlink.click();
    }   

    async clickShoppingCart() {
        await this.shoppingcartlink.click();
    }

    async clickWishlist() {
        await this.wishlistlink.click();
    }

    async getShoppingCartQty() {
        await this.page.waitForLoadState('networkidle');
        await this.page.waitForTimeout(1000); // Wait for 1 second to ensure the cart quantity is updated
        return await this.shoppingcartqty.textContent();
    }
    async getWishlistQty() {
        return await this.page.textContent(this.wishlistqty);
    }

    async clickLogout() {
        await this.logoutlink.click();
    }

    async searchForProduct(productName) {
        await this.searchbox.fill(productName);
        await this.searchbutton.click();
    }
    
    async addToCartFromHomePageByIndex(index) {
        const product = this.products.nth(index);
        await product.locator('input[value="Add to cart"]').click();
    }

    async getBarNotificationText() {
        await this.barNotification.waitFor({ state: 'visible' });
        return await this.barNotification.textContent();
    }
    async verifyUserLoggedIn() {
        return await this.logoutlink.isVisible();
    }

}

export { HomePage };
