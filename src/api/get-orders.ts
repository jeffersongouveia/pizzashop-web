import { api } from '@/lib/axios.ts'

export interface Order {
  orderId: string
  customerName: string
  status: 'pending' | 'processing' | 'delivering' | 'delivered' | 'canceled'
  total: number
  createdAt: string
}

export interface Meta {
  pageIndex: number
  perPage: number
  totalCount: number
}

export interface GetOrdersRequest {
  pageIndex: number
}

export interface GetOrdersResponse {
  orders: Order[]
  meta: Meta
}

export default async function getOrders(props: GetOrdersRequest) {
  const { data } = await api.get<GetOrdersResponse>('/orders', {
    params: props,
  })

  return data
}
