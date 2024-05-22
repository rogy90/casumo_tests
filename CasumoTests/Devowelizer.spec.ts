import { test, expect } from '@playwright/test';


//Test word is mostly "business"
test('Basic functionality test', async ({ request }) => {
  const response = await request.get(`/business`);
  expect(response.status()).toBe(200);
  expect(await response.text()).toBe('bsnss');
});

test('Mixed upper and lower case test', async ({ request }) => {
  const response = await request.get(`/BusInEss`);
  expect(response.status()).toBe(200);
  expect(await response.text()).toBe('BsInEss');
});

test('Without vowels test', async ({ request }) => {
  const response = await request.get(`/bssnss`);
  expect(response.status()).toBe(200);
  expect(await response.text()).toBe('bssnss');
});