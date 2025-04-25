//@ts-check
import { test, expect } from '@playwright/test';
const LOCALHOST_URL = 'http://localhost:5173';
const CAT_PREFIX_IMAGE_URL = 'https://cataas.com';

test('app shows random fact and image', async ({ page }) => {
  await page.goto(LOCALHOST_URL);

  // Obtén el locator del párrafo
  const text = page.locator('p');

  // Espera que el párrafo tenga algún texto
  await expect(text).toHaveText(/.+/);

  // Obtén la imagen
  const image = await page.getByRole('img');

  // Imprime el texto y la imagen
  const textContent = await text.textContent();  // Obtén el contenido del texto
  const imageSrc = await image.getAttribute('src');  // Obtén el atributo 'src' de la imagen
  console.log("texto que recibe si encuentra el paragraph:  " + textContent);
  console.log("imagen:  " + imageSrc);

  // Realiza las expectativas sobre el texto y la imagen
  await expect(textContent?.length).toBeGreaterThan(0);
  await expect(imageSrc?.startsWith(CAT_PREFIX_IMAGE_URL)).toBeTruthy();
});
