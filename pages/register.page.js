'use strict';
const { By, Key, until } = require("selenium-webdriver");

module.exports = class RegisterPage {
    #driver;

    constructor(webdriver) {
        this.#driver = webdriver;
    }

    getRegisterButton(){
        return this.#driver.findElement(By.name('register'));
    }

    getRegisterButtonValue(){
        return this.getRegisterButton().getAttribute('value');
    }

    getFirstNameInput(){
        return this.#driver.findElement(By.name('firstname'));
    }

    getLastNameInput(){
        return this.#driver.findElement(By.name('lastname'));       
    }

    getEmailInput(){
        return this.#driver.findElement(By.name('email'));
    }

    getUsernameInput(){
        return this.#driver.findElement(By.name('username'));
    }
    
    getPasswordInput(){
        return this.#driver.findElement(By.id('password'));
    }

    getConfirmPasswordInput(){
        return this.#driver.findElement(By.id('passwordAgain'));
    }

    getLoginButton(){
        return this.#driver.findElement(By.linkText('Login'));
    }
}