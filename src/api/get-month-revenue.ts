import { api } from '@/lib/axios.ts'

export interface GetMonthRevenueResponse {
  receipt: number
  diffFromLastMonth: number
}

export default async function getMonthRevenue() {
  const { data } = await api.get<GetMonthRevenueResponse>(
    '/metrics/month-receipt',
  )
  return data
}
