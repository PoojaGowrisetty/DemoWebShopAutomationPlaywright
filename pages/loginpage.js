import { BasePage } from "./basepage";  

class LoginPage extends BasePage {
    constructor(page) {  
            super(page);
     
     this.emailInput = page.locator('input#Email');
     this.passwordInput = page.locator('input#Password');
     this.loginButton =  page.locator('input.button-1.login-button');
     this.errorMessage = page.locator('div.validation-summary-errors>span');
     this.logoutLink = page.locator('a.ico-logout');
    }
    
      async open() { 
          await this.goto('/login'); }
    
     async enterEmail(email) {
          await this.emailInput.fill(email);
     }
    
     async enterPassword(password) {
          await this.passwordInput.fill(password);
     }
    
     async clickLogin() {
          await this.loginButton.click();
     }
    
     async getErrorMessage() {
          return await this.errorMessage.textContent();
     }

    async login(email, password) {
       await this.enterEmail(email);
        await this.enterPassword(password);
        await this.clickLogin();
    }

    async isLoggedIn() {
    return this.logoutLink.isVisible();
  }

}
export { LoginPage };