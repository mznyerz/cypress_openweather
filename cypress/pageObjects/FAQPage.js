class FAQPage {
    elements = {
        getHowToGetAnApiKeyQuestion: () => cy.get('#how-to-get-an-API-key .question-heading'),
        getHowToGetAnApiKeyQuestionAfterClicking: () => cy.get('#how-to-get-an-API-key .question.visible'),
        getHowToGetAnApiKeyQuestionContent: () => cy.get('#how-to-get-an-API-key .question-content'),
        getQuestionsElement: () => cy.get('div.row .question-heading'),
    };

    clickHowToGetAnApiKeyQuestion() {
        this.elements.getHowToGetAnApiKeyQuestion().click({ force: true });
    };

};
export default FAQPage;