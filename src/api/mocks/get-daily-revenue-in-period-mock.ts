import { http, HttpResponse } from 'msw'

import { GetDailyRevenueInPeriodResponse } from '@/api/get-daily-revenue-in-period.ts'

export const getDailyRevenueInPeriodMock = http.get<
  never,
  never,
  GetDailyRevenueInPeriodResponse
>('/metrics/daily-receipt-in-period', () => {
  return HttpResponse.json([
    { date: '01/01', receipt: 24030 },
    { date: '02/01', receipt: 33055 },
    { date: '03/01', receipt: 15035 },
    { date: '04/01', receipt: 49040 },
    { date: '05/01', receipt: 67020 },
    { date: '06/01', receipt: 41090 },
    { date: '07/01', receipt: 59085 },
  ])
})
