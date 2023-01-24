
class MainPage {
    elements = {
        getSearchInput: () => cy.get('input[placeholder = "Search city"]'),
        getSearchBtn: () => cy.get('.search-block button'),
        getPageDescriptionWhiteText: () => cy.get('h2 .white-text'),
        getForecastDays: () => cy.get('.day-list li'),
        getSearchResultsDropdown: () => cy.get('ul.search-dropdown-menu li'),
        getCopyrightMapLink: () => cy.get('a[href*="copyright"]'),
        getSolarRadiationLink: () => cy.get('a[href="/api/solar-radiation'),
        getToggleTempretureDefault: () => cy.get('.switch-container :nth-child(3)'), // imperial
        getToggleTempreture: () => cy.get('.switch-container :nth-of-type(2)'), // Metric
        getDateCurrentContainer: () => cy.get('.current-container .orange-text'),
        getDailyDetailContainerWeather: () => cy.get('.daily-detail-container'),
        getIconToDetailedWeather: () => cy.get('[fill="#48484A"]'),
        getTimeOfDayInDetailedWeather: () => this.elements.getDailyDetailContainerWeather().find('tr').eq(0).find('th'),
        getTemperatureHeading: () => cy.get('div.current-temp .heading'),
        getConvertTempCelsius: () => cy.get('#selected').filter(':not(".slideLeft")'),
        getConvertTempFahrenheit: () => cy.get('#selected').filter(':not(".slideRight")'),
        getSwitchTemperature: () => cy.get('#selected[style*="72"]'),
    };

    clickSearchBtn() {
        this.elements.getSearchBtn().click({ force: true });
    };

    setSearchInputText(inputText) {
        this.elements
            .getSearchInput()
            .clear({ force: true })
            .type(inputText, { force: true });
    };

    clickSolarRadiationLink() {
        this.elements.getSolarRadiationLink().click({ force: true });
    };

    clickToggleTempretureDefault() {
        this.elements.getToggleTempretureDefault().click();
    };

    clickToggleTempreture() {
        this.elements.getToggleTempreture().click();
    };

    getTodaysDate() {
        let currentDate = new Date();
        return `${currentDate.toLocaleString('en-GB', { timeZone: 'Europe/London', month: 'short' })} ${currentDate.toLocaleString('en-GB', { timeZone: 'Europe/London', day: 'numeric' })}`;
    };

    checkDatesForecast() {
        for (let i = 0; i <= 7; i++) {
            let date = new Date()
            date.setDate(date.getDate() + i);
            let dateResult = `${date.toLocaleString('en-GB', { timeZone: 'Europe/London', month: 'short' })} ${date.toLocaleString('en-GB', { timeZone: 'Europe/London', day: '2-digit' })}`;
            this.elements.getForecastDays().eq(i).find('span').eq(0).invoke('text').should('include', dateResult);
        };
    };

    clickCopyrightMapLink() {
        this.elements.getCopyrightMapLink().invoke('removeAttr', 'target').click({ force: true });
    };

    checkSwitchTemperature() {
        this.elements.getSwitchTemperature().should('not.exist');
        this.clickToggleTempretureDefault();
        this.elements.getSwitchTemperature().should('exist');
    };

};
export default MainPage;