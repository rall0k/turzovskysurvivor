<script setup>
	import 'primeicons/primeicons.css'
</script>

<template>
	<HeaderApp />
	<HomeSection />
	<SurvivorSection />
</template>

<style>
	:root {
		--color01: white;
	}
	@font-face {
		font-family: 'SurvivorFontSK';
		src: url('SurvivorFontSK.ttf') format('truetype');
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
		min-height: 100vh;
		padding: 5rem;
		color: var(--color01);
		background-position: center center;
		background-size: cover;
	}
	* {
		box-sizing: border-box;
		margin: 0;
		padding: 0;
	}
	html {
		color: #444;
		font-size: 16px;
		line-height: 2rem;
		font-family: 'SurvivorFontSK', sans-serif;

		body {
			font-size: 1.5rem;
		}	
	}
</style>
