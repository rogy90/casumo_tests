import { test, expect } from '@playwright/test';


test.setTimeout(120000); 

test.describe.configure({ retries: 3 });

// Testing basic functionality of Devowelizer service with small letters
test('Small letters only test', async ({ request }) => {
  const response = await request.get(`/busy`);
  const result = await response.text();
  console.log('Actual result:', result);
  expect(response.status()).toBe(200);
  expect(result).toBe('bsy');
});

// Testing basic functionality of Devowelizer service with all uppercase letters
test('All uppercase letters test', async ({ request }) => {
  const response = await request.get(`/BUSY`);
  const result = await response.text();
  console.log('Actual result:', result);
  expect(response.status()).toBe(200);
  expect(result).toBe('BSY');
});

// Testing Devowelizer service when input contains only vowels
test('All vowels test', async ({ request }) => {
  const response = await request.get(`/aAeEiIoOuU`);
  const result = await response.text();
  console.log('Actual result:', result);
  expect(response.status()).toBe(200);
  expect(result).toBe('');
});

// Testing Devowelizer service with a string that already has no vowels
test('Without vowels test', async ({ request }) => {
  const response = await request.get(`/bssnss`);
  const result = await response.text();
  console.log('Actual result:', result);
  expect(response.status()).toBe(200);
  expect(result).toBe('bssnss');
});

// Testing basic functionality of Devowelizer service with mixed case letters
test('Mixed case test', async ({ request }) => {
  const response = await request.get(`/BusInEss`);
  const result = await response.text();
  console.log('Actual result:', result);
  expect(response.status()).toBe(200);
  expect(result).toBe('BsInEss');
});

// Testing Devowelizer service when input contains only consonants
test('All consonants test', async ({ request }) => {
  const response = await request.get(`/bBcCdDfFgGhHjJkKlLmMnNpPqQrRsStTvVwWxXyYzZ`);
  const result = await response.text();
  console.log('Actual result:', result);
  expect(response.status()).toBe(200);
  expect(result).toBe('bBcCdDfFgGhHjJkKlLmMnNpPqQrRsStTvVwWxXyYzZ');
});

// Testing Devowelizer service with an empty string
test('Empty string test', async ({ request }) => {
  const response = await request.get(`/`);
  const result = await response.text();
  console.log('Actual result:', result);
  expect(response.status()).toBe(200);
  expect(result).toBe('Send GET to /:input');
});

// Testing Devowelizer service with various special characters
test('String with various special characters test', async ({ request }) => {
  const response = await request.get(`/!@#$%^&*()_+`);
  const result = await response.text();
  console.log('Actual result:', result);
  expect(response.status()).toBe(200);
  expect(result).toBe('!@#$%^&*()_+');
});

// Testing Devowelizer service with special characters and numbers
test('String with special characters and numbers test', async ({ request }) => {
  const response = await request.get(`/Th1s_1s_@_n3w_8us1n3ss!`);
  const result = await response.text();
  console.log('Actual result:', result);
  expect(response.status()).toBe(200);
  expect(result).toBe('Th1s_1s_@_n3w_8s1n3ss!');
});

// Testing Devowelizer service with repeating vowels
test('Repeating vowels test', async ({ request }) => {
  const response = await request.get(`/businesses`);
  const result = await response.text();
  console.log('Actual result:', result);
  expect(response.status()).toBe(200);
  expect(result).toBe('bssnss');
});

// Testing Devowelizer service with repeating consonants
test('Repeating consonants test', async ({ request }) => {
  const response = await request.get(`/businessness`);
  const result = await response.text();
  console.log('Actual result:', result);
  expect(response.status()).toBe(200);
  expect(result).toBe('bssnssnss');
});

// Testing Devowelizer service with a word containing accented letters
test('Word with accented letters test', async ({ request }) => {
  const response = await request.get(`/businéss`);
  const result = await response.text();
  console.log('Actual result:', result);
  expect(response.status()).toBe(200);
  expect(result).toBe('bsnss');
});

// Testing Devowelizer service with repeating consonants only
test('Repeating consonants string test', async ({ request }) => {
  const response = await request.get(`/bccccdddffffggg`);
  const result = await response.text();
  console.log('Actual result:', result);
  expect(response.status()).toBe(200);
  expect(result).toBe('bccccdddffffggg');
});

// Testing Devowelizer service with repeating vowels only
test('Repeating vowels string test', async ({ request }) => {
  const response = await request.get(`/aaeeeeeiioooooouu`);
  const result = await response.text();
  console.log('Actual result:', result);
  expect(response.status()).toBe(200);
  expect(result).toBe('');
});

// Testing Devowelizer service with strings containing spaces
test('String with spaces test', async ({ request }) => {
  const response = await request.get(`/This is a business`);
  const result = await response.text();
  console.log('Actual result:', result);
  expect(response.status()).toBe(200);
  expect(result).toBe('Ths s  bsnss');
});

// Testing Devowelizer service with strings containing tabs and new lines
test('String with tabs and new lines test', async ({ request }) => {
  const response = await request.get(`/New\tBusiness\n`);
  const result = await response.text();
  console.log('Actual result:', result);
  expect(response.status()).toBe(200);
  expect(result).toBe('Nw\tBssnss\n');
});

// Testing Devowelizer service with a long word
test('Long word test', async ({ request }) => {
  const response = await request.get(`/pneumonoultramicroscopicsilicovolcanoconiosis`);
  const result = await response.text();
  console.log('Actual result:', result);
  expect(response.status()).toBe(200);
  expect(result).toBe('pnmnltrmcrscpcslcvlcncns');
});

// Testing Devowelizer service with a single vowel only
test('Single vowel test', async ({ request }) => {
  const response = await request.get(`/a`);
  const result = await response.text();
  console.log('Actual result:', result);
  expect(response.status()).toBe(200);
  expect(result).toBe('');
});

// Testing Devowelizer service with a single consonant only
test('Single consonant test', async ({ request }) => {
  const response = await request.get(`/b`);
  const result = await response.text();
  console.log('Actual result:', result);
  expect(response.status()).toBe(200);
  expect(result).toBe('b');
});
