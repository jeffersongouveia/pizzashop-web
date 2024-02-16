import { DateRange } from 'react-day-picker'

import { api } from '@/lib/axios.ts'

export type GetDailyRevenueInPeriodResponse = {
  date: string
  receipt: number
}[]

export default async function getDailyRevenueInPeriod(
  request: DateRange | undefined,
) {
  const { data } = await api.get<GetDailyRevenueInPeriodResponse>(
    '/metrics/daily-receipt-in-period',
    { params: request },
  )

  return data
}
