<script setup>
	const i18n = useI18n()
	const { data: TurzovskySurvivorSection }  = await useAsyncData(() => queryCollection('content').path(`/${i18n.locale.value}/sections/turzovsky-survivor`).first())
</script>

<template>
	<section class="container">
		<section class="sections">
			<section class="section" v-for="section in TurzovskySurvivorSection.body.sections" :key="section">
				<h1>{{ section.title }}</h1>
				<article class="text">
					<p v-for="paragraph in section.text" :key="paragraph">{{ paragraph }}</p>
				</article>
			</section>
		</section>
		<a class="registration-button" :href="TurzovskySurvivorSection.body.button.url">{{ TurzovskySurvivorSection.body.button.label }}</a>
	</section>
</template>

<style scoped>
	.container {
		display: flex;
		flex-direction: column;
		align-items: start;
		gap: 4rem;
		
		.sections {
			display: flex;
			flex-direction: column;
			gap: 4rem;

			.section {
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
			}
		}
		.registration-button {
			align-self: center;
		}
	}
</style>
