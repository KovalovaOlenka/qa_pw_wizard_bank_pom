import { test } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { AddCustomerPage } from '../../../src/pages/manager/AddCustomerPage';
import { CustomersListPage } from '../../../src/pages/manager/CustomersListPage';

let firstName;
let lastName;
let postalCode;

test.beforeEach(async ({ page }) => {
  /* 
  Pre-conditons:
  1. Open Add Customer page. ✓
  2. Fill the First Name. ✓ 
  3. Fill the Last Name. ✓
  4. Fill the Postal Code. ✓
  5. Click [Add Customer]. ✓
  */
  firstName = faker.person.firstName();
  lastName = faker.person.lastName();
  postalCode = faker.location.zipCode();

  const addCustomerPage = new AddCustomerPage(page);

  await addCustomerPage.open();
  await addCustomerPage.clickOnFirstNameField();
  await addCustomerPage.fillFirstNameField(firstName);
  await addCustomerPage.clickOnLastNameField();
  await addCustomerPage.fillLastNameField(lastName);
  await addCustomerPage.clickOnPostalCode();
  await addCustomerPage.fillPostalCodeField(postalCode);
  await addCustomerPage.clickOnAddCustomerButton();

});

test('Assert manager can search customer by First Name', async ({ page }) => {
  const addCustomerPage = new AddCustomerPage(page);
  const customersList = new CustomersListPage(page);

  await addCustomerPage.clickOnCustomersButton();
  await customersList.clickOnSearchField();
  await customersList.fillFirstNameInSearchField(firstName);
  await customersList.verifyCustomerRowIsVisible(firstName, lastName);
  await customersList.verifyOnlyOneRowIsPresent();

  /* 
  Test:
  1. Open Customers page. ✓
  2. Fill the firstName to the search field ✓
  3. Assert customer row is present in the table.  ✓
  4. Assert no other rows is present in the table. ✓
  */
});
