import { http, HttpResponse } from 'msw'

import { GetDailyRevenueInPeriodResponse } from '@/api/get-daily-revenue-in-period.ts'

export const getDailyRevenueInPeriodMock = http.get<
  never,
  never,
  GetDailyRevenueInPeriodResponse
>('/metrics/daily-receipt-in-period', () => {
  return HttpResponse.json([
    { date: '01/01', receipt: 240 },
    { date: '02/01', receipt: 330 },
    { date: '03/01', receipt: 150 },
    { date: '04/01', receipt: 490 },
    { date: '05/01', receipt: 670 },
    { date: '06/01', receipt: 410 },
    { date: '07/01', receipt: 590 },
  ])
})
