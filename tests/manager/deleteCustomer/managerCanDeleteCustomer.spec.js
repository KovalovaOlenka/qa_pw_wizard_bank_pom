import { test } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { AddCustomerPage } from '../../../src/pages/manager/AddCustomerPage';
import { BankManagerMainPage } from '../../../src/pages/manager/BankManagerMainPage';
import { CustomersListPage } from '../../../src/pages/manager/CustomersListPage';

test.beforeEach(async ({ page }) => {
  const addCustomerPage = new AddCustomerPage(page);
  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();
  const postCode = faker.location.zipCode(); 
  

  await addCustomerPage.open();
  await addCustomerPage.clickOnFirstNameField();
  await addCustomerPage.fillFirstNameField(firstName);
  await addCustomerPage.clickOnLastNameField();
  await addCustomerPage.fillLastNameField(lastName);
  await addCustomerPage.clickOnPostalCode();
  await addCustomerPage.fillPostalCodeField(postCode);
  await addCustomerPage.clickOnAddCustomerButton();
  /* 
  Pre-conditons:
  1. Open Add Customer page. ✓
  2. Fill the First Name.  ✓
  3. Fill the Last Name. ✓
  4. Fill the Postal Code. ✓
  5. Click [Add Customer].✓
  */
});

test('Assert manager can delete customer', async ({ page }) => {
  const bankManagerMainPage = new BankManagerMainPage(page);
  const customersList = new CustomersListPage(page);

  await bankManagerMainPage.clickOnCustomersButton();
  await customersList.open();
  await customersList.clickOnDeleteCustomerButton();
  await customersList.verifyCustomerRowIsNotVisible();
  await page.reload();
  await customersList.verifyCustomerRowIsNotVisible();


  /* 
  Test:
  1. Open Customers page. ✓
  2. Click [Delete] for the row with customer name. ✓
  3. Assert customer row is not present in the table. ✓
  4. Reload the page. ✓
  5. Assert customer row is not present in the table. ✓
  */
});
