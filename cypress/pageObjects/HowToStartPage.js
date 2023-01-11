class HowToStartPage {
    elements = {
        getWhyOurFreeWeatherAPILink: () => cy.get('#start a[href="/technology"]'),
    };

    clickWhyOurFreeWeatherAPILink() {
        this.elements.getWhyOurFreeWeatherAPILink().click();
    };

};
export default HowToStartPage;