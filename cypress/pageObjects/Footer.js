class Footer {
    elements = {
        getWebsiteTermsAndConditionsLink: () => cy.get('[href$="use.pdf"]'),
        getTermsAndConditionsOfSaleLink: () => cy.get('[href*="conditions_of_sale"]'),
        getLinksInFooter: () => cy.get('.inner-footer-container .footer-section a'),
        getTwoDownloadLinks: () => cy.get('.my-5 a[target]'),
        getAppStoreLink: () => cy.get('.my-5 a[href*=apple]'),
        getGooglePlayLink: () => cy.get('.my-5 a[href*=google]'),
        getAboutUsLink: () => cy.get('a[href*="/about-us"]'),
        getSocialMediaIconLinks: () => cy.get('.social a'),
    };

    clickOnTermsAndConditionsOfSaleLink() {
        this.elements.getTermsAndConditionsOfSaleLink().invoke('removeAttr', 'target').click({ force: true });
    };

    clickAppStoreLink() {
        this.elements.getAppStoreLink().invoke('removeAttr', 'target').click({ force: true });
    };

    clickGooglePlayLink() {
        this.elements.getGooglePlayLink().invoke('removeAttr', 'target').click({ force: true });
    };

    clickWebsiteTermsAndConditionsLink() {
        this.elements.getWebsiteTermsAndConditionsLink().invoke('removeAttr', 'target').click();
    };

    clickAboutUsLink() {
        this.elements.getAboutUsLink().click({ force: true });
    };
 
};
export default Footer;