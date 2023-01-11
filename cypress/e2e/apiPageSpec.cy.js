/// <reference types="cypress" />


import Header from "../pageObjects/Header.js";
import ApiPage from "../pageObjects/ApiPage.js";

const header = new Header();
const apiPage = new ApiPage();

describe('Api page test suite', () => {

      beforeEach(function () {
            cy.fixture('apiPage').then(data => this.data = data);
            cy.fixture('url').then(url => this.url = url);
            cy.visit('/');
      });

      it('Header > Navigation> Verify "API" menu link', function () {
            header.clickApiMenuLink();
            
            cy.url().should('eql', this.url.API);
            apiPage.elements.getWeatherApiTitle().should('have.text', this.data.headLineText);
      });
 
});
