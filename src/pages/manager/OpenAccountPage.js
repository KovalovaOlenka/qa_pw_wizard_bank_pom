import { expect } from '@playwright/test';

export class OpenAccountPage {
  constructor(page) {
    this.page = page;
    this.currencySelect = page.locator('#currency');
    this.customerSelect = page.locator('#userSelect');
    this.processButton = page.getByRole('button', { name: 'Process' });
  }

  async open() {
    await this.page.goto('/angularJs-protractor/BankingProject/#/manager/openAccount');
  }
  async chooseCurrency(currency) {
    await this.currencySelect.selectOption({ label: currency });
  }
  async verifyDropdownHasCorrectValue(currency) {
  await expect(this.currencySelect.locator('option:checked')).toHaveText(currency);
}
  
  async chooseCustomer(user) {
    await this.customerSelect.selectOption(user);
  }
  async clickOnProcessButton() {
    await this.processButton.click();
  }
}
