import { expect } from '@playwright/test';

export class BankManagerMainPage {
  constructor(page) {
    this.page = page;
    this.bankManagerLoginButton = page.getByRole('button', { name: 'Bank Manager Login' });
    this.addCustomerButton = page.getByRole('button', { name: 'Add Customer' });
    this.openAccountButton = page.getByRole('button', { name: 'Open Account' });
    this.customersButton = page.getByRole('button', { name: 'Customers' });
    
  }

  async open() {
    await this.page.goto('/angularJs-protractor/BankingProject/#/login');
  }
  async clickOnBankManagerLoginButton() {
    await this.bankManagerLoginButton.click();
  }
  async verifyAddCustomerButton() {
    await expect(this.addCustomerButton).toBeVisible();
  }
  async verifyOpenAccountButton() {
    await expect(this.openAccountButton).toBeVisible();
  }
  async verifyCustomersButton() {
    await expect(this.customersButton).toBeVisible();
  }
  async clickOnCustomersButton() {
    await this.customersButton.click();
  }
  async clickOnOpenAccountButton() {
    await this.openAccountButton.click();
  }
  
}
