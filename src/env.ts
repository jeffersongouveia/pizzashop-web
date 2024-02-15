import { z } from 'zod'

const envSchema = z.object({
  VITE_API_URL: z.string().url(),
  VITE_API_ENABLE_DELAY: z.string().transform((value) => value === 'true'),
  VITE_API_DELAY_TIME: z.string().transform((value) => parseInt(value, 10)),
})

const env = envSchema.parse(import.meta.env)

export default env
