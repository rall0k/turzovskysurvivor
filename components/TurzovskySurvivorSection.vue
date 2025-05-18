<script setup>
	const i18n = useI18n()
	const { data: TurzovskySurvivorSection }  = await useAsyncData(() => queryCollection('content').path(`/${i18n.locale.value}/sections/turzovsky-survivor`).first())
	const { data: Global }  = await useAsyncData(() => queryCollection('content').path(`/${i18n.locale.value}/global`).first())
</script>

<template>
	<section class="container" :id="TurzovskySurvivorSection.body.anchor" :style="`background: radial-gradient(circle, ${TurzovskySurvivorSection.body.colors.background.center}, ${TurzovskySurvivorSection.body.colors.background.edge})`">
		<section class="sections">
			<section class="section" v-for="section in TurzovskySurvivorSection.body.sections" :key="section">
				<h1>{{ section.title }}</h1>
				<article class="text">
					<p v-for="paragraph in section.text" :key="paragraph">{{ paragraph }}</p>
				</article>
			</section>
		</section>
		<a :href="Global.body.registrationButton.url" class="registration-button">{{ Global.body.registrationButton.label }}</a>
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
