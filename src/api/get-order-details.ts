import { api } from '@/lib/axios.ts'

export interface Customer {
  name: string
  email: string
  phone: string
}

export interface Product {
  name: string
}

export interface OrderItem {
  id: string
  priceInCents: number
  quantity: number
  product: Product
}

export interface GetOrderDetailsResponse {
  id: string
  status: 'pending' | 'processing' | 'delivering' | 'delivered' | 'canceled'
  totalInCents: number
  createdAt: string
  customer: Customer
  orderItems: OrderItem[]
}

export default async function getOrderDetails(orderId: string) {
  const { data } = await api.get<GetOrderDetailsResponse>(`/orders/${orderId}`)
  return data
}
