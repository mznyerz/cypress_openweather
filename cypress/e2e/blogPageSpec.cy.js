/// <reference types="cypress" />


import Header from "../pageObjects/Header.js";
import BlogPage from "../pageObjects/BlogPage.js";

const header = new Header();
const blogPage = new BlogPage();

describe('Blog page test suite', () => {

    beforeEach(function () {
        cy.fixture('blogPage').then(data => this.data = data);
        cy.fixture('titles').then(titles => this.titles = titles);
        cy.fixture('url').then(url => this.url = url);
        cy.visit('/');
    });

    it('Blog > Weather > Verify 10 posts are displayed on the first page', function () {
        header.clickBlogMenuLink();

        blogPage.elements.getListPost().should('be.visible');
        blogPage.elements.getAllPosts().should('have.length', this.data.postsQuantity);
    });

    it('Blog > Weather > All posts links are clickable and redirect a user to the posts in a new page', function () {
        header.clickBlogMenuLink();

        blogPage.checkClickAndRedirectingPosts(this.data.postsLink, this.titles.blogTitle);
    });

    it('Blog > Weather > Verify that after clicking the Blog menu a user is redirected to the blog page', function () {
        header.clickBlogMenuLink();

        cy.url().should('eql', this.url.newsAndUpdates);
        blogPage.elements.getWeatherFilter().should('have.text', this.data.weatherFilter);
    });

});
