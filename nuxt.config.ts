// https://nuxt.com/docs/api/configuration/nuxt-config
import Material from '@primeuix/themes/material'

export default defineNuxtConfig({
	ssr: true,
	target: 'static',
	runtimeConfig: {
    public: {
			siteUrl: 'https://rall0k.github.io'
		}
	},
	app: {
		baseURL: process.env.NODE_ENV === 'production' ? '/turzovskysurvivor/' : ''
	},
	compatibilityDate: '2025-05-15',
	devtools: { enabled: true },
	modules: ['@nuxtjs/i18n', '@primevue/nuxt-module', '@nuxt/content', 'nuxt-aos'],
	primevue: {
		options: {
			theme: {
				preset: Material
			}
		}
	},
	i18n: {
		strategy: 'no-prefix',
		defaultLocale: 'sk',
		locales: [
			{ code: 'sk', file: 'sk.json' },
		]
	}
})