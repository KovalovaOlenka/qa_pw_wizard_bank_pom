import { test } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { AddCustomerPage } from '../../../src/pages/manager/AddCustomerPage';
import { CustomersListPage } from '../../../src/pages/manager/CustomersListPage';

let customers = [];

test.beforeEach(async ({ page }) => { 
  
  const addCustomerPage = new AddCustomerPage(page); 

  faker.seed(123); 

  customers = [ 
    { 
    firstName: faker.person.firstName(), 
    lastName: faker.person.lastName(), 
    postCode: faker.location.zipCode(), 
  }, 
  { 
    firstName: faker.person.firstName(), 
    lastName: faker.person.lastName(), 
    postCode: faker.location.zipCode(), 
  }, 
  { 
    firstName: faker.person.firstName(), 
    lastName: faker.person.lastName(), 
    postCode: faker.location.zipCode(), 
  }, 
]; 

  await addCustomerPage.open(); 
  // Customer 1 
  page.once('dialog', d => d.accept()); 
  await addCustomerPage.fillFirstNameField(customers[0].firstName); 
  await addCustomerPage.fillLastNameField(customers[0].lastName); 
  await addCustomerPage.fillPostalCodeField(customers[0].postCode); 
  await addCustomerPage.clickOnAddCustomerButton(); 
  // Customer 2 
  page.once('dialog', d => d.accept()); 
  await addCustomerPage.fillFirstNameField(customers[1].firstName); 
  await addCustomerPage.fillLastNameField(customers[1].lastName); 
  await addCustomerPage.fillPostalCodeField(customers[1].postCode); 
  await addCustomerPage.clickOnAddCustomerButton(); 
  //Customer 3 
  page.once('dialog', d => d.accept()); 
  await addCustomerPage.fillFirstNameField(customers[2].firstName); 
  await addCustomerPage.fillLastNameField(customers[2].lastName); 
  await addCustomerPage.fillPostalCodeField(customers[2].postCode);
  await addCustomerPage.clickOnAddCustomerButton(); }); 
   
   test('Assert manager can sort customers and verify header UI', async ({ page }) => { 
    const customersList = new CustomersListPage(page); 
    
  await customersList.open(); 
  await customersList.verifyFirstNameSorting(customers); 
  await customersList.verifyLastNameSorting(customers); 
  await customersList.verifyPostalCodeSorting(customers); 
  await customersList.verifyUnderlineOnHover(customersList.firstNameHeader); 
  await customersList.verifyUnderlineOnHover(customersList.lastNameHeader); 
  await customersList.verifyUnderlineOnHover(customersList.postalCodeHeader); });

    test.afterEach(async ({ page }) => {
      const customersList = new CustomersListPage(page);

  await customersList.open();

  // Delete customer 1
  page.once('dialog', d => d.accept());
  await customersList.clickOnDeleteCustomerButton(
    customers[0].firstName,
    customers[0].lastName
  );

  // Delete customer 2
  page.once('dialog', d => d.accept());
  await customersList.clickOnDeleteCustomerButton(
    customers[1].firstName,
    customers[1].lastName
  );

  // Delete customer 3
  page.once('dialog', d => d.accept());
  await customersList.clickOnDeleteCustomerButton(
    customers[2].firstName,
    customers[2].lastName
  );
});




/*test('Assert manager can sort customers and verify header UI', async ({ page }) => {
    const customersList = new CustomersListPage(page);

    await customersList.open();
    await customersList.verifyFirstNameSorting();
    await customersList.verifyLastNameSorting();
    await customersList.verifyPostalCodeSorting();
    await customersList.verifyUnderlineOnHover(customersList.firstNameHeader);
    await customersList.verifyUnderlineOnHover(customersList.lastNameHeader);
    await customersList.verifyUnderlineOnHover(customersList.postalCodeHeader);
  })*/