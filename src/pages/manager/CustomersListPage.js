import { expect } from '@playwright/test';

export class CustomersListPage {
  constructor(page) {
    this.page = page;
    this.deleteCustomer = page.getByRole('button');
    this.customerRows = page.locator('tbody tr');
    this.searchField = page.getByPlaceholder('Search Customer');
    this.firstNameHeader = page.getByRole('link', { name: 'First Name' });
    this.lastNameHeader = page.getByRole('link', { name: 'Last Name' });
    this.postalCodeHeader = page.getByRole('link', { name: 'Post Code' });
  }

  async open() {
    await this.page.goto('/angularJs-protractor/BankingProject/#/manager/list');
  }
  async clickOnDeleteCustomerButton() {
    await this.customerRows.last().getByRole('button').click();
  }
  async verifyCustomerRowIsNotVisible(firstName, lastName) {
  await expect(this.page.locator('tbody tr', { hasText: `${firstName} ${lastName}` })).toHaveCount(0);
}
  async clickOnSearchField() {
  await this.searchField.click();
  }
  async fillFirstNameInSearchField(name) {
    await this.searchField.fill(name);
  }
  async verifyCustomerRowIsVisible(firstName, lastName) {
  await expect(this.page.locator('tbody tr', { hasText: `${firstName} ${lastName}` })).toHaveCount(1);
}
  async verifyOnlyOneRowIsPresent() {
  await expect(this.customerRows).toHaveCount(1);
}
  async fillLastNameInSearchField(name) {
  await this.searchField.fill(name);
  }
  async fillPostalCodeInSearchField(code) {
  await this.searchField.fill(code);
  }
  //Sorting customers
  async verifyFirstNameSorting() {
  // Z → A
  await this.firstNameHeader.click();
  const desc = await this.page.$$eval('tbody tr td:nth-child(1)',tds => tds.map(td => td.textContent.trim()));
  expect(desc).toEqual([...desc].sort().reverse());

  // A → Z
  await this.firstNameHeader.click();
  const asc = await this.page.$$eval('tbody tr td:nth-child(1)',tds => tds.map(td => td.textContent.trim()));
  expect(asc).toEqual([...asc].sort());
}
async verifyLastNameSorting() {
  // Z → A
  await this.lastNameHeader.click();
  const desc = await this.page.$$eval('tbody tr td:nth-child(2)',tds => tds.map(td => td.textContent.trim()));
  expect(desc).toEqual([...desc].sort().reverse());

  // A → Z
  await this.lastNameHeader.click();
  const asc = await this.page.$$eval('tbody tr td:nth-child(2)',tds => tds.map(td => td.textContent.trim()));
  expect(asc).toEqual([...asc].sort());
}

async verifyPostalCodeSorting() {
  // Z → A
  await this.postalCodeHeader.click();
  const desc = await this.page.$$eval('tbody tr td:nth-child(3)',tds => tds.map(td => td.textContent.trim()));
  expect(desc).toEqual([...desc].sort().reverse());

  // A → Z
  await this.postalCodeHeader.click();
  const asc = await this.page.$$eval('tbody tr td:nth-child(3)',tds => tds.map(td => td.textContent.trim()));
  expect(asc).toEqual([...asc].sort());
}
// Check Header hovering and underline 
  async verifyUnderlineOnHover(element) {
  await element.hover();

  const textDecoration = await element.evaluate(el => window.getComputedStyle(el).textDecorationLine);
  expect(textDecoration).toContain('underline');
}

}