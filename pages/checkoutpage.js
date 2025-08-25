import 'dotenv/config'
import { generateRandomName,generaterandomEmail } from '../utils/reusablemethodsforDataGeneration';

class CheckoutPage {
    constructor(page) {
        this.page = page;
        this.pagetitle = page.locator('div.page-title');
        this.selectbillingaddressoption = page.locator('select#billing-address-select');
        this.firstnameinput = page.locator('#BillingNewAddress_FirstName');
        this.lastnameinput = page.locator('#BillingNewAddress_LastName');
        this.emailinput = page.locator('#BillingNewAddress_Email');
        this.countrydropdown = page.locator('#BillingNewAddress_CountryId');
        this.cityinput = page.locator('#BillingNewAddress_City');
        this.address1input = page.locator('#BillingNewAddress_Address1');
        this.zipinput = page.locator('#BillingNewAddress_ZipPostalCode');
        this.phoneinput = page.locator('#BillingNewAddress_PhoneNumber');
        this.billingcontinuebutton = page.locator('//*[@id="billing-buttons-container"]/input');
        this.shippingAddresscontinuebutton = page.locator('//*[@id="shipping-buttons-container"]/input');
        this.shippingmethodcontinuebutton = page.locator('//*[@id="shipping-method-buttons-container"]/input');
        this.paymentmethodcontinuebutton = page.locator('//*[@id="payment-method-buttons-container"]/input');
        this.paymentinfocontinuebutton = page.locator('//*[@id="payment-info-buttons-container"]/input');
        this.confirmorderbutton = page.locator('input.button-1.confirm-order-next-step-button');
        this.orderconfirmationmessage = page.locator('div.title strong');
    }

    async enterBillingAddress(option) {
        // select billing address form and fill details
        const firstname = generateRandomName(5);
        const lastname = generateRandomName(7);
        const email = generaterandomEmail(6);
        const country = process.env.billingcountry;
        const city = process.env.billingcity;
        const address1 = generateRandomName(10);
        const zip = "12345";
        const phone = "1234567890";
        await this.page.waitForLoadState('networkidle');
        if(option == "Existuser"){
            await this.selectbillingaddressoption.selectOption("New Address");
            
        }
            await this.firstnameinput.fill(firstname);
            await this.lastnameinput.fill(lastname);
            await this.emailinput.fill(email);
            await this.countrydropdown.selectOption({ label: country });
            await this.cityinput.fill(city);
            await this.address1input.fill(address1);
            await this.zipinput.fill(zip);
            await this.phoneinput.fill(phone);
         // Select existing address option
        
        await this.billingcontinuebutton.click();
        await this.page.waitForLoadState('networkidle');
    }

    async selectshippingAddressOption() {
       // await this.page.click(`input[id='${option}']`);
        await this.shippingAddresscontinuebutton.click();
        await this.page.waitForLoadState('networkidle');
    }
    
    async selectShippingMethod(option) {
        const optionselect = this.page.getByLabel(option);
        if(!(await optionselect.isChecked())){
            await optionselect.check();
        }
        await this.shippingmethodcontinuebutton.click();
        await this.page.waitForLoadState('networkidle');
    }
    async selectPaymentMethod(option) {
        const optionselect = this.page.getByLabel(option);
        if(!(await optionselect.isChecked())){
            await optionselect.check();
        }
        await this.paymentmethodcontinuebutton.click();
        await this.page.waitForLoadState('networkidle');
    }
    async continueFromPaymentInfo() {
        await this.paymentinfocontinuebutton.click();
        await this.page.waitForLoadState('networkidle');
    }
    async confirmOrder() {
        await this.confirmorderbutton.click();
        await this.page.waitForLoadState('networkidle');
    }
    async getOrderConfirmationMessage() {
        return await this.orderconfirmationmessage.textContent();
    }
     

}

export { CheckoutPage };