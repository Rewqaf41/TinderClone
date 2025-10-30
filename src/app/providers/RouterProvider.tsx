import { ProfilePage } from '@/pages/profile'
import { RegistrationPage } from '@/pages/registration'
import { SwipePage } from '@/pages/swipe'
import { WelcomePage } from '@/pages/welcome'
import { ROUTES } from '@/shared/constants/routes'
import { createBrowserRouter, RouterProvider as Provider } from 'react-router-dom'
import { MainLayout } from '../layouts/MainLayout'

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
				element: <SwipePage />
			},
			{
				path: ROUTES.PROFILE,
				element: <ProfilePage />
			}
		]
	},
	{
		path: '*',
		element: <h1 className='flex items-center justify-center text-5xl'>404</h1>
	}
])

export const RouterProvider = () => {
	return <Provider router={router} />
}
