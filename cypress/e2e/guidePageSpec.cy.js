/// <reference types="cypress" />


import GuidePage from "../pageObjects/GuidePage.js";
import Header from "../pageObjects/Header.js";
import PricingPage from "../pageObjects/PricingPage.js";
import ApiPage from "../pageObjects/ApiPage.js";

const guidePage = new GuidePage();
const header = new Header();
const pricingPage = new PricingPage();
const apiPage = new ApiPage();

describe('Guide page test suite', () => {
    beforeEach(function () {
        cy.fixture('url').then(url => this.url = url);
        cy.fixture('guidePage').then(data => this.data = data);
        cy.fixture('pricingPage').then(pricingPage => this.pricing = pricingPage);
        cy.fixture('apiPage').then(apiPage => this.apiPage = apiPage);
        cy.visit('/');
    });

    it('Main menu > Guide > Verify the user is redirected to new url', function () {
        header.clickGuideMenuLink();

        cy.url().should('eql', this.url.guide);
        guidePage.elements.getPageDescription().should('have.text', this.data.pageDescriptionText);
    });

    it('Main menu > Guide > Verify the button "Subscribe to One Call by Call" is clickable and user be redirected new url', function () {
        header.clickGuideMenuLink();
        guidePage.clickSubscribeButton();

        cy.url().should('eql', this.url.pricing);
        pricingPage.elements.getPricingTitle().should('have.text', this.pricing.pageDescriptionTitle);
    });

    it('Main menu > Guide > Verify the first button "Learn more" is clickable and user will be redirected new url', function () {
        header.clickGuideMenuLink();
        guidePage.clickFirstLearnMoreButton();

        cy.url().should('eql', this.url.apiCurrent);
        apiPage.elements.getWeatherApiTitle().should('have.text', this.apiPage.headLineText);
    });

    it('Main menu > Guide > Verify subheaders are displayed on the page', function () {
        header.clickGuideMenuLink();

        guidePage.elements.getSubH2().each(($el, i) => {
            expect($el.text().trim()).to.eql(this.data.headers2[i]);
        });

        guidePage.elements.getSubH4().each(($el, i) => {
            expect($el.text().trim()).to.eql(this.data.headers4[i]);
        });
    });

});