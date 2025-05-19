<script setup>
	const i18n = useI18n()
	const { data: RegistrationSection }  = await useAsyncData(() => queryCollection('content').path(`/${i18n.locale.value}/sections/registration`).first())
	const { data: Global }  = await useAsyncData(() => queryCollection('content').path(`/${i18n.locale.value}/global`).first())
	const { countdown: registrationCountdown } = useCountdown(Global.value.body.registrationDatetime)
</script>

<template>
	<section v-if="Global.body.registrationAllow && registrationCountdown" class="container" :id="RegistrationSection.body.anchor" :style="`background: radial-gradient(circle, ${RegistrationSection.body.colors.background.center}, ${RegistrationSection.body.colors.background.edge})`">
		<section class="wrap">
			<section class="title-text">
				<h1 data-aos="fade-left" data-aos-duration="1500">{{ RegistrationSection.body.title }}</h1>
				<section class="text">
					<p v-for="paragraph in RegistrationSection.body.text" :key="paragraph" data-aos="fade-right" data-aos-duration="1500">{{ paragraph }}</p>
					<p data-aos="fade-right" data-aos-duration="1500">{{ RegistrationSection.body.registrationText }} <span class="registration-countdown">{{ registrationCountdown }}</span></p>
				</section>
			</section>
			<a data-aos="fade" data-aos-duration="1500" :href="Global.body.registrationButton.url" target="__blank" class="registration-button">{{ Global.body.registrationButton.label }}</a>
		</section>
	</section>
	<section v-if="!Global.body.registrationAllow || !registrationCountdown" class="container registration-disabled" :id="RegistrationSection.body.anchor" :style="`background: radial-gradient(circle, ${RegistrationSection.body.colors.background.center}, ${RegistrationSection.body.colors.background.edge})`">
		<section class="wrap">
			<h1 data-aos="fade-left" data-aos-duration="1500">{{ RegistrationSection.body.registrationDisabled.title }}</h1>
			<p class="text" data-aos="fade-right" data-aos-duration="1500">{{ RegistrationSection.body.registrationDisabled.text }}</p>
		</section>
	</section>
</template>

<style scoped>
	.wrap {
		display: flex;
		flex-direction: column;
		gap: 4rem;

		&.registration-disabled {
			gap: 2rem;
		}
		.title-text {
			display: flex;
			flex-direction: column;
			gap: 2rem;
		}
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
