import { useEffect, useState } from 'react'
import { initialState, type DemoState } from './data'
const KEY = 'tinder-portfolio-v2'
const LEGACY_KEY = 'mello-demo-v1'
function load(): DemoState {
	try {
		const saved = JSON.parse(localStorage.getItem(KEY) || localStorage.getItem(LEGACY_KEY) || 'null')
		if (
			!saved ||
			!Array.isArray(saved.decisions) ||
			!Array.isArray(saved.matches) ||
			!saved.profile ||
			!saved.filters ||
			!saved.messages
		)
			return initialState
		return {
			...initialState,
			...saved,
			profile: {
				...initialState.profile,
				...saved.profile,
				photos: Array.isArray(saved.profile.photos)
					? saved.profile.photos
					: [saved.profile.photo || initialState.profile.photo]
			},
			filters: { ...initialState.filters, ...saved.filters }
		}
	} catch {
		return initialState
	}
}
export function useDemo() {
	const [state, setState] = useState<DemoState>(load)
	const [storageError, setStorageError] = useState(false)
	useEffect(() => {
		let active = true
		try {
			localStorage.setItem(KEY, JSON.stringify(state))
		} catch {
			// Report a failed external write after synchronization completes.
			queueMicrotask(() => {
				if (active) setStorageError(true)
			})
		}
		return () => {
			active = false
		}
	}, [state])
	return { state, setState, storageError }
}
