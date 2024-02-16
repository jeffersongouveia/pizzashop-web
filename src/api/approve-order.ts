import { api } from '@/lib/axios.ts'

export default async function approveOrder(orderId: string) {
  await api.patch(`/orders/${orderId}/approve`)
}
