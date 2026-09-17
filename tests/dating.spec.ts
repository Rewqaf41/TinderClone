import { expect, test } from '@playwright/test'

test('welcome, name, passions and photos complete registration', async ({ page }) => {
	await page.goto('/')
	await expect(page.getByRole('heading', { name: 'Welcome to Tinder' })).toBeVisible()
	await expect(page.getByRole('navigation')).toHaveCount(0)
	await page.getByRole('button', { name: 'I Agree' }).click()
	await page.getByRole('textbox', { name: 'First name' }).fill('Alex')
	await page.getByRole('button', { name: 'Continue', exact: true }).click()
	await expect(page.getByRole('heading', { name: 'Passions' })).toBeVisible()
	await page.getByRole('button', { name: 'Travel', exact: true }).click()
	await page.getByRole('button', { name: /Continue \(/ }).click()
	await expect(page.getByRole('heading', { name: 'Add your photos' })).toBeVisible()
	await page.getByRole('button', { name: 'Start matching' }).click()
	await expect(page).toHaveURL(/swipe/)
	await page.goto('/')
	await expect(page.locator('.dating-card')).toBeVisible()
})

test('swipe, match, standalone chat and persistence', async ({ page }) => {
	const errors: string[] = []
	page.on('pageerror', e => errors.push(e.message))
	await page.goto('/swipe')
	await page.getByRole('button', { name: 'Like', exact: true }).click()
	await expect(page.getByRole('dialog', { name: 'It’s a Match!' })).toBeVisible()
	await page.getByRole('button', { name: 'Send a message' }).click()
	await expect(page.getByRole('navigation')).toHaveCount(0)
	await page.getByRole('textbox', { name: 'Message', exact: true }).fill('Hey! Coffee this weekend?')
	await page.getByRole('button', { name: 'SEND', exact: true }).click()
	await page.reload()
	await expect(page.locator('.bubble').last()).toHaveText('Hey! Coffee this weekend?')
	await page.getByRole('button', { name: 'Back to messages' }).click()
	await expect(page.getByRole('heading', { name: 'New matches' })).toBeVisible()
	expect(errors).toEqual([])
})

test('rewind, filters, and empty state', async ({ page }) => {
	await page.goto('/swipe')
	await page.getByRole('button', { name: 'Pass', exact: true }).click()
	await expect(page.getByRole('heading', { name: 'София 24' })).toBeVisible()
	await page.getByRole('button', { name: 'Rewind' }).click()
	await expect(page.getByRole('heading', { name: 'Анна 25' })).toBeVisible()
	await page.getByRole('button', { name: 'Discovery settings' }).click()
	await page.getByLabel('Age from').fill('30')
	await page.getByRole('button', { name: 'Apply filters' }).click()
	await expect(page.getByRole('heading', { name: 'You’re all caught up' })).toBeVisible()
	await page.getByRole('button', { name: 'Start again' }).click()
	await expect(page.locator('.dating-card')).toBeVisible()
})

test('profile edit, preview, details and photos persist', async ({ page }) => {
	await page.goto('/profile')
	await page.getByRole('button', { name: 'Edit profile', exact: true }).click()
	await expect(page.locator('.photo-slot')).toHaveCount(9)
	await page.getByRole('textbox', { name: 'Name', exact: true }).fill('Alex')
	await page.getByRole('textbox', { name: 'About me' }).fill('Coffee, music, mountains.')
	await page.getByRole('button', { name: /More about me/ }).click()
	await page.getByRole('button', { name: 'INTJ', exact: true }).click()
	await page.getByRole('button', { name: 'Better in person', exact: true }).click()
	await page.getByRole('dialog').getByRole('button', { name: 'Done', exact: true }).click()
	await page.getByRole('button', { name: 'Preview', exact: true }).click()
	await expect(page.getByRole('heading', { name: 'Alex 27' })).toBeVisible()
	await page.getByRole('button', { name: 'Edit', exact: true }).click()
	await page.getByRole('button', { name: 'Remove photo 2' }).click()
	await expect(page.locator('.photo-slot.filled')).toHaveCount(1)
	await page.locator('input[type=file]').setInputFiles('public/images/coffee.jpg')
	await expect(page.locator('.photo-slot.filled')).toHaveCount(2)
	await page.reload()
	await expect(page.getByRole('textbox', { name: 'Name', exact: true })).toHaveValue('Alex')
	await expect(page.locator('.photo-slot.filled')).toHaveCount(2)
	await page.getByRole('button', { name: /More about me/ }).click()
	await expect(page.getByRole('button', { name: 'INTJ', exact: true })).toHaveAttribute('aria-pressed', 'true')
	await page.keyboard.press('Escape')
	await expect(page.getByRole('dialog')).toHaveCount(0)
})

test('Explore categories and verified badge preview', async ({ page }) => {
	await page.goto('/explore')
	await page.getByRole('button', { name: /Get photo verified/ }).click()
	await page.getByRole('button', { name: 'Preview verified badge' }).click()
	await expect(page.getByText('VERIFIED', { exact: true })).toBeVisible()
	await page.getByRole('button', { name: 'Coffee date', exact: true }).click()
	await expect(page).toHaveURL(/vibe=coffee/)
	await expect(page.locator('.dating-card')).toBeVisible()
})

test('reference layout stays phone sized and actions fit small screens', async ({ page }) => {
	await page.goto('/swipe')
	await expect(page.locator('.app-shell')).toHaveCSS('background-color', 'rgb(17, 20, 24)')
	for (const viewport of [
		{ width: 390, height: 844 },
		{ width: 320, height: 568 },
		{ width: 1440, height: 1000 }
	]) {
		await page.setViewportSize(viewport)
		expect((await page.locator('.app-shell').boundingBox())!.width).toBeLessThanOrEqual(390)
		expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true)
		const like = await page.getByRole('button', { name: 'Like', exact: true }).boundingBox()
		const nav = await page.getByRole('navigation', { name: 'Main navigation' }).boundingBox()
		expect(like!.y + like!.height).toBeLessThan(nav!.y)
	}
	await page.setViewportSize({ width: 390, height: 844 })
	await page.screenshot({ path: 'test-results/reference-swipe.png', fullPage: true, animations: 'disabled' })
})

test('photo navigation and pointer swipe', async ({ page }) => {
	await page.goto('/swipe')
	await page.getByRole('button', { name: 'Next photo' }).click()
	await expect(page.locator('.profile-photo')).toHaveAttribute('src', '/images/coffee.jpg')
	const card = (await page.locator('.dating-card').boundingBox())!
	await page.mouse.move(card.x + card.width / 2, card.y + card.height / 2)
	await page.mouse.down()
	await page.mouse.move(card.x + card.width / 2 - 130, card.y + card.height / 2, { steps: 10 })
	await page.mouse.up()
	await expect(page.getByRole('heading', { name: 'София 24' })).toBeVisible()
})
