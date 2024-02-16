import { api } from '@/lib/axios.ts'

export interface GetMonthCanceledOrdersAmountResponse {
  amount: number
  diffFromLastMonth: number
}

export default async function getMonthCanceledOrdersAmount() {
  const { data } = await api.get<GetMonthCanceledOrdersAmountResponse>(
    '/metrics/month-canceled-orders-amount',
  )
  return data
}
