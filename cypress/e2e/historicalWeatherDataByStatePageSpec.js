/// <reference types="cypress" />


import Header from "../pageObjects/Header";
import MarketplacePage from "../pageObjects/MarketplacePage";
import HistoricalWeatherDataByStatePage from "../pageObjects/HistoricalWeatherDataByStatePage";

const header = new Header();
const marketplace = new MarketplacePage();
const historicalWeatherDataByStatePage = new HistoricalWeatherDataByStatePage();

describe('historical wether page test suite', function () {

    beforeEach(function () {
        cy.fixture('historicalWeatherDataByStatePage').then(data => this.data = data);
        cy.visit('/');
    });

    it('Marketplace > Historical Data Archives > Verify "Historical Data Archives Documentation" link redirects to the corresponding page', function () {
        header.clickMarketplaceMenuLink();
        marketplace.clickHistoricalDataArchivesDocumentationLink();

        cy.url().should('include', this.data.urn);
        historicalWeatherDataByStatePage.elements.getTitlePage().should('have.text', this.data.titlePage);
    });

    it('Marketplace > Historical Data Archives > Verifying that each state has its own ZIP code and particular price', function () {
        header.clickMarketplaceMenuLink();
        marketplace.clickHistoricalDataArchivesDocumentationLink();

        historicalWeatherDataByStatePage.elements.getDataState().then((list) => {
            const dataStates = list
                .toArray()
                .map(el => el.innerText.split('\t'))
            cy.wrap(dataStates).should('deep.equal', this.data.dataStates);
        });
    });

    it('Marketplace > Historical Data Archives > Historical Weather Data by State > Verify sorted by names', function () {
        let currentStatesArr = Array();
        header.clickMarketplaceMenuLink();
        marketplace.clickHistoricalDataArchivesDocumentationLink();

        historicalWeatherDataByStatePage.elements.getListOfStates().then((list) => {
            currentStatesArr = list.toArray().map(el => el.innerText)
            let sortedByNames = [...currentStatesArr].sort((a, b) => a.localeCompare(b));

            expect(currentStatesArr).to.have.length(this.data.tableLength);
            expect(currentStatesArr).to.deep.eql(sortedByNames);
        });
    });

});