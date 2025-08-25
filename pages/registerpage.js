import { generateRandomName,generaterandomEmail } from '../utils/reusablemethodsforDataGeneration';
import 'dotenv/config'
class RegisterPage {
    constructor(page) {
        this.page = page;
        
        this.firstnameinput = page.locator('#FirstName');
        this.lastnameinput = page.locator('#LastName');
        this.emailinput = page.locator('#Email');
        this.passwordinput = page.locator('#Password');
        this.confirmpasswordinput = page.locator('#ConfirmPassword');
        this.registerbutton = page.locator('#register-button');
        this.registrationconfirmationmessage = page.locator('div.result');
        this.continuebutton = page.locator('.button-1.register-continue-button');
        
    }
   
    
    async registerNewUser(option) {
        const firstname = generateRandomName(5);
        const lastname = generateRandomName(7);
        const email = generaterandomEmail(6);
        const password = process.env.registerPassword;
        await this.page.getByRole('radio', { name: `${option}`, exact: true }).check();
        await this.firstnameinput.fill(firstname);
        await this.lastnameinput.fill(lastname);
        await this.emailinput.fill(email);
        await this.passwordinput.fill(password);
        await this.confirmpasswordinput.fill(password);
        await this.registerbutton.click();
        console.log(`Registered new user with details: First Name - ${firstname}, Last Name - ${lastname}, Email - ${email}`);
    } 
    
    async getRegistrationSuccessMessage() {
        return await this.registrationconfirmationmessage.textContent();
    }

    async clickContinueAfterRegistration() {
        await this.continuebutton.click();
    }

}
export { RegisterPage };