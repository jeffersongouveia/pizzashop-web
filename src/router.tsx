import { createBrowserRouter } from 'react-router-dom'

import LayoutApp from '@/pages/_layouts/LayoutApp.tsx'
import LayoutAuth from '@/pages/_layouts/LayoutAuth.tsx'
import Dashboard from '@/pages/app/dashboard/Dashboard.tsx'
import Orders from '@/pages/app/orders/Orders.tsx'
import SignIn from '@/pages/auth/SignIn.tsx'
import SignUp from '@/pages/auth/SignUp.tsx'
import Error from '@/pages/Error.tsx'
import NotFound from '@/pages/NotFound.tsx'

export default createBrowserRouter([
  {
    path: '/',
    element: <LayoutApp />,
    errorElement: <Error />,
    children: [
      { path: '/', element: <Dashboard /> },
      { path: '/orders', element: <Orders /> },
    ],
  },
  {
    path: '/',
    element: <LayoutAuth />,
    children: [
      { path: '/sign-in', element: <SignIn /> },
      { path: '/sign-up', element: <SignUp /> },
    ],
  },
  {
    path: '*',
    element: <NotFound />,
  },
])
