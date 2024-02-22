import { api } from '@/lib/axios.ts'

export interface GetManagedRestaurantResponse {
  id: string
  managerId: string | null
  name: string
  description: string | null
  createdAt: Date | null
  updatedAt: Date | null
}

export default async function getManagedRestaurant() {
  const response = await api.get<GetManagedRestaurantResponse>(
    '/managed-restaurant',
  )
  return response.data
}
