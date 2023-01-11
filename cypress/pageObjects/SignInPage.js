class SignInPage {
  elements = {
    getEmailInput: () => cy.get('.input-group #user_email'),
    getPasswordInput: () => cy.get('#user_password.form-control'),
    getSubmitButton: () => cy.get('[value="Submit"]'),
    getNoticeAfterSigned: () => cy.get('.panel-body'),
    getAlertMessage: () => cy.get('.panel-body'),
    getSignInForm: () => cy.get('.sign-form'),
  };

  typeEnterEmail(userEmail) {
    this.elements.getEmailInput().type(userEmail, { log: false });
  };

  typeEnterPassword(userPassword) {
    this.elements.getPasswordInput().type(userPassword, { log: false });
  };

  clickSubmitButton() {
    this.elements.getSubmitButton().click();
  };

  signIn(email, password) {
    this.typeEnterEmail(email, { log: false });
    this.typeEnterPassword(password, { log: false });
    this.clickSubmitButton();
  };

};
export default SignInPage;