import axios from 'axios'

import env from '@/env.ts'

export const api = axios.create({
  baseURL: env.VITE_API_URL,
  withCredentials: true,
})

if (env.VITE_API_ENABLE_DELAY) {
  api.interceptors.request.use(async (config) => {
    await new Promise((resolve) =>
      setTimeout(resolve, Math.round(Math.random() * env.VITE_API_DELAY_TIME)),
    )
    return config
  })
}
