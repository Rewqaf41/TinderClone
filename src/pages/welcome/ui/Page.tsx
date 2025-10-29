import { ROUTES } from '@/shared/constants/routes'
import { Button } from '@/shared/ui'
import { useNavigate } from 'react-router-dom'

const rules = [
	{
		title: 'Be yourself',
		text: 'Make sure your photos, age and bio are true to who you are.'
	},
	{
		title: 'Stay safe',
		text: (
			<>
				Don’t be too quick to give out personal information.{' '}
				<a href='#' className='text-info underline'>
					Date safely
				</a>
				.
			</>
		)
	},
	{
		title: 'Play it cool',
		text: 'Respect others and treat them as you would like to be treated.'
	},
	{
		title: 'Be proactive',
		text: 'Always report bad behaviour.'
	}
]

export function WelcomePage() {
	const navigate = useNavigate()
	const handleNext = () => {
		navigate(ROUTES.REGISTRATION)
	}
	return (
		<div className='bg-background text-text-primary mt-16 flex flex-col items-center px-7'>
			<div className='w-full'>
				<h1 className='mb-1 text-center text-[28px] font-bold'>Welcome to Tinder</h1>
				<p className='text-text-secondary text-center text-[17px]'>Please follow these house rules</p>

				<ul className='mt-[25px] flex flex-col justify-start gap-4'>
					{rules.map((rule, i) => (
						<li key={i} className='flex items-start gap-4'>
							<svg className='mt-1 h-4 w-4 shrink-0' viewBox='0 0 16 16' fill='none' xmlns='http://www.w3.org/2000/svg'>
								<path
									fillRule='evenodd'
									clipRule='evenodd'
									d='M12.32 1.7855C12.8742 2.18647 12.9628 2.97761 12.5108 3.49118L4.75996 12.2993L0.33653 7.86391C-0.144269 7.38181 -0.104658 6.59022 0.421868 6.15853C0.880631 5.78239 1.54997 5.8159 1.9689 6.23595L4.64488 8.91916L10.7697 1.95898C11.1645 1.51027 11.8357 1.43516 12.32 1.7855Z'
									fill='#FF4458'
								/>
							</svg>

							<div className=''>
								<p className='text-[17px] font-semibold'>{rule.title}</p>
								<p className='text-text-secondary text-[15px] leading-5'>{rule.text}</p>
							</div>
						</li>
					))}
				</ul>

				<Button onClick={handleNext} className='mt-4 text-[19px]' fullWidth>
					I Agree
				</Button>
			</div>
		</div>
	)
}
