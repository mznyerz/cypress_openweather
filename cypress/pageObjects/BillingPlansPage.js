class BillingPlansPage {
    elements = {
        getAllBillingPlansTables: () => cy.get('table tbody'),
    };

};
export default BillingPlansPage;