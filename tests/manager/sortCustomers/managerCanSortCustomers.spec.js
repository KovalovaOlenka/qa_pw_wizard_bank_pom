import { test } from '@playwright/test';
import { CustomersListPage } from '../../../src/pages/manager/CustomersListPage';


test('Assert manager can sort customers by clicking on FirstName header', async ({ page }) => {
    const customersList = new CustomersListPage(page);

    await customersList.open();
    await customersList.verifyFirstNameSorting();
    await customersList.verifyLastNameSorting();
    await customersList.verifyPostalCodeSorting();
    await customersList.verifyUnderlineOnHover(customersList.firstNameHeader);
    await customersList.verifyUnderlineOnHover(customersList.lastNameHeader);
    await customersList.verifyUnderlineOnHover(customersList.postalCodeHeader);
  })