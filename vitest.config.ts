/// <reference types="vitest" />

import { resolve } from 'node:path'

import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import tsconfigPaths from 'vite-tsconfig-paths'
import { defineConfig } from 'vitest/config'


export default defineConfig({
	plugins: [
		tsconfigPaths({
			projects: [
				resolve(__dirname, './packages/jeditor-app'),
				resolve(__dirname, './packages/jeditor-web'),
				resolve(__dirname, './packages/jeditor-cli'),
			],
		}),
		vue(),
		vueJsx(),
	],
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
