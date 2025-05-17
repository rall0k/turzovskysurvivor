<script setup>
	const i18n = useI18n()
	const { data: RegistrationSection }  = await useAsyncData(() => queryCollection('content').path(`/${i18n.locale.value}/sections/registration`).first())
</script>

<template>
	<section class="container">
		<h1>{{ RegistrationSection.body.title }}</h1>
		<section class="text">
			<p v-for="paragraph in RegistrationSection.body.text" :key="paragraph">{{ paragraph }}</p>
		</section>
		<a class="registration-button" :href="RegistrationSection.body.button.url">{{ RegistrationSection.body.button.label }}</a>
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
