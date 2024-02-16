import { api } from '@/lib/axios.ts'

export interface GetMonthOrdersAmountResponse {
  amount: number
  diffFromLastMonth: number
}

export default async function getMonthOrdersAmount() {
  const { data } = await api.get<GetMonthOrdersAmountResponse>(
    '/metrics/month-orders-amount',
  )
  return data
}
