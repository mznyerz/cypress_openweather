class MarketplacePage {
      elements = {
            getH1CustomWeatherProducts: () => cy.get('div #custom_weather_products h1'),
            getAllProductTitles: () => cy.get('.market-place a[href]:not(.button-round)'),
            getDocumentationBtnHistoryBulk :() => cy.get('div.button-container > a[href$="/history-bulk"]'),
            getMarketplacePageTitle: () => cy.get('#custom_weather_products'),
            getPlaceOrderHistoryBulk: () => cy.get('div.button-container a[href="/history_bulks/new"]'),
      };

      clickDocumentationBtnHistoryBulk () {
            this.elements.getDocumentationBtnHistoryBulk().invoke('removeAttr', 'target').click();
      };

      clickPlaceOrderHistoryBulk () {
            this.elements.getPlaceOrderHistoryBulk().invoke('removeAttr', 'target').click();
      };

};
export default MarketplacePage;
