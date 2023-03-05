import path from 'path'

import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import AutoImport from 'unplugin-auto-import/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import Components from 'unplugin-vue-components/vite'
import { defineConfig } from 'vite'
import Checker from 'vite-plugin-checker'

export default defineConfig({
	plugins: [
		vue(),
		vueJsx(),
		AutoImport({
			resolvers: [ElementPlusResolver()],
		}),
		Components({
			include: [/\.vue$/, /\.vue\?vue/, /\.vue\?v=/, /\.[jt]sx$/],
			resolvers: [ElementPlusResolver()],
		}),
		Checker({
			typescript: true,
		}),
	],
	resolve: {
		alias: {
			core: path.resolve(__dirname, './src/core'),
			extensions: path.resolve(__dirname, './src/extensions'),
			shared: path.resolve(__dirname, './src/shared'),
			settings: path.resolve(__dirname, './src/settings'),
		},
	},
	base: './',
	build: {
		sourcemap: true,
	},
	css: {
		preprocessorOptions: {
			scss: {
				additionalData: `@import "@jeditor/style-tool";`,
			},
		},
	},
})
