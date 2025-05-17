<script setup>
	// @todo link na registraciu
	// @todo animacie
	// @todo logo
	// @todo nefunguje scroll pri navigacii na mobile

	import 'primeicons/primeicons.css'

	const i18n = useI18n()
	const { data: LayoutGlobal }  = await useAsyncData(() => queryCollection('content').path(`/${i18n.locale.value}/layout/global`).first())

	const { data: headerapp }  = await useAsyncData(() => queryCollection('content').path(`/${i18n.locale.value}/layout/header-app`).first())

	import SurvivorSection from '@/components/SurvivorSection'
	import TurzovskySurvivorSection from '@/components/TurzovskySurvivorSection'
	import RegistrationSection from '@/components/RegistrationSection'
	import ContactSection from '@/components/ContactSection'
	const sectionsMap = {
		survivor: SurvivorSection,
		turzovskysurvivor: TurzovskySurvivorSection,
		registration: RegistrationSection,
		contact: ContactSection,
	}
</script>

<template>
	<main :style="`background-image: url('${useRuntimeConfig().app.baseURL}${LayoutGlobal.body.background}')`">
		<HeaderApp />
		<HomeSection />
		<component :is="sectionsMap[name]" v-for="name in headerapp.body.menu" :key="name" />
		<!-- data-aos="fade-up" 
			data-aos-delay="200"
  			data-aos-duration="1000"  -->
	</main>
</template>

<style>
	@import url('https://fonts.googleapis.com/css2?family=Antonio:wght@100..700&display=swap');
	@font-face {
		font-family: 'SurvivorFontSK';
		src: url('SurvivorFontSK.ttf') format('truetype');
	}
	:root {
		--color01: white;
	}
	* {
		box-sizing: border-box;
		margin: 0;
		padding: 0;
	}
	html {
		scroll-behavior: smooth;
		color: #444;
		text-shadow: 1px 1px black;
		letter-spacing: 2px;
		font-size: 16px;
		line-height: 2rem;
		font-family: 'SurvivorFontSK', sans-serif;

		body {
			font-size: 1.5rem;
		}	
	}
	main {
		min-height: 100vh;
		background-position: center center;
		background-size: cover;
		background-attachment: fixed;
	}
	h1 {
		letter-spacing: 5px;
		font-size: 3rem;
		text-align: center;
	}
	.registration-button {
		background: rgba(255,255,255,.5);
		color: var(--color01);
		text-decoration: none;
		display: inline-block;
		padding: .7rem 2rem;
		border-radius: 5rem;
		transition: 250ms;
		font-size: 1.3rem;

		&:hover {
			background: rgba(255,255,255,.3);
		}
	}
	.container {
		scroll-margin-top: 108px;
		min-height: 100vh;
		padding: 5rem;
		color: var(--color01);
		background-position: center center;
		background-size: cover;
		display: flex;
		flex-direction: column;
		justify-content: center;
	}
</style>
