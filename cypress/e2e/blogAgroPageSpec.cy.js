/// <reference types="cypress" />


import Header from "../pageObjects/Header";
import BlogPage from "../pageObjects/BlogPage";
import BlogAgroPage from "../pageObjects/BlogAgroPage";

const header = new Header();
const blogPage = new BlogPage();
const blogAgroPage = new BlogAgroPage();

describe('AGRO page in blog test suite', () => {
    beforeEach(function () {
        cy.fixture('blogAgroPage').then(agro => this.data = agro);
        cy.visit('/');
    });

    it('Blog > Weather > AGRO > Verify that all posts on the page have "agro" category in description', function() {
        header.clickBlogMenuLink();

        blogPage.clickAgroLink();
        blogAgroPage.elements.getPostInfoArray().each($el => {
            
            cy.wrap($el).should('include.text', this.data.textDescription);
        });
    });

    it('Blog > Weather > AGRO > Verify 10 posts are displayed on the first page', function() {
        header.clickBlogMenuLink();

        blogPage.clickAgroLink();
        blogAgroPage.elements.getPostList().should('be.visible');
        blogAgroPage.elements.getAllPosts().should('have.length', this.data.countPosts);
    });
    
});