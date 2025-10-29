import { RegistrationPage } from '@/pages/registration'
import { SwipePage } from '@/pages/swipe'
import { WelcomePage } from '@/pages/welcome'
import { ROUTES } from '@/shared/constants/routes'
import { createBrowserRouter, RouterProvider as Provider } from 'react-router-dom'
import { MainLayout } from '../layouts/MainLayout'
import { ProtectedRoute } from '../layouts/ProtectedRoute'

const router = createBrowserRouter([
	{
		index: true,
		path: ROUTES.HOME,
		element: <WelcomePage />
	},
	{
		path: ROUTES.REGISTRATION,
		element: <RegistrationPage />
	},
	{
		element: <MainLayout />,
		children: [
			{
				path: ROUTES.SWIPE,
				element: (
					<ProtectedRoute>
						<SwipePage />
					</ProtectedRoute>
				)
			}
		]
	}
])

export const RouterProvider = () => {
	return <Provider router={router} />
}
