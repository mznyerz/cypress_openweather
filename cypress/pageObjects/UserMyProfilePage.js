class UserMyProfilePage {
	elements = {
		getNewPasswordInput: () => cy.get('#password_form_password'),
		getConfirmNewPasswordInput: () => cy.get('#password_form_password_confirmation'),
		getChangePasswordBtn: () => cy.get('input[value="Change Password"]'),
		getAlertMessage: () => cy.get('.panel-body'),
	};

	clickChangePaswordBtn() {
		this.elements.getChangePasswordBtn().click();
	};

	passwordChange(newpassword) {
		this.elements.getNewPasswordInput().type(newpassword, { log: false });
		this.elements.getConfirmNewPasswordInput().type(newpassword, { log: false });
		this.clickChangePaswordBtn();
	};

};
export default UserMyProfilePage;