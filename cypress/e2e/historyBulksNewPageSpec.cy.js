/// <reference types="cypress" />


import HistoryBulksNewPage from '../pageObjects/HistoryBulksNewPage';
import MarketplacePage from "../pageObjects/MarketplacePage.js";

const marketPlacePage = new MarketplacePage();
const historyBulksNewPage = new HistoryBulksNewPage();

describe('History Bulks New Page test suite', () => {
    beforeEach(function () {
        cy.fixture('historyBulksNewPage').then(data => this.data = data);
        cy.visit('/marketplace');
    });

    it('Marketplace > Historical Bulks New > Verify upload file "import csv file"', function () {
        marketPlacePage.clickPlaceOrderHistoryBulk();
        historyBulksNewPage.clickSearchInput();
        historyBulksNewPage.clickImportButton();
        historyBulksNewPage.elements.getImportCSVFile().selectFile('cypress/fixtures/example.csv', { force: true });
        historyBulksNewPage.clickUploadCorrectFile();

        historyBulksNewPage.elements.getMapTableBody().should('include.text', this.data.testUploadCity);
    });

});
