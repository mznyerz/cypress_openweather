/// <reference types="cypress" />


import SignInPage from "../pageObjects/SignInPage";
import Header from "../pageObjects/Header";
import UserHomePage from "../pageObjects/UserHomePage";
import BillingPlansPage from "../pageObjects/BillingPlansPage";

const signInPage = new SignInPage();
const header = new Header();
const userHomePage = new UserHomePage();
const billingPlansPage = new BillingPlansPage();

describe('User Page Billing plans suite', () => {

    beforeEach(function () {
            cy.fixture('userPageBillingPlanPage').then(data => this.data = data);
            cy.fixture('signInPage').then(login => this.login = login);
            cy.visit('/');
    });

    it('User page > Billing plans > Verify information about billing plans is available', function(){
        header.clickSignInMenuLink();
        signInPage.signIn(this.login.userProfile.email, this.login.userProfile.password);
        
        userHomePage.elements.getVisibleDropDownMenu().should('not.exist');
        userHomePage.clickMyAccountDropDownMenu();
        userHomePage.elements.getVisibleDropDownMenu().should('exist');
        userHomePage.clickMyServicesOnDropDownMenu();
        userHomePage.clickBillingPlanLink();
        billingPlansPage.elements.getAllBillingPlansTables().each(($el,i) => {
            billingPlansPage.elements.getAllBillingPlansTables().eq(i).find('tr').then((table) => {
                let currentTable = table.toArray().map(el => el.innerText
                    .split('\t')
                    .map(el =>{
                    if (el.includes('\n')){
                        return el.replace('\n', " ").trim()
                    } else {
                        return el.trim()
                    }
                })
                .filter(el => el.length));
                console.log(currentTable)
                expect(currentTable).to.deep.equal(this.data.billingPlansTables[i]);
            });
        });
    });

});
