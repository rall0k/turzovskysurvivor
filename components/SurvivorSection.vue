<script setup>
	const i18n = useI18n()
	
	const { data: SurvivorSection }  = await useAsyncData(() => queryCollection('content').path(`/${i18n.locale.value}/sections/survivor`).first())
</script>

<template>
	<section class="container" :id="SurvivorSection.body.anchor" :style="`background: radial-gradient(circle, ${SurvivorSection.body.colors.background.center}, ${SurvivorSection.body.colors.background.edge})`">
		<section class="wrap">
			<section class="text">
				<h1 data-aos="fade-left" data-aos-duration="1500">{{ SurvivorSection.body.title }}</h1>
				<p v-for="paragraph in SurvivorSection.body.text" :key="paragraph" data-aos="fade-right" data-aos-duration="1500">{{ paragraph }}</p>
			</section>
			<section class="challenges">
				<h1 data-aos="fade-left" data-aos-duration="1500">{{ SurvivorSection.body.subtitle }}</h1>
				<section class="video">
					<iframe v-for="video in SurvivorSection.body.video" :key="video"
						:src="`https://www.youtube.com/embed/${video}`"
						title="YouTube video player"
						frameborder="0"
						allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
						allowfullscreen
						data-aos="fade" data-aos-duration="1500"
					></iframe>
				</section>
			</section>
		</section>
	</section>
</template>

<style scoped>
	.wrap {
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
		.challenges {
			display: flex;
			gap: 2rem;
			flex-direction: column;

			.video {
				display: flex;
				flex-wrap: wrap;
				gap: 2rem;

				iframe {
					flex-grow: 1;
					height: 300px;
				}
			}
		}
	}
</style>
