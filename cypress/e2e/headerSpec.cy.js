/// <reference types="cypress" />


import Header from "../pageObjects/Header.js";
import SignInPage from "../pageObjects/SignInPage";

const header = new Header();
const signInPage = new SignInPage();

describe('Header test suit', () => {

    beforeEach(function () {
        cy.fixture('header').then(data => this.data = data);
        cy.fixture('signInPage').then(signIn => this.signIn = signIn);
        cy.visit('/');
    });

    it('Header > Support > Verify Drop Down menu', function () {
        header.elements.getSupportDropDownMenuList().should('not.be.visible');
        header.clickSupportDropDownMenu();

        header.elements.getSupportDropDownMenuList().should('be.visible')
            .and('have.length', this.data.supportDropDownLength);
        header.elements.getSupportDropDownMenuList().each(($el, i) => {
            cy.wrap($el.text()).should('eql', this.data.supportDropdownList[i]);
        });
    });

    it('Header > Navigation > Verify items in header Menu', function () {
        header.elements.getListItemsMenu().then(list => {
            let itemsList = list.toArray().map(el => el.innerText).filter(el => el.length);
            cy.wrap(itemsList).should('deep.equal', this.data.mainMenuList);
        });
    });

    it('Header > Account drop down menu > Verify for options in account dropdown menu', function () {
        header.clickSignInMenuLink();
        signInPage.signIn(this.signIn.userProfile.email, this.signIn.userProfile.password);
        header.elements.getUserDropdownMenuList().should('not.be.visible');
        header.clickUserDropDownMenu();

        header.elements.getUserDropdownMenuList().should('be.visible')
            .invoke('toArray').then(list => {
                let userDropDownMenuList = [...list].map(el => el.innerText);
                cy.wrap(userDropDownMenuList).should('deep.equal', this.data.userAccountHeaderDropdownMenu);
            });
    });

});
