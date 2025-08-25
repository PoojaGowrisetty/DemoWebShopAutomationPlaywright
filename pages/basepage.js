class BasePage {
    /**
   * @param {import('@playwright/test').Page} page
   */
    constructor(page) {
        this.page = page;
    }
    async goto(path = '/') {   
        await this.page.goto(path);
    }

    getPageURL() {
        return this.page.url();
    }

    getPageTitle() {
        return this.page.title();}


}
export { BasePage };