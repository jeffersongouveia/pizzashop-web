import { api } from '@/lib/axios.ts'

interface Profile {
  id: string
  email: string
  name: string
  phone: string
  role: 'manager' | 'customer'
  createdAt: Date | null
  updatedAt: Date | null
}

export default async function getProfile() {
  const response = await api.get<Profile>('/me')
  return response.data
}
