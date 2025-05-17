<script setup>
	const i18n = useI18n()
	const container = ref(null)
	const { data: HomeSection }  = await useAsyncData(() => queryCollection('content').path(`/${i18n.locale.value}/sections/home`).first())
</script>

<template>
	<section ref="container" class="container">
		<section class="text-button">
			<section class="text">
				<p v-for="paragraph in HomeSection.body.text" :key="paragraph">{{ paragraph }}</p>
			</section>
			<a :href="HomeSection.body.button.url" class="registration-button">{{ HomeSection.body.button.label }}</a>
		</section>
		<img :src="HomeSection.body.photo" alt="">
	</section>
</template>

<style scoped>
	.container {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 2rem;
		padding: 2rem;

		@media(min-width: 600px) {
			padding: 5rem;
		}
		@media(min-width: 1200px) {
			flex-direction: row;
		}

		.text-button {
			display: flex;
			flex-direction: column;
			align-items: start;
			gap: 3rem;
			order: 2;

			@media(min-width: 1200px) {
				order: 1;
			}
			
			.text {
				display: flex;
				flex-direction: column;
				gap: 2rem;

				p {}
			}
		}
		img {
			width: clamp(250px, 50vw, 500px);
			@media(min-width: 1200px) {
				order: 2;
			}
		}
	}
</style>
