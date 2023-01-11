class GuidePage {
    elements = {
        getTitleGuide: ()=> cy.get('h1.breadcrumb-title'),
        getPageDescription: ()=> cy.get('div.col-sm-12 h1'),
        getSubscribeButton: ()=> cy.get('a[href="/price"].ow-btn.round.btn-orange'),
        getFirstLearnMoreButton: ()=> cy.get('ol [href="/api#current"]'),
        getSubH2: ()=> cy.get('main h2'),
        getSubH4: ()=> cy.get('h4 b'),        
    };

    clickSubscribeButton(){
        this.elements.getSubscribeButton().click();
    };

    clickFirstLearnMoreButton() {
        this.elements.getFirstLearnMoreButton().click();
    };

};
export default GuidePage;