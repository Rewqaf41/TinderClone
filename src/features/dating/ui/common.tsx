import { useEffect, useRef, type ReactNode } from 'react'
import { animate, createScope, stagger } from 'animejs'
import { X, Heart, ArrowUpRight } from 'lucide-react'
export function Entrance({ children, className = '' }: { children: ReactNode; className?: string }) {
	const root = useRef<HTMLDivElement>(null)
	useEffect(() => {
		const scope = createScope({ root }).add(() => {
			if (!matchMedia('(prefers-reduced-motion: reduce)').matches)
				animate('.reveal', { opacity: [0, 1], y: [18, 0], delay: stagger(65), duration: 550, ease: 'out(3)' })
		})
		return () => scope.revert()
	}, [])
	return (
		<div ref={root} className={className}>
			{children}
		</div>
	)
}
export function Modal({
	title,
	children,
	onClose,
	className = ''
}: {
	title: string
	children: ReactNode
	onClose: () => void
	className?: string
}) {
	const ref = useRef<HTMLDialogElement>(null)
	useEffect(() => {
		const dialog = ref.current!
		dialog.showModal()
		const animation = animate(dialog, {
			opacity: [0, 1],
			y: [16, 0],
			duration: matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : 280,
			ease: 'out(3)'
		})
		return () => {
			animation.revert()
			dialog.close()
		}
	}, [])
	return (
		<dialog
			ref={ref}
			className={`modal ${className}`}
			onCancel={onClose}
			onClick={e => {
				if (e.target === e.currentTarget) onClose()
			}}
			aria-label={title}
		>
			<div className='modal-content'>
				<button className='icon-button modal-close' aria-label='Закрыть' onClick={onClose}>
					<X size={20} />
				</button>
				<h2>{title}</h2>
				{children}
			</div>
		</dialog>
	)
}
export function Empty({
	title,
	text,
	action,
	onAction
}: {
	title: string
	text: string
	action?: string
	onAction?: () => void
}) {
	return (
		<div className='empty-state reveal'>
			<div className='empty-icon'>
				<Heart size={32} />
			</div>
			<h2>{title}</h2>
			<p>{text}</p>
			{action && (
				<button className='primary-button' onClick={onAction}>
					{action}
					<ArrowUpRight size={18} />
				</button>
			)}
		</div>
	)
}
export function Avatar({ src, name, className = '' }: { src: string; name: string; className?: string }) {
	return (
		<img
			className={`avatar ${className}`}
			src={src}
			alt={name}
			onError={e => {
				e.currentTarget.onerror = null
				e.currentTarget.src = '/images/fallback.svg'
			}}
		/>
	)
}
