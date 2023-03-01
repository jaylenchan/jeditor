/// <reference types="vitest" />

import { defineConfig } from 'vitest/config'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
	plugins: [vue()],
	test: {
		globals: true,
		includeSource: ['packages/**/src/**/*.ts'],
		include: ['packages/**/__tests__/*.test.ts'],
		environmentMatchGlobs: [
			['packages/jeditor-app/**/__tests__/*.test.ts', 'node'],
			['packages/jeditor-cli/**/__tests__/*.test.ts', 'node'],
			['packages/jeditor-web/**/__tests__/*.test.ts', 'jsdom'],
		],
	},
})
