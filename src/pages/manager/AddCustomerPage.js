

export class AddCustomerPage {
  constructor(page) {
    this.page = page;
    this.firstNameField = page.getByPlaceholder('First Name');
    this.lastNameField = page.getByPlaceholder('Last Name');
    this.postalCodeField = page.getByPlaceholder('Post Code');
    this.addCustomerButton = page.getByRole('form').getByRole('button', { name: 'Add Customer' });
    this.customersButton = page.getByRole('button', { name: 'Customers' });
  }

  async open() {
    await this.page.goto('/angularJs-protractor/BankingProject/#/manager/addCust',);
  }
  async clickOnFirstNameField() {
    await this.firstNameField.click();
  }
  async fillFirstNameField(name) {
    await this.firstNameField.fill(name);
  }
  async clickOnLastNameField() {
    await this.lastNameField.click();
  }
  async fillLastNameField(name) {
    await this.lastNameField.fill(name);
  }
  async clickOnPostalCode() {
    await this.postalCodeField.click();
  }
  async fillPostalCodeField(code) {
    await this.postalCodeField.fill(code);
  }
  async clickOnAddCustomerButton() {
    await this.addCustomerButton.click();
  }
  async clickOnCustomersButton() {
    await this.customersButton.click();
  }
}
