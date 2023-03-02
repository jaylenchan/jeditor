import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import vueJsx from '@vitejs/plugin-vue-jsx'
import checker from 'vite-plugin-checker'
import path from 'path'

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
		checker({
			typescript: true,
		}),
	],
	resolve: {
		alias: {
			core: path.resolve(__dirname, './src/core'),
			extensions: path.resolve(__dirname, './src/extensions'),
			common: path.resolve(__dirname, './src/common'),
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
