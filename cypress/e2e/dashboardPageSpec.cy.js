/// <reference types="cypress"/>


import Header from "../pageObjects/Header.js";
import DashboardPage from "../pageObjects/DashboardPage.js";
import DashboardEventsPage from "../pageObjects/DashboardEventsPage.js";
import SignInPage from "../pageObjects/SignInPage.js";
import QuestionsPage from "../pageObjects/QuestionsPage.js";

const header = new Header();
const dashboardPage = new DashboardPage();
const dashboardEventsPage = new DashboardEventsPage();
const signInPage = new SignInPage();
const questionsPage = new QuestionsPage();

describe('Dashboard page test suite', () => {

    beforeEach(function () {
        cy.fixture('dashboardPage').then(data => this.data = data);
        cy.fixture('signInPage').then(signInData => this.signIn = signInData);
        cy.fixture('url').then(url => this.url = url);
        cy.fixture('questionsPage').then(questionsData => this.questionsData = questionsData);
        cy.fixture('dashboardEventsPage').then(events => this.events = events);
        cy.visit('/');
    });

    it('Main menu > Verify "Dashboard" menu link', function () {
        header.clickDashboardMenu();

        cy.url().should('eql', this.url.weatherDashboard);
        dashboardPage.elements.getWeatherDashboardTitle().should('have.text', this.data.headLineText);
    });

    it('Main menu > Dashboard > Verify the first button "Contact us" is clickable and redirects User to the Questions page', function () {
        header.clickDashboardMenu();

        dashboardPage.clickContactUsButton();
        cy.url().should('eql', this.url.questions);
        questionsPage.elements.getHeadLine().should('have.text', this.questionsData.headLineText);
    });

    it('Main menu > Dashboard > After clicking the first "Try the Dashboard" button not authorized User is redirected to Sign in page', function () {
        header.elements.getNameAutorizedUser().should('not.exist');
        header.clickDashboardMenu();
        dashboardPage.clickTryTheDashboardFirstButton();

        cy.url().should('eql', this.url.signIn);
        signInPage.elements.getSignInForm().should('be.visible');
    });

    it('Main menu > Dashboard > After clicking the first "Try the Dashboard" button authorized User is redirected to Events Page', function () {
        header.elements.getNameAutorizedUser().should('not.exist');
        header.clickSignInMenuLink();
        signInPage.signIn(this.signIn.userProfile.email, this.signIn.userProfile.password);
        header.elements.getNameAutorizedUser().should('exist');
        header.clickDashboardMenu();
        dashboardPage.clickTryTheDashboardFirstButton();

        cy.url().should('include', this.url.dashboardEvents);
        dashboardEventsPage.elements.getWeatherEventsTitle().should('have.text', this.events.headLineText);
    });
    
});
