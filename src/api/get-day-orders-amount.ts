import { api } from '@/lib/axios.ts'

export interface GetDayOrdersAmountResponse {
  amount: number
  diffFromYesterday: number
}

export default async function getDayOrdersAmount() {
  const { data } = await api.get<GetDayOrdersAmountResponse>(
    '/metrics/day-orders-amount',
  )
  return data
}
