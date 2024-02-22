import { expect, test } from '@playwright/test'

test('sign up successfully', async ({ page }) => {
  await page.goto('/sign-up', { waitUntil: 'networkidle' })

  await page.getByLabel('Restaurant name').fill('Pizza Shop')
  await page.getByLabel('Manager name').fill('John Doe')
  await page.getByLabel('Phone').fill('123456789')
  await page.getByLabel('Email').fill('johndoe@example.com')

  await page.getByRole('button', { name: 'Sign up' }).click()

  const toast = page.getByText('Link for sign in sent to your email!')
  await expect(toast).toBeVisible()
})

test('sign up with wrong credentials', async ({ page }) => {
  await page.goto('/sign-up', { waitUntil: 'networkidle' })

  await page.getByLabel('Restaurant name').fill('Wrong Restaurant')
  await page.getByLabel('Manager name').fill('John Doe')
  await page.getByLabel('Phone').fill('123456789')
  await page.getByLabel('Email').fill('johndoe@example.com')

  await page.getByRole('button', { name: 'Sign up' }).click()

  const toast = page.getByText('Something went wrong.')
  await expect(toast).toBeVisible()
})

test('navigate to sign in page', async ({ page }) => {
  await page.goto('/sign-up', { waitUntil: 'networkidle' })
  await page.getByRole('link', { name: 'I already have an account' }).click()

  expect(page.url()).toContain('/sign-in')
})
