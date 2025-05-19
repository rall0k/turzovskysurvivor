<script setup>
	const i18n = useI18n()
	const { data: TurzovskySurvivorSection }  = await useAsyncData(() => queryCollection('content').path(`/${i18n.locale.value}/sections/turzovsky-survivor`).first())
	const { data: Global }  = await useAsyncData(() => queryCollection('content').path(`/${i18n.locale.value}/global`).first())
	const { countdown: registrationCountdown } = useCountdown(Global.value.body.registrationDatetime)
</script>

<template>
	<section class="container" :id="TurzovskySurvivorSection.body.anchor" :style="`background: radial-gradient(circle, ${TurzovskySurvivorSection.body.colors.background.center}, ${TurzovskySurvivorSection.body.colors.background.edge})`">
		<section class="wrap">
			<section class="sections">
				<section class="section" v-for="section in TurzovskySurvivorSection.body.sections" :key="section">
					<h1 data-aos="fade-left" data-aos-duration="1500">{{ section.title }}</h1>
					<article class="text">
						<p v-for="paragraph in section.text" :key="paragraph" data-aos="fade-right" data-aos-duration="1500">{{ paragraph }}</p>
					</article>
				</section>
				<section class="section" v-if="Global.body.registrationAllow && registrationCountdown" data-aos="fade-right" data-aos-duration="1500">
					<div class="text registration-text">
						{{ TurzovskySurvivorSection.body.registrationText }} <span>{{ registrationCountdown }}</span>
					</div>
				</section>
			</section>
			<a data-aos="fade" data-aos-duration="1500" :href="Global.body.registrationButton.url" target="__blank" class="registration-button" v-if="Global.body.registrationAllow && registrationCountdown">{{ Global.body.registrationButton.label }}</a>
		</section>
	</section>
</template>

<style scoped>
	.wrap {
		display: flex;
		flex-direction: column;
		align-items: start;
		gap: 4rem;
		
		.sections {
			display: flex;
			flex-direction: column;
			gap: 2rem;

			.section {
				display: flex;
				flex-direction: column;
				gap: 2rem;

				h1 {}
				.text {
					display: flex;
					flex-direction: column;
					gap: 2rem;

					&.registration-text {
						display: inline-block;
						
						span {
							text-shadow: none;
							background: var(--color01);
							color: #444;
							padding: .2rem .5rem;
							border-radius: 2px;
						}
					}

					p {}
				}
			}
		}
		.registration-button {
			align-self: center;
		}
	}
</style>
