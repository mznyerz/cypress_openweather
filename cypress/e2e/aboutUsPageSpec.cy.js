/// <reference types="cypress"/>


import Footer from "../pageObjects/Footer";
import AboutUsPage from "../pageObjects/AboutUsPage";
import SubscriptionsPage from "../pageObjects/SubscriptionsPage";
import MarketplacePage from "../pageObjects/MarketplacePage";
import Header from "../pageObjects/Header.js";
import SignInPage from "../pageObjects/SignInPage.js";

const footer = new Footer();
const aboutUsPage = new AboutUsPage();
const subscriptionsPage = new SubscriptionsPage();
const marketplacePage = new MarketplacePage();
const singInPage = new SignInPage();
const header = new Header();

describe('About Us Page test suite', () => {

    beforeEach(function () {
        cy.fixture('url').then(url  => this.url = url);
        cy.fixture('signInPage').then(signIn  => this.signIn = signIn);
        cy.fixture('aboutUsPage').then(aboutUs => this.aboutUs = aboutUs);
        cy.fixture('titles').then(titles => this.titles = titles);
        cy.visit('/');
    });

    it('About us > Verify "Buy by Subscription" button redirects to subscriptions page', function()  {
        footer.clickAboutUsLink();
        aboutUsPage.clickBuyBySubscriptionButton();
            
        header.clickSignInMenuLink();
        singInPage.signIn(this.signIn.userProfile.email, this.signIn.userProfile.password);
        
        cy.url().should('eql', this.url.subscriptions);
        subscriptionsPage.elements.getOneCallByCallSubscriptionPlan().should('be.visible');  
    });

    it('About us > Verify the button "Buy in the Marketplace" redirects to the Marketplace page', function() {
        footer.clickAboutUsLink();
        aboutUsPage.clickBuyMarketplaceButton();

        cy.url().should('eql', this.url.market);
        marketplacePage.elements.getMarketplacePageTitle().should('be.visible');
    });

    it('About us > Verify "About us" link redirects to the corresponding page', function () {
        footer.clickAboutUsLink();

        cy.url().should('eql', this.url.aboutUs);
        aboutUsPage.elements.getTextAboutUs().should('have.text', this.aboutUs.textInfo);
    });


    it('About us > Verify New and Updates button', function() {
        footer.clickAboutUsLink();
        aboutUsPage.clickNewsAndUpdatesButton();

        cy.url().should('eql', this.url.newsAndUpdates);
        cy.title().should('eql', this.titles.blogTitle);
    });

});