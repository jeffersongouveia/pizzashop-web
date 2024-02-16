import { api } from '@/lib/axios.ts'

export type GetPopularProductsResponse = {
  product: string
  amount: number
}[]

export default async function getPopularProducts() {
  const { data } = await api.get<GetPopularProductsResponse>(
    '/metrics/popular-products',
  )

  return data
}
