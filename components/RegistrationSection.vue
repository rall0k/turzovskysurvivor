<script setup>
	const i18n = useI18n()
	const { data: RegistrationSection }  = await useAsyncData(() => queryCollection('content').path(`/${i18n.locale.value}/sections/registration`).first())
	const { data: Global }  = await useAsyncData(() => queryCollection('content').path(`/${i18n.locale.value}/global`).first())
</script>

<template>
	<section class="container" :id="RegistrationSection.body.anchor" :style="`background: radial-gradient(circle, ${RegistrationSection.body.colors.background.center}, ${RegistrationSection.body.colors.background.edge})`">
		<h1>{{ RegistrationSection.body.title }}</h1>
		<section class="text">
			<p v-for="paragraph in RegistrationSection.body.text" :key="paragraph">{{ paragraph }}</p>
		</section>
		<a :href="Global.body.registrationButton.url" class="registration-button">{{ Global.body.registrationButton.label }}</a>
	</section>
</template>

<style scoped>
	.container {
		display: flex;
		flex-direction: column;
		gap: 2rem;

		h1 {}
		.text {
			display: flex;
			flex-direction: column;
			gap: 2rem;

			p {}
		}
		.registration-button {
			align-self: center;
		}
	}
</style>
