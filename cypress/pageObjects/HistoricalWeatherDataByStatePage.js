class HistoricalWeatherDataByStatePage {

    elements = {
        getListOfStates: () => cy.get('.material-table td:first-child'),
        getTitlePage: () => cy.get('.breadcrumb-title'),
        getDataState: () => cy.get('.material-table tr:not(tr:first-child)'),
    };
    
};
export default HistoricalWeatherDataByStatePage;