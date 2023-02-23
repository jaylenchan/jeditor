/// <reference types="vitest" />

import { defineConfig } from 'vitest/config'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  test: {
    globals: true,
    include: ['app/**/__tests__/*.test.ts', 'web/**/__tests__/*.test.ts'],
    environmentMatchGlobs: [
      ['app/**/__tests__/*.test.ts', 'node'],
      ['web/**/__tests__/*.test.ts', 'jsdom'],
    ],
  },
})
