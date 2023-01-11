/// <reference types="cypress" />


import Header from "../pageObjects/Header.js";
import HowToStartPage from "../pageObjects/HowToStartPage.js";
import TopicPage from "../pageObjects/TopicPage.js";

const header = new Header();
const howToStartPage = new HowToStartPage();
const topicPage = new TopicPage();

describe('How to start', () => {

    beforeEach(function () {
        cy.fixture('titles').then(titles => this.titles = titles);
        cy.fixture('url').then(url => this.url = url);
        cy.visit('/');
    });

    it('Support > How to start > Verify the newly opened page title is Technology', function () {
        header.clickSupportDropDownMenu();
        header.clickSupportHowToStartLink();
        howToStartPage.clickWhyOurFreeWeatherAPILink();

        cy.url().should('eql', this.url.technology);
        topicPage.elements.getPageTitle().should('have.text', this.titles.technologyTitle);
    });

});

