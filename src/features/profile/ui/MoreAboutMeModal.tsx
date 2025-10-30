import { Tag } from '@/shared/ui/Tag'
import { AnimatePresence, m } from 'framer-motion'
import { useState } from 'react'
import { useSwipeable } from 'react-swipeable'
import { communicationStyles, loveLanguages, personalityTypes } from '../model/moreAboutMeModal.data'

interface MoreAboutMeModalProps {
	open: boolean
	onClose: () => void
}

{
	/* Это можно ещё задекомпозить, но сроки поджимают */
}

export function MoreAboutMeModal({ open, onClose }: MoreAboutMeModalProps) {
	const [selectedPersonality, setSelectedPersonality] = useState<string | null>(null)
	const [selectedCommunication, setSelectedCommunication] = useState<string | null>(null)
	const [selectedLoveLanguage, setSelectedLoveLanguage] = useState<string | null>(null)

	const handlers = useSwipeable({
		onSwipedDown: () => onClose(),
		preventScrollOnSwipe: true,
		trackMouse: true
	})

	return (
		<AnimatePresence>
			{open && (
				<m.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					className='bg-opacity-50 fixed inset-0 left-1/2 z-50 flex max-w-(--max-mobile-width) -translate-x-1/2 items-end justify-center bg-black pb-12'
					onClick={onClose}
				>
					<m.div
						{...handlers}
						initial={{ y: '100%' }}
						animate={{ y: 0 }}
						exit={{ y: '100%' }}
						transition={{ type: 'tween', duration: 0.3 }}
						className='flex max-h-[90vh] w-full max-w-md flex-col overflow-hidden rounded-t-3xl bg-[#1a1a1a] text-white'
						onClick={e => e.stopPropagation()}
					>
						<div className='flex justify-center pt-3'>
							<div className='h-1 w-12 rounded-full bg-gray-600' />
						</div>

						<div className='flex items-center justify-end px-4'>
							<button onClick={onClose}>Done</button>
						</div>

						<div className='flex-1 overflow-y-auto px-4 pb-6'>
							<h1 className='mt-2 text-[34px] font-bold'>More about me</h1>
							<p className='mt-1 mb-6 text-[15px] text-gray-400'>Put your best self forward by adding more about you</p>

							<div className='mt-6'>
								<div className='mb-3 flex items-center gap-3'>
									<svg
										width='24'
										height='24'
										viewBox='0 0 24 24'
										fill='none'
										xmlns='http://www.w3.org/2000/svg'
										xmlnsXlink='http://www.w3.org/1999/xlink'
									>
										<rect width='24' height='24' fill='url(#pattern0_1_12541)' />
										<defs>
											<pattern id='pattern0_1_12541' patternContentUnits='objectBoundingBox' width='1' height='1'>
												<use xlinkHref='#image0_1_12541' transform='scale(0.0151515)' />
											</pattern>
											<image
												id='image0_1_12541'
												width='66'
												height='66'
												preserveAspectRatio='none'
												xlinkHref='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEIAAABCCAYAAADjVADoAAAACXBIWXMAACE4AAAhOAFFljFgAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAQ0SURBVHgB7ZpNbtNAFMf/z4WCYEFugDkBYccCifQEhBMQhKDscLgAzgni7mip1PQEpCcg7LprOEHNDdJNVSoljzeJ0zpuPmzHM85iflJlezqux//OvHkfBiwWi8ViScsWSuKz57uvXtZwetq7wgZAMMhHz686Dr6MGHV5cCVqDonQoxFa3wM/REkYE2K32frC4GBJl4EMxztofztGCRgRIoUINziMHZkZPRhGuxDKFowIv+TUTXlLeM140Qn8AQziQDMjcB0JERjYk//8M5YXlsvkUnC3wQ0Y5h40Q0RvOH7N6BwEvhdrauw2/afSp3bTB/QchtE+Izi5JIi6d/own8z2Sb2MCkO7EEmI+SLZxiCj9mAeqZZGw/MrDxy0kQPxGSpZLbLMouruV/8o0z0j/nMQtFLtTPNIJcRDcX7khRrIQc5tqcIZnye2qCeH3EIYXxqbihUiIv/2yejS2C3OxnDOPWITQvErOsiAOGkuxbbcdckthEylZlFB0uHEpe5luUcCuIYYoBoKwi6NCCtEhBUiwgoRYYWIsEJEWCEicvsRTPRcZZ/UuXKSfgR+HyUiTllFxlNT5xIb9YOMGa78QoC7HEVU6vCx6Q8cEm+zvGx0NUoJ4lJ+PjXVP4aCtMngwpYGRRGjGoxK26N8ZAzc+fTV/6nSCKs667ARLm2OGGrq1u+nyKXoMpYVWSa5Ejk6kDxpY2o/FvZBAYxT9kp1UT/eXlaNIgrI2rFqmnrR3n7b31l0TyEzQhnH6xHecyLEllR+KctDdrCOzIK9eBuPbcZiClsaqiAjD5/JRssW66Ik5MU6iabKdLtf0L84xEg+nbnm7ImbohjGlsWUqyWJpMKEULsEJzJGklA9Q0mQg2+JpnBZGTF1On8b8BY+lCTLDbxLNA/+Mf+GJpTwYgDr834njt5rMQq1eJvMzt6SP5chnU93FL59MOZuP3uaC7lVLBjTnLGE0tbCErTUPmV2HB+2fR+bAq/OrxbuUKlKt4jQwGYQSmFqR4rO3VUd10nn92Pp/FAE+PtIKk2B4e8aboeDgThwfXVU45LjSRoBpqyTzn+bJ8pUe/mQ6I1D4mwxLkag8y2phq8bscp4+vvBYs9xFdq/j5jiyc5z6eBo8iGZBPHRRxPqXAxxIFFiIN5pq1PSjDKSoVKz4JJwloxFZmB42xK1pgmZdWBEiCFBlfjdFF2r287ibVon2oX44Pn1ZI1ybNBUrVPqp3dukJmxKmTWgXYbsUV3lkO4NQnPQ3UxMZ44i4fMw8k9PRjExNKY/TCMeS++Q4zPefbLOtkGXRjGhBCV2QfSvGz3bBvhCQyzztJwZVqv7DRCdnhF7mDch+gJg1EUuYWYps41oVLz58u7FCeCwla6IqwQEcZc7ILhlG2pSSWE2uLEeD1DATyckzd8DHSv2KzfYLFYLBaLxWIpmP/toW05jupnMwAAAABJRU5ErkJggg=='
											/>
										</defs>
									</svg>

									<h3 className='text-base font-medium'>What’s your personality type?</h3>
								</div>
								<div className='flex flex-wrap gap-2'>
									{personalityTypes.map(type => (
										<Tag
											key={type}
											selected={selectedPersonality === type}
											onClick={() => setSelectedPersonality(type)}
											variant='outline'
										>
											{type}
										</Tag>
									))}
								</div>
							</div>

							<div className='mt-6'>
								<div className='mb-3 flex items-center gap-3'>
									<svg
										width='24'
										height='24'
										viewBox='0 0 24 24'
										fill='none'
										xmlns='http://www.w3.org/2000/svg'
										xmlnsXlink='http://www.w3.org/1999/xlink'
									>
										<rect width='24' height='24' fill='url(#pattern0_1_12577)' />
										<defs>
											<pattern id='pattern0_1_12577' patternContentUnits='objectBoundingBox' width='1' height='1'>
												<use xlinkHref='#image0_1_12577' transform='scale(0.0151515)' />
											</pattern>
											<image
												id='image0_1_12577'
												width='66'
												height='66'
												preserveAspectRatio='none'
												xlinkHref='data:image/png;base64,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'
											/>
										</defs>
									</svg>

									<h3 className='text-base font-medium'>What’s your communication style?</h3>
								</div>
								<div className='flex flex-wrap gap-2'>
									{communicationStyles.map(style => (
										<Tag
											key={style}
											selected={selectedCommunication === style}
											onClick={() => setSelectedCommunication(style)}
											variant='outline'
										>
											{style}
										</Tag>
									))}
								</div>
							</div>

							<div className='mt-6'>
								<div className='mb-3 flex items-center gap-3'>
									<svg
										width='24'
										height='24'
										viewBox='0 0 24 24'
										fill='none'
										xmlns='http://www.w3.org/2000/svg'
										xmlnsXlink='http://www.w3.org/1999/xlink'
									>
										<rect width='24' height='24' fill='url(#pattern0_1_12597)' />
										<defs>
											<pattern id='pattern0_1_12597' patternContentUnits='objectBoundingBox' width='1' height='1'>
												<use xlinkHref='#image0_1_12597' transform='scale(0.0151515)' />
											</pattern>
											<image
												id='image0_1_12597'
												width='66'
												height='66'
												preserveAspectRatio='none'
												xlinkHref='data:image/png;base64,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'
											/>
										</defs>
									</svg>

									<h3 className='text-base font-medium'>How do you receive love?</h3>
								</div>
								<div className='flex flex-wrap gap-2'>
									{loveLanguages.map(lang => (
										<Tag
											key={lang}
											selected={selectedLoveLanguage === lang}
											onClick={() => setSelectedLoveLanguage(lang)}
											variant='outline'
										>
											{lang}
										</Tag>
									))}
								</div>
							</div>
						</div>
					</m.div>
				</m.div>
			)}
		</AnimatePresence>
	)
}
