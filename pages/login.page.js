'use strict';
const { By, Key, until } = require("selenium-webdriver");

module.exports = class LoginPage {
    #driver;

    constructor(webdriver) {
        this.#driver = webdriver;
    }

    getHeaderTitle(){
        return this.#driver.findElement(By.className('form-signin-heading')).getText();
    }

    getUsernameInput(){
        return this.#driver.findElement(By.name('username'));
    }

    getPasswordInput(){
        return this.#driver.findElement(By.name('password'));
    }

    getLoginButton(){
        return this.#driver.findElement(By.name('login'));
    }
}