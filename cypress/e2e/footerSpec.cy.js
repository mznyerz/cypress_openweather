/// <reference types="cypress" />


import Footer from "../pageObjects/Footer.js";
const { socialRedirects, linksInFooterSection } = require('../fixtures/footersData.js');

const footer = new Footer();
let socialMediaIconsUrls;
let innerTextsInFooterSection;

describe('Footer test suite', function () {

    before(function () {
        cy.visit('/');
        footer.elements.getSocialMediaIconLinks().then(data => {
            socialMediaIconsUrls = data.toArray().map(el => el.href);
        });
        footer.elements.getLinksInFooter().then(d => {
            innerTextsInFooterSection = d.toArray().map(el => el.innerText);
        });
    });

    beforeEach(function () {
        cy.fixture('footer').then(data => this.data = data);
        cy.fixture('url').then(url => this.url = url);
        cy.visit('/');
    });

    it('Footer > Verification of displayed six Social Media icons', function () {
        footer.elements.getSocialMediaIconLinks().should('have.length', this.data.countSocialLinks).and('be.visible');
    });
    
    Object.keys(socialRedirects).forEach(el => {
        it(`Footer > Verification  '${el}' Social Media icon correct redirect`, () => {
            let index = socialMediaIconsUrls.findIndex(item => item.includes(el));

            footer.elements.getSocialMediaIconLinks().eq(index).should('have.attr', 'href', socialRedirects[el]);
        });
    });

    Object.keys(linksInFooterSection).forEach(el => {
        it(`Footer > Verification  '${el}' in footer section are clickable and correct redirect`, () => {
            let index = innerTextsInFooterSection.findIndex(item => item === el);
            footer.elements.getLinksInFooter().eq(index).invoke('removeAttr', 'target').click();
            
            cy.url().should('eql', linksInFooterSection[el]);
        });
    });

    it('Footer > After clicking on the "Website terms and conditions" in the footer the expected page is opened', function () {
        footer.clickWebsiteTermsAndConditionsLink();

        cy.url().should('eql', this.url.termsAndConditionsOfSale);
    });


    it('Footer > Download OpenWeather App > Verify two download icons are visible', function () {
        footer.elements.getTwoDownloadLinks().should('be.visible');
    });


    it("Footer > Download OpenWeather App > Download on the App Store' button link", function () {
        footer.clickAppStoreLink();
        cy.url().should('eq', this.data.DownloadAppURL.AppStoreURL);
    });

    it("Footer > Download OpenWeather App > Download on the Google play' button link", function () {
        footer.clickGooglePlayLink();
        cy.url().should('eq', this.data.DownloadAppURL.GooglePlayURL);
    });

});

