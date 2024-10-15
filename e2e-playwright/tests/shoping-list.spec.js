const { test, expect } = require("@playwright/test");

test("Main page has expected title and link.", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveTitle("Shared shopping lists");
  await expect(page.locator(`a >> text="Lists"`)).toHaveText("Lists");
});

test("Shopping list page has expected headings", async ({ page }) => {
  await page.goto("/lists");
  await expect(page.locator("h1")).toHaveText("Shopping List");
  await expect(page.locator("h2")).toHaveText(["Create a shopping List", "Active shopping Lists"]);
});

test("Can create a shopping list.", async ({ page }) => {
  await page.goto("/lists");
  const listName1 = `Shopping list: ${Math.random()}`;
  await page.locator('input[type="text"][name="name"]').type(listName1);
  await page.locator('input[type="submit"][name="nameSubmit"]').click();
  await expect(page.locator(`a >> text='${listName1}'`)).toHaveText(listName1);
});

test("Viewing individual shopping lists.", async ({ page }) => {
  await page.goto("/lists");
  const listName2 = `Shopping list: ${Math.random()}`;
  await page.locator('input[type="text"][name="name"]').type(listName2);
  await page.locator('input[type="submit"][name="nameSubmit"]').waitFor();
  await page.locator('input[type="submit"][name="nameSubmit"]').click();  
  await page.locator(`a >> text=${listName2}`).click();
  await expect(page.locator("h1")).toHaveText(listName2);
});

test("Can add an item.", async ({ page }) => {
  await page.goto("/lists");
  const listName3 = `Shopping list: ${Math.random()}`;
  await page.locator('input[type="text"][name="name"]').type(listName3);
  await page.locator('input[type="submit"][name="nameSubmit"]').waitFor();
  await page.locator('input[type="submit"][name="nameSubmit"]').click();  
  await page.locator(`a >> text=${listName3}`).click();
  const itemName1 = `Item list: ${Math.random()}`;
  await page.locator('input[type="text"][name="name"]').type(itemName1);
  await page.locator('input[type="submit"][name="nameSubmit"]').waitFor();
  await page.locator('input[type="submit"][name="nameSubmit"]').click();  
  await expect(page.locator(`a >> text='${itemName1}'`)).toHaveText(itemName1);
});
