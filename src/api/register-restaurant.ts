import { api } from '@/lib/axios.ts'

export interface RegisterRestaurantRequest {
  restaurantName: string
  managerName: string
  phone: string
  email: string
}

export default async function registerRestaurant(
  request: RegisterRestaurantRequest,
) {
  await api.post('/restaurants', request)
}
