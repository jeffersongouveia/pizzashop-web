import { api } from '@/lib/axios.ts'

export interface UpdateProfileRequest {
  name: string
  description: string | null
}

export default async function updateProfile(request: UpdateProfileRequest) {
  await api.put('/profile', request)
}
