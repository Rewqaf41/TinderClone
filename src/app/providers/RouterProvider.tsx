import { RegistrationPage } from '@/pages/registration'
import { WelcomePage } from '@/pages/welcome'
import { ROUTES } from '@/shared/constants/routes'
import { createBrowserRouter, RouterProvider as Provider } from 'react-router-dom'

const router = createBrowserRouter([
	{
		index: true,
		path: ROUTES.HOME,
		element: <WelcomePage />
	},
	{
		path: ROUTES.REGISTRATION,
		element: <RegistrationPage />
	}
])

export const RouterProvider = () => {
	return <Provider router={router} />
}
