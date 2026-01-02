import { test } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { AddCustomerPage } from '../../../src/pages/manager/AddCustomerPage';
import { BankManagerMainPage } from '../../../src/pages/manager/BankManagerMainPage';
import { OpenAccountPage } from '../../../src/pages/manager/OpenAccountPage';


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
  await page.reload();

  /* 
  Pre-conditons:
  1. Open Add Customer page ✓
  2. Fill the First Name.  ✓
  3. Fill the Last Name. ✓
  4. Fill the Postal Code. ✓
  5. Click [Add Customer]. ✓
  6. Reload the page (This is a simplified step to close the popup). ✓
  */
});

test('Assert manager can add new customer', async ({ page }) => {
  const bankManagerMainPage = new BankManagerMainPage(page);
  const openAccountPage = new OpenAccountPage(page); 
  const addCustomerPage = new AddCustomerPage(page);

  await bankManagerMainPage.clickOnOpenAccountButton();
  await openAccountPage.chooseCustomer('6');
  await openAccountPage.chooseCurrency('Dollar');
  await openAccountPage.clickOnProcessButton();
  await page.reload();
  await bankManagerMainPage.clickOnCustomersButton();
  await addCustomerPage.verifyAccountNumberInLastRowHasText();


  /* 
  Test:
  1. Click [Open Account]. ✓
  2. Select Customer name you just created. ✓
  3. Select currency. ✓
  4. Click [Process]. ✓
  5. Reload the page (This is a simplified step to close the popup). ✓
  6. Click [Customers]. ✓
  7. Assert the customer row has the account number not empty. ✓

  Tips:
  1. Do not rely on the customer row id for the step 13. ✓
    Use the ".last()" locator to get the last row. ✓
  */
});
