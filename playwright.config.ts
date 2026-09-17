import { defineConfig } from '@playwright/test'
export default defineConfig({
	testDir: './tests',
	fullyParallel: false,
	workers: 1,
	timeout: 60000,
	use: {
		baseURL: 'http://localhost:3000',
		channel: 'chrome',
		viewport: { width: 390, height: 844 },
		screenshot: 'only-on-failure'
	},
	webServer: { command: 'bun run dev', url: 'http://localhost:3000', reuseExistingServer: true }
})
