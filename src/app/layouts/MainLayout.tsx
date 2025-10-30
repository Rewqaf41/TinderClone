import { TabBar } from '@/widgets/TabBar'
import { Outlet } from 'react-router-dom'
import { ProtectedRoute } from './ProtectedRoute'

export function MainLayout() {
	return (
		<>
			<ProtectedRoute>
				<Outlet />
				<TabBar />
			</ProtectedRoute>
		</>
	)
}
