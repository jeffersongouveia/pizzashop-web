import { api } from '@/lib/axios.ts'

export default async function signOut() {
  await api.post('/sign-out')
}
