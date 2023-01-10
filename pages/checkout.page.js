'use strict';
const { By, Key, until } = require("selenium-webdriver");

module.exports = class CheckoutPage {
    #driver;

    constructor(webdriver) {
        this.#driver = webdriver;
    }

    getPageHeaderTitle() {
        return this.#driver.findElement(By.css('h1')).getText();
    }
    getPageTitle(){
        return this.#driver.findElement(By.className('col-sm-12')).getText();
    }

    getContinueButton(){
        return this.#driver.findElement(By.className('btn btn-default'));
    }

    async getTotalPrice(){
        const price = this.#driver.findElement(By.className('text-right'));
        const priceNumber = Number((await price.getText()).replace('Total: $', ''));
        return priceNumber;
    }

    getCheckOutButton(){
        return this.#driver.findElement(By.name('checkout'))
        
    }

    getPageHeader() {
        return this.#driver.findElement(By.css('h2')).getText();
    }

    async getChargedPrice(){
        const chargedPrice = this.#driver.findElement(By.css('h3'));
        const chargedPriceNumber = Number((await chargedPrice.getText()).replace('Your credit card has been charged with the amount of $', '')); //  /\D/g
        return chargedPriceNumber;
    }
}