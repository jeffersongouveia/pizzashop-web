import { expect, test } from '@playwright/test'

test('update profile successfully', async ({ page }) => {
  await page.goto('/', { waitUntil: 'networkidle' })

  await page.getByRole('button', { name: 'Pizza Shop' }).click()
  await page.getByRole('menuitem', { name: 'Store profile' }).click()

  await page.getByLabel('Name').fill('Hamburguer Shop')
  await page.getByRole('button', { name: 'Save' }).click()

  await page.waitForLoadState('networkidle')

  const toast = page.getByText('Profile updated!')
  await expect(toast).toBeVisible()

  await page.getByRole('button', { name: 'Close' }).click()
  const updatedProfile = page.getByRole('button', {
    name: 'Hamburguer Shop',
  })
  await expect(updatedProfile).toBeVisible()
})
