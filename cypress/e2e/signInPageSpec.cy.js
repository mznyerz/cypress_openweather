/// <reference types="cypress" />


import Header from "../pageObjects/Header";
import SignInPage from "../pageObjects/SignInPage";

const header = new Header();
const signInPage = new SignInPage();

describe('SignIn test suit', () => {

  beforeEach(function () {
    cy.fixture('signInPage').then(data => this.data = data);
    cy.visit('/');
  });

  it('Sign in > Verify a successful Sign-in', function () {
    header.clickSignInMenuLink();
    signInPage.signIn(this.data.userProfile.email, this.data.userProfile.password);

    signInPage.elements.getNoticeAfterSigned().should('have.text', this.data.signInSuccessful);
  });

  it('Sign in > Account Dropdown Menu > Verify Account Dropdown menu is visible and exist', function () {
    header.clickSignInMenuLink();
    signInPage.signIn(this.data.userProfile.email, this.data.userProfile.password);
    header.clickUserDropDownMenu();

    header.elements.getUserDropdownMenuList().should('be.visible').then(data => {
      let menuItemsAccount = data.toArray().map(el => el.innerText);
      cy.wrap(menuItemsAccount).should('deep.equal', this.data.userAccountMenu);
    });
    header.clickUserLogoutLink();
  });

  it('Sign in > Account Dropdown Menu > Verify a successful Sign-out', function () {
    header.clickSignInMenuLink();
    signInPage.signIn(this.data.userProfile.email, this.data.userProfile.password);

    header.clickUserDropDownMenu();
    header.clickUserLogoutLink();

    signInPage.elements.getAlertMessage().should('have.text', this.data.signOutAlertText);
  });

});