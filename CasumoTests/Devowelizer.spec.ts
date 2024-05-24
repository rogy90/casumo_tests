import { test, expect } from '@playwright/test';

// Observations about the service behavior:
// - The service does not remove uppercase vowels.
// - The service has issues handling special characters and accented letters.
// - The service does not remove trailing blank space.

// Tests: 23
// Passed: 17
// Failed: 6

// Some tests fail because of image, so retries are added and timeout, but still some tests fail if you run them all at once
test.setTimeout(90000);
test.describe.configure({ retries: 3 });

// 01. Testing Devowelizer service with a single vowel only
test('01 Single vowel test', async ({ request }) => {
  const response = await request.get(`/a`);
  const result = await response.text();
  console.log('Actual result:', result);
  expect(response.status()).toBe(200);
  expect(result).toBe('');
});

// 02. Testing Devowelizer service with a single consonant only
test('02 Single consonant test', async ({ request }) => {
  const response = await request.get(`/b`);
  const result = await response.text();
  console.log('Actual result:', result);
  expect(response.status()).toBe(200);
  expect(result).toBe('b');
});

// 03. Testing Devowelizer service with small letters
test('03 Small letters only test (simple word)', async ({ request }) => {
  const response = await request.get(`/busy`);
  const result = await response.text();
  console.log('Actual result:', result);
  expect(response.status()).toBe(200);
  expect(result).toBe('bsy');
});

// 04. Testing Devowelizer service with all uppercase letters
test('04 All uppercase letters test (simple word)', async ({ request }) => {
  const response = await request.get(`/BUSY`);
  const result = await response.text();
  console.log('Actual result:', result);
  expect(response.status()).toBe(200);
  expect(result).toBe('BSY');
});

/* 
Expected: "BSY"
Received: "BUSY"
Conclusion: The service does not remove vowels from uppercase words. It is only for lowercases. 
*/

// 05. Testing Devowelizer service with mixed case letters
test('05 Mixed case test (simple word)', async ({ request }) => {
  const response = await request.get(`/BusInEss`);
  const result = await response.text();
  console.log('Actual result:', result);
  expect(response.status()).toBe(200);
  expect(result).toBe('Bsnss');
});

/* 
Expected: "Bsnss"
Received: "BsInEss"
Conclusion: The service does not remove vowels from mixed uppercased and lowercased word. 
 */

// 06. Testing Devowelizer service when input contains only vowels
test('06 All vowels test (uppercase and lowercase)', async ({ request }) => {
  const response = await request.get(`/aAeEiIoOuU`);
  const result = await response.text();
  console.log('Actual result:', result);
  expect(response.status()).toBe(200);
  expect(result).toBe('');
});

/* 
Expected: ""
Received: "AEIOU"
Conclusion: The service does not recognize uppercase vowels as vowels. It only removes lowercase vowels.
 */

// 07. Testing Devowelizer service when input contains only consonants
test('07 All consonants test (uppercase and lowercase)', async ({ request }) => {
  const response = await request.get(`/bBcCdDfFgGhHjJkKlLmMnNpPqQrRsStTvVwWxXyYzZ`);
  const result = await response.text();
  console.log('Actual result:', result);
  expect(response.status()).toBe(200);
  expect(result).toBe('bBcCdDfFgGhHjJkKlLmMnNpPqQrRsStTvVwWxXyYzZ');
});

// 08. Testing Devowelizer service with an empty string
test('08 Empty string test', async ({ request }) => {
  const response = await request.get(`/`);
  const result = await response.text();
  console.log('Actual result:', result);
  expect(response.status()).toBe(200);
  expect(result).toBe('Send GET to /:input');
});

// 09. Testing Devowelizer service with digits
test('09 String with digits only test', async ({ request }) => {
  const response = await request.get(`/1234567890`);
  const result = await response.text();
  console.log('Actual result:', result);
  expect(response.status()).toBe(200);
  expect(result).toBe('1234567890');
});

// 10. Testing Devowelizer service with mixed digits and letters
test('10 String with mixed digits and letters test', async ({ request }) => {
  const response = await request.get(`/1a2b3c4d5e`);
  const result = await response.text();
  console.log('Actual result:', result);
  expect(response.status()).toBe(200);
  expect(result).toBe('12b3c4d5');
});

// 11. Testing Devowelizer service with non-ASCII characters
test('11 String with non-ASCII characters test', async ({ request }) => {
  const response = await request.get(`/你好世界`);
  const result = await response.text();
  console.log('Actual result:', result);
  expect(response.status()).toBe(200);
  expect(result).toBe('你好世界');
});

// 12. Testing Devowelizer service with emojis
test('12 String with emoji test', async ({ request }) => {
  const response = await request.get(`/new😊business`);
  const result = await response.text();
  console.log('Actual result:', result);
  expect(response.status()).toBe(200);
  expect(result).toBe('nw😊bsnss');
});

// 13. Testing Devowelizer service with leading and trailing spaces
test('13 String with leading and trailing spaces test', async ({ request }) => {
  const response = await request.get(`/ new business is incoming  `);
  const result = await response.text();
  console.log('Actual result:', result);
  expect(response.status()).toBe(200);
  expect(result).toBe(' nw bsnss i incmng  ');
});

/* Expected: " nw bsnss i incmng  "
Received: " nw bsnss s ncmng"
Conclusion: The service does not handle trailing blank space. 
 */

// 14. Testing Devowelizer service with a string that already has no vowels
test('14 Without vowels test', async ({ request }) => {
  const response = await request.get(`/bssnss`);
  const result = await response.text();
  console.log('Actual result:', result);
  expect(response.status()).toBe(200);
  expect(result).toBe('bssnss');
});

// 15. Testing Devowelizer service with various special characters
test('15 String with various special characters test', async ({ request }) => {
  const response = await request.get(`/!@#$%^&*()_+`);
  const result = await response.text();
  console.log('Actual result:', result);
  expect(response.status()).toBe(200);
  expect(result).toBe('!@#$%^&*()_+');
});

/* 
Expected: "!@#$%^&*()_+"
Received: "!@"
Conclusion: The service does not handle special characters correctly. Some special characters are ignored or removed. 
*/

// 16. Testing Devowelizer service with quoted text
test('16 String with quoted text test', async ({ request }) => {
  const response = await request.get(`/He says, "Business as usual!"`);
  const result = await response.text();
  console.log('Actual result:', result);
  expect(response.status()).toBe(200);
  expect(result).toBe('H sys, "Bsnss s sl!"');
});

// 17. Testing Devowelizer service with special characters and numbers
test('17 String with special characters and numbers test', async ({ request }) => {
  const response = await request.get(`/Th1s_1s_@_n3w_8us1n3ss!`);
  const result = await response.text();
  console.log('Actual result:', result);
  expect(response.status()).toBe(200);
  expect(result).toBe('Th1s_1s_@_n3w_8s1n3ss!');
});

// 18. Testing Devowelizer service with repeating vowels and consonants
test('18 Repeating vowels and consonants test', async ({ request }) => {
  const response = await request.get(`/businessness`);
  const result = await response.text();
  console.log('Actual result:', result);
  expect(response.status()).toBe(200);
  expect(result).toBe('bsnssnss');
});

// 19. Testing Devowelizer service with a word containing accented letters
test('19 Word with accented letters test', async ({ request }) => {
  const response = await request.get(`/businéss`);
  const result = await response.text();
  console.log('Actual result:', result);
  expect(response.status()).toBe(200);
  expect(result).toBe('bsnss');
});

/* 
Expected: "bsnss"
Received: "bsnéss"
Conclusion: The service does not recognize accented vowels (e.g., é) as vowels and does not remove them.
*/

// 20. Testing Devowelizer service with repeating consonants only
test('20 Repeating consonants string test', async ({ request }) => {
  const response = await request.get(`/bccccdddffffggg`);
  const result = await response.text();
  console.log('Actual result:', result);
  expect(response.status()).toBe(200);
  expect(result).toBe('bccccdddffffggg');
});

// 21. Testing Devowelizer service with repeating vowels only
test('21 Repeating vowels string test', async ({ request }) => {
  const response = await request.get(`/aaeeeeeiioooooouu`);
  const result = await response.text();
  console.log('Actual result:', result);
  expect(response.status()).toBe(200);
  expect(result).toBe('');
});

// 22. Testing Devowelizer service with strings containing spaces
test('22 String with spaces test', async ({ request }) => {
  const response = await request.get(`/This is a business`);
  const result = await response.text();
  console.log('Actual result:', result);
  expect(response.status()).toBe(200);
  expect(result).toBe('Ths s  bsnss');
});

// 23. Testing Devowelizer service with a long word
test('23 Long word test', async ({ request }) => {
  const response = await request.get(`/pneumonoultramicroscopicsilicovolcanoconiosis`);
  const result = await response.text();
  console.log('Actual result:', result);
  expect(response.status()).toBe(200);
  expect(result).toBe('pnmnltrmcrscpcslcvlcncnss');
});