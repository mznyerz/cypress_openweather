/// <reference types="cypress" />
 

import Header from "../pageObjects/Header.js";
import MarketplacePage from "../pageObjects/MarketplacePage.js";
import HistoryBulkPage from "../pageObjects/HistoryBulkPage.js";
import HistoryBulksNewPage from "../pageObjects/HistoryBulksNewPage.js";

const header = new Header();
const marketplacePage = new MarketplacePage();
const historyBulkPage = new HistoryBulkPage();
const historyBulksNewPage = new HistoryBulksNewPage();

describe('Marketplace page test suite', () => {

      beforeEach(function () {
            cy.fixture('marketplacePage').then(data => this.data = data);
            cy.fixture('url').then(url => this.url = url);
            cy.fixture('historybulkPage').then(data => this.historyBulkPage = data);
            cy.fixture('historyBulksNewPage').then(data => this.historyBulksNew = data);
            cy.visit('/');
      });
      
      it('Main menu > Marketplace > Verify "Marketplace" menu link', function () {
            header.clickMarketplaceMenuLink();
      
            cy.url().should('eql', this.url.market);
            marketplacePage.elements.getH1CustomWeatherProducts().should('have.text', this.data.h1CustomProducts);
      });

      it('Main menu > Marketplace > Verify that all links on the page have the same color', function () {
        header.clickMarketplaceMenuLink();
        
        marketplacePage.elements.getAllProductTitles().each(($el) => {
            cy.wrap($el).should('have.css', 'color', this.data.productTitleColor);
        });
    });

      it('Main menu > Marketplace verification of displayed "Documentation" button for History bulk', function () {
           header.clickMarketplaceMenuLink();
           marketplacePage.elements.getDocumentationBtnHistoryBulk().should('be.visible');
           marketplacePage.clickDocumentationBtnHistoryBulk();

           cy.url().should('eql', this.url.historyBulk);
           historyBulkPage.elements.getHistoryBulkTitle().should('have.text', this.historyBulkPage.historyBulkTitle)  ;
      });

      it('Main menu > Marketplace > Verification than "Place order" button is displayed and leads to URL', function() {
            header.clickMarketplaceMenuLink();
            marketplacePage.elements.getPlaceOrderHistoryBulk().should('be.visible');
            marketplacePage.clickPlaceOrderHistoryBulk();

            cy.url().should('eq', this.url.placeOrderHistoryBulk);
            historyBulksNewPage.elements.getHistoryBulksNewTitle().should('have.text', this.historyBulksNew.historyBulksNewTitle);
      });

      });
