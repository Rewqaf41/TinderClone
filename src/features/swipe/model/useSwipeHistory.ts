import type { IProfile } from '@/entities/profile'
import { useCallback, useState } from 'react'

export const useSwipeHistory = () => {
	const [history, setHistory] = useState<IProfile[]>([])

	const addToHistory = useCallback((profile: IProfile) => {
		setHistory(prev => [...prev, profile])
	}, [])

	const getLastProfile = useCallback(() => {
		return history[history.length - 1]
	}, [history])

	const removeLastFromHistory = useCallback(() => {
		setHistory(prev => prev.slice(0, -1))
	}, [])

	const canRewind = history.length > 0

	return {
		history,
		addToHistory,
		getLastProfile,
		removeLastFromHistory,
		canRewind
	}
}
