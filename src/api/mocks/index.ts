import { setupWorker } from 'msw/browser'

import { registerRestaurantMock } from '@/api/mocks/register-restaurant-mock.ts'
import { signInMock } from '@/api/mocks/sign-in-mock.ts'
import env from '@/env.ts'

export const worker = setupWorker(signInMock, registerRestaurantMock)

export async function enableMSW() {
  if (env.MODE !== 'test') {
    return
  }

  await worker.start()
}
