import { api } from '@/lib/axios.ts'

export default async function cancelOrder(orderId: string) {
  await api.patch(`/orders/${orderId}/cancel`)
}
