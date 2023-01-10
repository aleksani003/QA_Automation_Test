"use strict";

require("chromedriver");
const webdriver = require("selenium-webdriver");
const { By, Key, until } = require("selenium-webdriver");
const { assert, expect } = require("chai");
const HomePage = require("../pages/home.page");
const RegisterPage = require("../pages/register.page");
const LoginPage = require("../pages/login.page");
const CheckoutPage = require("../pages/checkout.page");

describe('demoqa tests', function() {
    let driver;
    let pageHomepage;
    let pageRegister;
    let pageLogin;
    let pageCheckout;
    const FirstName = "Ronny"

    before(function() {
        driver = new webdriver.Builder().forBrowser("chrome").build();
        pageHomepage = new HomePage(driver);
        pageRegister = new RegisterPage(driver);
        pageLogin = new LoginPage(driver);
        pageCheckout = new CheckoutPage(driver);
    });

    after(async function() {
        await driver.quit();
        
    });
    


    it("Verify QA FastFood homepage is open", async function(){
        await pageHomepage.goToPage();
        const pageTitle = await pageHomepage.getPageHeaderTitle();
        expect(pageTitle).to.contain("QA FastFood");
    });

    it("Goes to registration page", async function(){
        await pageHomepage.clickOnRegisterLink();

        expect(await pageRegister.getRegisterButtonValue()).to.contain('Register');
    });

    it("Registers", async function(){
        await pageRegister.getFirstNameInput().sendKeys(FirstName);
        await pageRegister.getLastNameInput().sendKeys('Coronis');
        await pageRegister.getEmailInput().sendKeys('ronny.coronis@example.local');
        await pageRegister.getUsernameInput().sendKeys('ronnycoronis');
        await pageRegister.getPasswordInput().sendKeys('nesta123');
        await pageRegister.getConfirmPasswordInput().sendKeys('nesta123');

        await pageRegister.getRegisterButton().click();

        expect(await pageHomepage.getSuccessAlert()).to.contain('You have successfully registered new user');
    });

    it("Logins", async function(){
        await pageRegister.getLoginButton().click();
        
        await pageLogin.getUsernameInput().sendKeys('ronnycoronis');
        await pageLogin.getPasswordInput().sendKeys('nesta123');

        await pageLogin.getLoginButton().click();

        expect(await pageHomepage.getLoginAlert()).to.contain('Welcome back,');
    })

    it("Orders Burger, Double Burger, Mega Burger", async function(){
        await pageHomepage.orderBurger();
        await pageCheckout.getContinueButton().click();
        await pageHomepage.orderDoubleBurger();
        await pageCheckout.getContinueButton().click();
        await pageHomepage.orderMegaBurger();
    })

    it("Checks total price, and checkouts", async function(){
        await pageCheckout.getContinueButton().click();
        const priceBurger = await pageHomepage.getBurgerPrice();
        const priceDoubleBurger = await pageHomepage.getDoubleBurgerPrice();
        const priceMegaBurger = await pageHomepage.getMegaBurgerPrice();
        const expectedtotal = await (priceBurger + priceDoubleBurger + priceMegaBurger);

        await pageHomepage.getShoppingCart().click();

        const priceTotal = await pageCheckout.getTotalPrice();
        expect(expectedtotal).to.be.eq(priceTotal);

        await pageCheckout.getCheckOutButton().click();
        expect(await pageCheckout.getPageHeader()).to.contain('You have successfully placed your order.');
        const priceCharged = await pageCheckout.getChargedPrice();
        expect(expectedtotal).to.be.eq(priceCharged);

    })
    it("logouts", async function(){
        await pageHomepage.getLogoutButton(FirstName).click();
        
        const pageTitle = await pageHomepage.getPageHeaderTitle();
        expect(pageTitle).to.contain("QA FastFood");
        
    })
});