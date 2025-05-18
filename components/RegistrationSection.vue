<script setup>
	const i18n = useI18n()
	const { data: RegistrationSection }  = await useAsyncData(() => queryCollection('content').path(`/${i18n.locale.value}/sections/registration`).first())
	const { data: Global }  = await useAsyncData(() => queryCollection('content').path(`/${i18n.locale.value}/global`).first())
	const { countdown: registrationCountdown } = useCountdown(Global.value.body.registrationDatetime)
</script>

<template>
	<section v-if="Global.body.registrationAllow && registrationCountdown" class="container" :id="RegistrationSection.body.anchor" :style="`background: radial-gradient(circle, ${RegistrationSection.body.colors.background.center}, ${RegistrationSection.body.colors.background.edge})`">
		<h1>{{ RegistrationSection.body.title }}</h1>
		<section class="text">
			<p v-for="paragraph in RegistrationSection.body.text" :key="paragraph">{{ paragraph }}</p>
			<p>{{ RegistrationSection.body.registrationText }} <span class="registration-countdown">{{ registrationCountdown }}</span></p>
		</section>
		<a :href="Global.body.registrationButton.url" class="registration-button">{{ Global.body.registrationButton.label }}</a>
	</section>
	<section v-if="!Global.body.registrationAllow || !registrationCountdown" class="container" :id="RegistrationSection.body.anchor" :style="`background: radial-gradient(circle, ${RegistrationSection.body.colors.background.center}, ${RegistrationSection.body.colors.background.edge})`">
		<h1>{{ RegistrationSection.body.registrationDisabled.title }}</h1>
		<p class="text">{{ RegistrationSection.body.registrationDisabled.text }}</p>
	</section>
</template>

<style scoped>
	.container {
		display: flex;
		flex-direction: column;
		gap: 4rem;

		h1 {}
		.text {
			display: flex;
			flex-direction: column;
			gap: 2rem;

			p {}
		}
		.registration-countdown {
			text-shadow: none;
			background: var(--color01);
			color: #444;
			padding: .2rem .5rem;
			border-radius: 2px;
		}
		.registration-button {
			align-self: center;
		}
	}
</style>
