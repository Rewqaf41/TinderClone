import { domAnimation, LazyMotion } from 'framer-motion'
import { QueryProvider } from './providers/QueryProvider'
import { RouterProvider } from './providers/RouterProvider'

function App() {
	return (
		<QueryProvider>
			<LazyMotion features={domAnimation}>
				<RouterProvider />
			</LazyMotion>
		</QueryProvider>
	)
}

export default App
