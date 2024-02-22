import { expect, test } from '@playwright/test'

test('sign in successfully', async ({ page }) => {
  await page.goto('/sign-in', { waitUntil: 'networkidle' })
  await page.getByLabel('Email').fill('johndoe@example.com')
  await page.getByRole('button', { name: 'Login' }).click()

  const toast = page.getByText('Link for sign in sent to your')
  await expect(toast).toBeVisible()
})

test('sign in with wrong credentials', async ({ page }) => {
  await page.goto('/sign-in', { waitUntil: 'networkidle' })
  await page.getByLabel('Email').fill('wrong@example.com')
  await page.getByRole('button', { name: 'Login' }).click()

  const toast = page.getByText('Invalid credentials')
  await expect(toast).toBeVisible()
})

test('navigate to register new restaurant', async ({ page }) => {
  await page.goto('/sign-in', { waitUntil: 'networkidle' })
  await page.getByRole('link', { name: "I don't have an account" }).click()

  expect(page.url()).toContain('/sign-up')
})
