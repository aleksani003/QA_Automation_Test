'use strict';
const { By, Key, until } = require("selenium-webdriver");

module.exports = class HomePage {
    #driver;
    
    

    constructor(webdriver) {
        this.#driver = webdriver;
    }

    goToPage() {
        this.#driver.get("http://test.qa.rs");
    }

    getPageHeaderTitle() {
        return this.#driver.findElement(By.css('h1')).getText();
    }

    getShoppingCart() {
        return this.#driver.findElement(By.linkText('View shopping cart'))
    }

    async clickOnRegisterLink(){
        const registerLink = await this.#driver.findElement(By.linkText('Register'));
        await registerLink.click();
    }

    getSuccessAlert(){
        return this.#driver.findElement(By.className('alert alert-success')).getText();
    }

    getLoginAlert(){
        return this.#driver.findElement(By.css('h2')).getText();
    }

    async orderBurger(){
        const burger = await this.#driver.findElement(By.xpath('//div[@class="panel panel-danger"]'));
        const Oburger = await burger.findElement(By.className('btn btn-success'));
        await Oburger.click();
    }

    async orderDoubleBurger(){
        const doubleBurger = await this.#driver.findElement(By.xpath('//div[@class="panel panel-warning"]'));
        const Odb = doubleBurger.findElement(By.className('btn btn-success'));
        await Odb.click();
    }

    async orderMegaBurger(){
        const megaBurger = await this.#driver.findElement(By.xpath('//div[@class="panel panel-info"]'));
        const Omg = megaBurger.findElement(By.className('btn btn-success'));
        await Omg.click();
    }

    async getBurgerPrice(){
        const pburger = await this.#driver.findElement(By.xpath('//div[@class="panel panel-danger"]'));
        const burgerPrice = pburger.findElement(By.className('panel-footer'));
        const burgerPriceNumber = Number((await burgerPrice.getText()).replace('$', ''));
        return burgerPriceNumber;
    }

    async getDoubleBurgerPrice(){
        const doubleBurger = await this.#driver.findElement(By.xpath('//div[@class="panel panel-warning"]'));
        const doubleBurgerPrice = doubleBurger.findElement(By.className('panel-footer'));
        const doubleBurgerPriceNumber = Number((await doubleBurgerPrice.getText()).replace('$', ''));
        return doubleBurgerPriceNumber;
    }

    async getMegaBurgerPrice(){
        const megaBurger = await this.#driver.findElement(By.xpath('//div[@class="panel panel-info"]'));
        const megaBurgerPrice = megaBurger.findElement(By.className('panel-footer'));
        const megaBurgerPriceNumber = Number((await megaBurgerPrice.getText()).replace('$', ''));
        return megaBurgerPriceNumber;
    }

    getLogoutButton(FName){
        return this.#driver.findElement(By.linkText(`Logout ${FName}`));
    }

}