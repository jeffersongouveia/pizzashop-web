import { http, HttpResponse } from 'msw'

import { GetMonthCanceledOrdersAmountResponse } from '@/api/get-month-canceled-orders-amount.ts'

export const getMonthCanceledOrdersAmountMock = http.get<
  never,
  never,
  GetMonthCanceledOrdersAmountResponse
>('/metrics/month-canceled-orders-amount', () => {
  return HttpResponse.json({
    amount: 54,
    diffFromLastMonth: -2,
  })
})
