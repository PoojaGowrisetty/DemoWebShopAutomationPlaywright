class Cartpage {
    constructor(page) {
        this.page = page;
        this.cartItemRows = page.locator('.cart-item-row');
        this.cartItemName = page.locator('a.product-name');
        this.cartItemQuantityInput = page.locator('.qty-input');
        this.cartItemPrice = page.locator('.product-unit-price');
        this.cartItemTotal = page.locator('.product-subtotal');
        this.updateCartButton = page.locator('input[name="updatecart"]');
        this.termsOfServiceCheckbox = page.locator('#termsofservice');
        this.checkoutButton = page.locator('#checkout');
        this.cartEmptyMessage = page.locator('.order-summary-content .no-data');
    }

    async getCartItemCount() {
        return await this.cartItemRows.count();
    }

    async getProductNamesInCart() {
        const names = [];
        const count = await this.getCartItemCount();
        for (let i = 0; i < count; i++) {
            names.push(await this.cartItemName.nth(i).textContent());
        }
        return names;
    }   

    async getCartItemDetails(index) {
        const name = await this.cartItemName.nth(index).textContent();
        const quantity = await this.cartItemQuantityInput.nth(index).inputValue();
        const price = await this.cartItemPrice.nth(index).textContent();
        const total = await this.cartItemTotal.nth(index).textContent();
        return { name, quantity, price, total };
    }

    async updateCartItemQuantity(index, quantity) {
        await this.cartItemQuantityInput.nth(index).fill(quantity.toString());
        await this.updateCartButton.click();
    }

    async agreeToTerms() {
        if (!await this.termsOfServiceCheckbox.isChecked()) {
            await this.termsOfServiceCheckbox.check();
        }
    }

    async proceedToCheckout() {
        await this.checkoutButton.click();
    }

    async isCartEmpty() {
        return await this.cartEmptyMessage.isVisible();
    }

    async getcartItemQuantity() {
        const qty = await this.cartItemQuantityInput.first().inputValue();
        return parseInt(qty, 10);
    }
}

export { Cartpage };