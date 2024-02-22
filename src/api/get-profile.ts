import { api } from '@/lib/axios.ts'

export interface GetProfileResponse {
  id: string
  email: string
  name: string
  phone: string
  role: 'manager' | 'customer'
  createdAt: Date | null
  updatedAt: Date | null
}

export default async function getProfile() {
  const response = await api.get<GetProfileResponse>('/me')
  return response.data
}
