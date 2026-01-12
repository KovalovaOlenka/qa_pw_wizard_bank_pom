import { test } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { AddCustomerPage } from '../../../src/pages/manager/AddCustomerPage';
import { BankManagerMainPage } from '../../../src/pages/manager/BankManagerMainPage';
import { OpenAccountPage } from '../../../src/pages/manager/OpenAccountPage';

let firstName;
let lastName;
let postCode;


test.beforeEach(async ({ page }) => {

  const addCustomerPage = new AddCustomerPage(page);
  firstName = faker.person.firstName();
  lastName = faker.person.lastName();
  postCode = faker.location.zipCode(); 

  await addCustomerPage.open();
  await addCustomerPage.clickOnFirstNameField();
  await addCustomerPage.fillFirstNameField(firstName);
  await addCustomerPage.clickOnLastNameField();
  await addCustomerPage.fillLastNameField(lastName);
  await addCustomerPage.clickOnPostalCode();
  await addCustomerPage.fillPostalCodeField(postCode);
  page.on('dialog', dialog => dialog.accept());
  await addCustomerPage.clickOnAddCustomerButton();
 

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

test('Assert manager can open account for a new customer', async ({ page }) => {
  const bankManagerMainPage = new BankManagerMainPage(page);
  const openAccountPage = new OpenAccountPage(page); 
  const addCustomerPage = new AddCustomerPage(page);

  await bankManagerMainPage.clickOnOpenAccountButton();
  await openAccountPage.chooseCustomer(`${firstName} ${lastName}`);
  await openAccountPage.chooseCurrency('Dollar');
  await openAccountPage.clickOnProcessButton();
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
