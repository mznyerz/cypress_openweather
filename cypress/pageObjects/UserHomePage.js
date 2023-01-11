class UserHomePage {
    elements = {
        getBillingPlanLink: () => cy.get('[href="/subscriptions"]'),
        getMyAccountDropDownMenu: () => cy.get('#user-dropdown'),
        getVisibleDropDownMenu: () => cy.get('[class="dropdown-menu dropdown-visible"]'),
        getMyServicesOnDropDownMenu: () => cy.get('.dropdown-visible [href="/myservices"]'),
        getMyProfileTabmenu: () => cy.get('#myTab a[href="/home"]'),
    };

    clickBillingPlanLink() {
        this.elements.getBillingPlanLink().click();
    };

    clickMyAccountDropDownMenu() {
        this.elements.getMyAccountDropDownMenu().click();
    };

    clickMyServicesOnDropDownMenu() {
        this.elements.getMyServicesOnDropDownMenu().click();
    };

    clickMyProfileTabmenu() {
        this.elements.getMyProfileTabmenu().click();
    };

};
export default UserHomePage;