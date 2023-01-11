/// <reference types="cypress"/>


import FAQPage from "../pageObjects/FAQPage.js";
import Header from "../pageObjects/Header.js";

const header = new Header();
const faqPage = new FAQPage();

describe('faqPageSpec', () => {

    beforeEach(function () {
        cy.fixture('faqPage').then(data => this.data = data);
        cy.visit('/');
    });

    it('Support > FAQ page > Verify the question "How to get an API key" is opened and visible', function () {
        header.clickSupportDropDownMenu();
        header.clickFAQMenuLink();

        faqPage.clickHowToGetAnApiKeyQuestion();
        faqPage.elements.getHowToGetAnApiKeyQuestionAfterClicking().should('be.visible');
        faqPage.elements.getHowToGetAnApiKeyQuestionContent()
            .should('be.visible')
            .and('include.text', this.data.HowToGetAnApiKeyQuestionContent);
    });

    it('Support > FAQ page > Verify text of the questions and the style by clicking on the plus sign next to the question', function () {
        header.clickSupportDropDownMenu();
        header.clickFAQMenuLink();

        faqPage.elements.getQuestionsElement().each(($el, index) => {
            cy.wrap($el)
                .should('not.have.css', 'font-weight', this.data.QuestionsElementFont)
                .click({ force: true })
                .should('have.css', 'font-weight', this.data.QuestionsElementFont)
                .and('have.text', this.data.faqQuestions[index]);
        });
    });
    
});