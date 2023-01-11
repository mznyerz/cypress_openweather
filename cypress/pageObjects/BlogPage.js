class BlogPage {
    elements = {
        getWeatherFilter: () => cy.get('#blog-categories [for="weather"] a'),
        getListPost: () => cy.get('.post-list'),
        getAllPosts: () => cy.get('.post-list .post'),
        getAllPostsLinks: () => cy.get('.post-list .post .post__title-link'),
        getAgroLink: () => cy.get('a[href="/blog/category/agro"]'),
    };

    clickAgroLink() {
        this.elements.getAgroLink().click();
    };


    checkClickAndRedirectingPosts(url, title) {
        this.elements.getAllPostsLinks().each((el, i) => {
            this.elements.getAllPostsLinks().eq(i).click();
            cy.url().should('include', url);
            cy.title().should('include', title);
            cy.go(-1);
        });
    };

};
export default BlogPage;