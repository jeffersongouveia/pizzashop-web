import { api } from '@/lib/axios.ts'

export default async function deliverOrder(orderId: string) {
  await api.patch(`/orders/${orderId}/deliver`)
}
