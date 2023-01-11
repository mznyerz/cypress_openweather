/// <reference types="cypress"/>


import MainPage from "../pageObjects/MainPage.js";
import SolarRadiationPage from "../pageObjects/SolarRadiationPage.js";

const mainPage = new MainPage();
const solarRadiationPage = new SolarRadiationPage();

describe('mainPageSpec', () => {

    beforeEach(function () {
        cy.fixture('mainPage').then(data => this.data = data);
        cy.fixture('url').then(url => this.url = url);
        cy.fixture('titles').then(titles => this.titles = titles);
        cy.fixture('solarRadiationPage').then(solarRadiationPage => this.solarRadiationPage = solarRadiationPage);
        cy.visit('/');
    });

    it('Main page > Section with 8-day forecast > Verify correct dates in weather forecast for 8 days', function () {
        mainPage.checkDatesForecast();
    });

    it('Main page > Verify correct current date', function () {
        let currentDate = mainPage.getTodaysDate();

        mainPage.elements.getDateCurrentContainer().then($containerDate => {
            let dateInConteiner = $containerDate.text().split(',')[0]

            expect(currentDate).to.eql(dateInConteiner);
        });
    });

    it('Main page > Section with 8-day forecast > Detailed weather for each of these days is displayed', function () {
        mainPage.elements.getIconToDetailedWeather().each(($el, i) => {
            cy.wrap($el).click({ force: true });

            mainPage.elements.getDailyDetailContainerWeather().should('be.visible');
            mainPage.elements.getTimeOfDayInDetailedWeather().then(detailed => {
                let detailedInfo = detailed.toArray().map(el => el.innerText).filter(el => el.length);

                cy.wrap(detailedInfo).should('deep.equal', this.data.weatherDetails);
            });
        });
    });

    it('Main page > Section with search > Search City > On clicking the Search button, Dropdown menu with relevant options appears', function () {
        mainPage.elements.getSearchResultsDropdown().should('not.exist');

        mainPage.setSearchInputText(this.data.searchInputText.cityName);
        mainPage.clickSearchBtn();
        mainPage.elements
            .getSearchResultsDropdown()
            .should('exist')
            .each($el => {
                cy.wrap($el).should('include.text', this.data.searchInputText.cityName);
            });
    });

    it('Main page > Verify the converted temperature °C to °F is correct', function () {
        let correctTempF;
        cy.intercept('onecall?*imperial*').as('req')
        mainPage.clickToggleTempretureDefault();
        cy.wait('@req').then(res => {
            correctTempF = Math.round(res.response.body.current.temp);
        });
        mainPage.elements.getConvertTempFahrenheit();
        mainPage.elements.getTemperatureHeading().then(tempF => {
            expect(parseInt(tempF.text())).to.eql(correctTempF);
        });
    });

    it('Main page > Verify the converted temperature °F to °C is correct', function () {
        let correctTempC;
        cy.intercept('onecall?*metric*').as('req')
        mainPage.clickToggleTempretureDefault();
        mainPage.clickToggleTempreture();
        cy.wait('@req').then(res => {
            correctTempC = Math.round(res.response.body.current.temp);
        });
        mainPage.elements.getConvertTempCelsius();
        mainPage.elements.getTemperatureHeading().then(tempC => {
            expect(parseInt(tempC.text())).to.eql(correctTempC);
        });
    });


    it('Main page > Section with search > Verify entered a Zip code into the Search city field', function () {
        mainPage.setSearchInputText(this.data.searchInputText.zipCode);
        mainPage.clickSearchBtn();
        mainPage
            .elements
            .getSearchInput()
            .invoke('val')
            .should('eq', this.data.searchInputText.zipCode);
    });

    it('Main page > Section with search > Verify entered a City name into the Search city field', function () {
        mainPage.setSearchInputText(this.data.searchInputText.cityName);
        mainPage.clickSearchBtn();
        mainPage
            .elements
            .getSearchInput()
            .invoke('val')
            .should('eq', this.data.searchInputText.cityName);
    });

    it('Main page > Verify the website\'s description', function () {
        mainPage.elements.getPageDescriptionWhiteText().should('have.text', this.data.pageDescriptionWhiteText);
    });

    it('Main page > Section with 8-day forecast > Verifying the weather forecast for 8 days is displayed in the section', function () {
        mainPage.elements.getForecastDays().should('be.visible').and('have.length', this.data.forecastDaysLength);
    });

    it('Main page > Verify "OpenStreetMap"(c) link', function () {
        mainPage.elements.getCopyrightMapLink().should('include.text', this.data.copyright);
    });

    it('Main page > Verify clicking on the copyright sign', function () {
        mainPage.clickCopyrightMapLink();

        cy.url().should('eql', this.url.openStreetMap);
        cy.title().should('eql', this.titles.copyrightTitle);
    });

    it('Main page > Our new product > Solar Radiation API', function () {
        mainPage.clickSolarRadiationLink();

        cy.url().should('eq', this.url.solarRadiation);
        solarRadiationPage.elements.getSolarRadiationPageTitle().should('have.text', this.solarRadiationPage.solareRadiationPageTitle);
    });

    it('Main page > Verify that the Metric switch contains "°C, m/s"', function () {
        mainPage.elements.getToggleTempreture().should('include.text', this.data.tempretureScale);
    });

    it('Main page > Verify that the Imperial switch contains "°F, mph"', function () {
        mainPage.elements.getToggleTempretureDefault().should('include.text', this.data.tempretureScaleDefault);
    });

    it('Main page > Verify the temperature can be switched from Imperial to Metric', function () {
        mainPage.checkSwitchTemperature();
    });

});
