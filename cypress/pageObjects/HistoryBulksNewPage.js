class HistoryBulksNewPage {
    elements = {
        getHistoryBulksNewTitle: () => cy.get('h4.heading'),
        getSearchInput: () => cy.get('.search-box input[type="search"]'),
        getImportButton: () => cy.get('.search-pop-up button').eq(2),
        getImportCSVFile: () => cy.get('#importCSV[type="file"]'),
        getUploadCorrectFile: () => cy.get('.pop-up-footer button').eq(1),
        getMapTableBody: () => cy.get('.location-table tbody'),
    };

    clickSearchInput() {
        this.elements.getSearchInput().click();
    };

    clickImportButton() {
        this.elements.getImportButton().click();
    };

    clickUploadCorrectFile() {
        this.elements.getUploadCorrectFile().click().click();
    };

};
export default HistoryBulksNewPage;