import { useState } from 'react'
import { useSwipeable } from 'react-swipeable'

const SLIDES = [
	{
		title: 'Tinder Platinum™',
		description: 'Level up every action you take on Tinder'
	},
	{
		title: 'Priority Likes',
		description: 'Be seen first when you send likes to others'
	},
	{
		title: 'See Who Likes You',
		description: 'Get instant matches and save time swiping'
	},
	{
		title: 'Unlimited Likes',
		description: 'Like as many profiles as you want without limits'
	},
	{
		title: 'Message Before Matching',
		description: 'Stand out with a message before you match'
	}
]

export function TinderPlatinumSlider() {
	const [currentSlide, setCurrentSlide] = useState(0)

	const nextSlide = () => setCurrentSlide(prev => (prev + 1) % SLIDES.length)
	const prevSlide = () => setCurrentSlide(prev => (prev - 1 + SLIDES.length) % SLIDES.length)

	const handlers = useSwipeable({
		onSwipedLeft: nextSlide,
		onSwipedRight: prevSlide,
		preventScrollOnSwipe: true,
		trackMouse: true
	})

	return (
		<div
			{...handlers}
			className='before:bg-background fixed bottom-12 left-1/2 z-20 flex h-[45vh] w-full max-w-(--max-mobile-width) -translate-x-1/2 flex-col justify-end overflow-hidden bg-black text-white select-none before:absolute before:top-0 before:left-0 before:h-20 before:w-full before:rounded-b-[50%]'
		>
			<div className='relative z-10 px-6 pb-20 text-center'>
				<h2 className='mb-2 text-[18px] font-semibold'>{SLIDES[currentSlide].title}</h2>
				<p className='text-[14px] leading-6 text-[#B9BFC8]'>{SLIDES[currentSlide].description}</p>
			</div>

			<div className='relative z-10 mb-6 flex justify-center gap-2'>
				{SLIDES.map((_, index) => (
					<button key={index} onClick={() => setCurrentSlide(index)} className='transition-all duration-300'>
						<div
							className={`h-2 w-2 rounded-full transition-all duration-300 ${
								index === currentSlide ? 'bg-white' : 'bg-white/30'
							}`}
						/>
					</button>
				))}
			</div>

			<div className='relative z-10 flex justify-center px-6 pb-6'>
				<button className='bg-background rounded-full px-6 py-3 text-[14px] font-semibold text-white transition-all hover:bg-[#2A2F38] active:scale-[0.98]'>
					GET TINDER PLATINUM™
				</button>
			</div>
		</div>
	)
}
