/// <reference types="cypress" />


import Header from "../pageObjects/Header";
import SignInPage from "../pageObjects/SignInPage";
import UserMyProfilePage from "../pageObjects/UserMyProfilePage";
import UserHomePage from "../pageObjects/UserHomePage";

const header = new Header();
const signInPage = new SignInPage();
const usermyprofilePage = new UserMyProfilePage();
const userHomePage = new UserHomePage();

describe('Change password test suit', () => {

	beforeEach(function () {
		cy.fixture('signInPage').then(data => this.data = data);
		cy.visit('/');
	});

	after(function () {
		cy.visit('/');
		header.clickSignInMenuLink();
		signInPage.signIn(this.data.userProfile.email, this.data.userProfile.newPassword);
		userHomePage.clickMyProfileTabmenu();

		usermyprofilePage.passwordChange(this.data.userProfile.password);
	});

	it('Sign in > My profile Tab menu > Verify Password Change', function () {
		header.clickSignInMenuLink();
		signInPage.signIn(this.data.userProfile.email, this.data.userProfile.password);

		userHomePage.clickMyProfileTabmenu();
		usermyprofilePage.passwordChange(this.data.userProfile.newPassword);

		usermyprofilePage.elements.getAlertMessage().should('have.text', this.data.messageSuccessPasswordChange);
		header.clickUserDropDownMenu();
		header.clickUserLogoutLink();
	});

});