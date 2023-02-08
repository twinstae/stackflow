import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin'

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [vue(), vueJsx(), vanillaExtractPlugin({
		esbuildOptions: {
			external: ["@seed-design", "@stackflow"],
		},
	})],
	resolve: {
		alias: {
			'vue': 'vue/dist/vue.esm-bundler.js',
			'@': fileURLToPath(new URL('./src', import.meta.url)),
			'@stackflow/plugin-renderer-basic-vue': fileURLToPath(new URL('../extensions/plugin-renderer-basic-vue/src', import.meta.url)),
			'@stackflow/plugin-basic-ui-vue': fileURLToPath(new URL('../extensions/plugin-basic-ui-vue/src', import.meta.url)),
		}
	}
})
