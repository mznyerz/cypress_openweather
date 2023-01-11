class AboutUsPage {
    elements = {
        getBuyBySubscriptionButton: () => cy.get('a[href="https://home.openweathermap.org/subscriptions"]'),
        getBuyMarketplaceButton: () => cy.get('div.grid-container a[href$="/marketplace"]'),
        getNewsAndUpdatesButton: () => cy.get('a.round[href*="blog"]'),
        getTextAboutUs: () => cy.get('.section-content .mobile-padding h2'),
    };

    clickBuyBySubscriptionButton() {
        this.elements.getBuyBySubscriptionButton().click();
    };

    clickBuyMarketplaceButton() {
        this.elements.getBuyMarketplaceButton().click();
    };

    clickNewsAndUpdatesButton() {
        this.elements.getNewsAndUpdatesButton().invoke('removeAttr', 'target').click();
    };

};
export default AboutUsPage;