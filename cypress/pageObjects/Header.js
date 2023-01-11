class Header {
    elements = {
        getBlogMenuLink: () => cy.get('#desktop-menu [href*="blog"]'),
        getFAQMenuLink: () => cy.get('ul#support-dropdown-menu a[href="/faq"]'),
        getMarketplaceMenuLink: () => cy.get('#desktop-menu a[href*="marketplace"]'),
        getApiMenuLink: () => cy.get('#desktop-menu a[href="/api"]'),
        getSupportDropDownMenu: () => cy.get('#support-dropdown'),
        getUserDropDownMenu: () => cy.get('#user-dropdown'),
        getGuideMenuLink: () => cy.get('#desktop-menu a[href="/guide"]'),
        getDashboardMenuLink: () => cy.get('#desktop-menu [href$=-dashboard]'),
        getSignInMenuLink: () => cy.get('li[class="user-li"] a[href$="sign_in"]'),
        getUserLogoutLink: () => cy.get('.dropdown-menu [href*="/sign_out"]'),
        getSupportHowToStartLink: () => cy.get('#support-dropdown-menu a[href ="/appid"]'),
        getSupportDropDownMenuList: () => cy.get('#support-dropdown-menu li'),
        getUserDropdownMenuList: () => cy.get('#user-dropdown-menu li'),
        getListItemsMenu: () => cy.get('#desktop-menu ul li'),
        getNameAutorizedUser: () => cy.get('.inner-user-container'),
    };

    clickSupportDropDownMenu() {
        this.elements.getSupportDropDownMenu().click({ force: true });
    };

    clickBlogMenuLink() {
        this.elements.getBlogMenuLink().invoke('removeAttr', 'target').click({ force: true });
    };

    clickMarketplaceMenuLink() {
        this.elements.getMarketplaceMenuLink().invoke('removeAttr', 'target').click({ force: true });
    };

    clickFAQMenuLink() {
        this.elements.getFAQMenuLink().click({ force: true });
    };

    clickApiMenuLink() {
        this.elements.getApiMenuLink().click({ force: true });
    };

    clickGuideMenuLink() {
        this.elements.getGuideMenuLink().click({ force: true });
    };

    clickDashboardMenu() {
        this.elements.getDashboardMenuLink().invoke('removeAttr', 'target').click({ force: true });
    };

    clickSignInMenuLink() {
        this.elements.getSignInMenuLink().click({ force: true });
    };

    clickUserLogoutLink() {
        this.elements.getUserLogoutLink().click({ force: true });
    };

    clickUserDropDownMenu() {
        this.elements.getUserDropDownMenu().click({ force: true });
    };

    clickSupportHowToStartLink() {
        this.elements.getSupportHowToStartLink().click({ force: true });
    };

};
export default Header;