import { expect, test } from '@playwright/test'

test('list orders', async ({ page }) => {
  await page.goto('/orders', { waitUntil: 'networkidle' })

  const firstCustomer = page.getByRole('cell', {
    name: 'Customer 1',
    exact: true,
  })
  const lastCustomer = page.getByRole('cell', {
    name: 'Customer 10',
    exact: true,
  })

  await expect(firstCustomer).toBeVisible()
  await expect(lastCustomer).toBeVisible()
})

test('paginate orders', async ({ page }) => {
  await page.goto('/orders', { waitUntil: 'networkidle' })

  const getCustomer = (name: string) =>
    page.getByRole('cell', { name, exact: true })

  await page.getByRole('button', { name: 'Next page' }).click()
  await expect(getCustomer('Customer 11')).toBeVisible()
  await expect(getCustomer('Customer 20')).toBeVisible()

  await page.getByRole('button', { name: 'Last page' }).click()
  await expect(getCustomer('Customer 51')).toBeVisible()
  await expect(getCustomer('Customer 60')).toBeVisible()

  await page.getByRole('button', { name: 'Previous page' }).click()
  await expect(getCustomer('Customer 41')).toBeVisible()
  await expect(getCustomer('Customer 50')).toBeVisible()

  await page.getByRole('button', { name: 'First page' }).click()
  await expect(getCustomer('Customer 1')).toBeVisible()
  await expect(getCustomer('Customer 10')).toBeVisible()
})

test('filter by order id', async ({ page }) => {
  await page.goto('/orders', { waitUntil: 'networkidle' })

  await page.getByPlaceholder('ID').fill('42')
  await page.getByRole('button', { name: 'Filter results' }).click()

  await expect(page.getByRole('cell', { name: 'Customer 42' })).toBeVisible()
})

test('filter by client name', async ({ page }) => {
  await page.goto('/orders', { waitUntil: 'networkidle' })

  await page.getByPlaceholder('Client name').fill('42')
  await page.getByRole('button', { name: 'Filter results' }).click()

  await expect(page.getByRole('cell', { name: 'Customer 42' })).toBeVisible()
})

test('filter by status', async ({ page }) => {
  await page.goto('/orders', { waitUntil: 'networkidle' })

  await page.getByRole('combobox').click()
  await page.getByLabel('Pending').click()
  await page.getByRole('button', { name: 'Filter results' }).click()

  const tableRows = page.getByRole('cell', { name: 'Pending' })
  await expect(tableRows).toHaveCount(10)
})
