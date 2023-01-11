class BlogAgroPage {
    elements = {
        getPostInfoArray: () => cy.get('.post__info'),
        getPostList: () => cy.get('.post-list'),
        getAllPosts: () => cy.get('.post-list .post'),
    };

};
export default BlogAgroPage;