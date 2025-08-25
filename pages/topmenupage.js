
class TopMenuPage {
    constructor(page) {
        this.page = page;

    }

    menuItem(name) {
    return this.page.locator("ul.top-menu a[href='/" + name.toLowerCase() + "']"); // Dynamic locator for menu items
   
  }
  
   async selectMenuItem(name,subMenuItem = null) {
    await this.menuItem(name).click();
    if (subMenuItem){
        const subMenu = this.page.getByRole('link', { name: subMenuItem.toLowerCase() }).first()
        await subMenu.click();
    }
  }
}

export { TopMenuPage };
