import { expect, test } from '@playwright/test'

test('display month revenue', async ({ page }) => {
  await page.goto('/', { waitUntil: 'networkidle' })

  const card = page.getByTestId('total-revenue-month')
  const receipt = card.getByTestId('receipt')
  const diffFromLastMonth = card.getByTestId('diff-from-last-month')

  await expect(receipt).toHaveText('$35.51')
  await expect(diffFromLastMonth).toHaveText('+3.5%')
})

test('display month orders amount', async ({ page }) => {
  await page.goto('/', { waitUntil: 'networkidle' })

  const card = page.getByTestId('orders-month')
  const amount = card.getByTestId('amount')
  const diffFromLastMonth = card.getByTestId('diff-from-last-month')

  await expect(amount).toHaveText('1,350')
  await expect(diffFromLastMonth).toHaveText('+1.2%')
})

test('display day orders amount', async ({ page }) => {
  await page.goto('/', { waitUntil: 'networkidle' })

  const card = page.getByTestId('orders-day')
  const amount = card.getByTestId('amount')
  const diffFromYesterday = card.getByTestId('diff-from-yesterday')

  await expect(amount).toHaveText('42')
  await expect(diffFromYesterday).toHaveText('-5%')
})

test('display month orders cancelled amount', async ({ page }) => {
  await page.goto('/', { waitUntil: 'networkidle' })

  const card = page.getByTestId('cancellations-month')
  const amount = card.getByTestId('amount')
  const diffFromLastMonth = card.getByTestId('diff-from-last-month')

  await expect(amount).toHaveText('54')
  await expect(diffFromLastMonth).toHaveText('-2%')
})
