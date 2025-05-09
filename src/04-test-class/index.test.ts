// Uncomment the code below and write your tests
import {
  getBankAccount,
  BankAccount,
  InsufficientFundsError,
  // SynchronizationFailedError,
  TransferFailedError,
  SynchronizationFailedError,
} from '.';

import { random } from 'lodash';

jest.mock('lodash', () => ({
  random: jest.fn(),
}));

describe('BankAccount', () => {
  const initialBalance = 1000;

  test('should create account with initial balance', () => {
    // Write your test here
    const account = getBankAccount(initialBalance);

    expect(account).toBeInstanceOf(BankAccount);
    expect(account.getBalance()).toBe(initialBalance);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    // Write your test here
    const account = getBankAccount(initialBalance);

    expect(() => {
      account.withdraw(account.getBalance() + 1000);
    }).toThrow(InsufficientFundsError);
  });

  test('should throw error when transferring more than balance', () => {
    // Write your test here
    const account = getBankAccount(initialBalance);
    const accountToTransfer = getBankAccount(initialBalance);

    expect(() => {
      account.transfer(account.getBalance() + 1000, accountToTransfer);
    }).toThrow(InsufficientFundsError);
  });

  test('should throw error when transferring to the same account', () => {
    // Write your test here
    const account = getBankAccount(initialBalance);

    expect(() => {
      account.transfer(account.getBalance() + 1000, account);
    }).toThrow(TransferFailedError);
  });

  test('should deposit money', () => {
    // Write your test here
    const account = getBankAccount(initialBalance);
    const deposit = 2000;
    account.deposit(deposit);

    expect(account.getBalance()).toBe(initialBalance + deposit);
  });

  test('should withdraw money', () => {
    // Write your test here
    const account = getBankAccount(initialBalance);
    const withdrawAmount = 200;
    account.withdraw(withdrawAmount);

    expect(account.getBalance()).toBe(initialBalance - withdrawAmount);
  });

  test('should transfer money', () => {
    // Write your test here
    const account = getBankAccount(initialBalance);
    const accountToTransfer = getBankAccount(initialBalance);
    const transferAmount = 300;
    account.transfer(transferAmount, accountToTransfer);

    expect(account.getBalance()).toBe(initialBalance - transferAmount);
    expect(accountToTransfer.getBalance()).toBe(
      initialBalance + transferAmount,
    );
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    // Write your tests here

    const account = getBankAccount(initialBalance);

    (random as jest.Mock)
      .mockImplementationOnce(() => 77)
      .mockImplementationOnce(() => 1);

    const balance = await account.fetchBalance();

    expect(typeof balance).toBe('number');
  });

  test('synchronizeBalance should set new balance if fetchBalance returned number', async () => {
    // Write your tests here
    const account = getBankAccount(initialBalance);
    (random as jest.Mock)
      .mockImplementationOnce(() => 77)
      .mockImplementationOnce(() => 1);

    await account.synchronizeBalance();
    expect(account.getBalance()).not.toBe(initialBalance);
  });

  test('synchronizeBalance should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    // Write your tests here
    const account = getBankAccount(initialBalance);

    (random as jest.Mock)
      .mockImplementationOnce(() => 77)
      .mockImplementationOnce(() => 0);

    expect.assertions(1);
    await expect(account.synchronizeBalance()).rejects.toThrow(
      SynchronizationFailedError,
    );
  });
});
