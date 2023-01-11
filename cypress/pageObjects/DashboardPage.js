class DashboardPage {
    elements = {
        getWeatherDashboardTitle: () => cy.get('h1.breadcrumb-title'),
        getTryTheDashboardFirstButton: () => cy.get('[class="row weather"] .btn-orange'),
        getContactUsButton: () => cy.get('p.below .btn_like'),
    };

    clickTryTheDashboardFirstButton () {
        this.elements.getTryTheDashboardFirstButton().invoke('removeAttr', 'target').click();
    };

    clickContactUsButton () {
        this.elements.getContactUsButton().invoke('removeAttr', 'target').click();
    };

};
export default DashboardPage;