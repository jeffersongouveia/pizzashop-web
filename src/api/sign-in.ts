import { api } from '@/lib/axios.ts'

export interface SignInRequest {
  email: string
}

export default async function signIn(request: SignInRequest) {
  await api.post('/authenticate', request)
}
