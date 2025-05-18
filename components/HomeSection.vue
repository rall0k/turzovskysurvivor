<script setup>
	const i18n = useI18n()
	const { data: HomeSection }  = await useAsyncData(() => queryCollection('content').path(`/${i18n.locale.value}/sections/home`).first())
	const { data: Global }  = await useAsyncData(() => queryCollection('content').path(`/${i18n.locale.value}/global`).first())

	const { countdown: eventCountdown } = useCountdown(Global.value.body.eventDatetime)
	const { countdown: registrationCountdown } = useCountdown(Global.value.body.registrationDatetime)
</script>

<template>
	<section id="home" class="container">
		<section class="text-button">
			<section class="text">
				<p v-for="paragraph in HomeSection.body.text" :key="paragraph">{{ paragraph }}</p>
			</section>
			<section class="registration-container" v-if="Global.body.registrationAllow && registrationCountdown">
				<p>{{ HomeSection.body.registrationText }} <span class="registration-countdown">{{ registrationCountdown }}</span></p>
				<a :href="Global.body.registrationButton.url" class="registration-button">{{ Global.body.registrationButton.label }}</a>
			</section>
		</section>
		<section class="event-container">
			<!-- {{ `${useRuntimeConfig().app.baseURL}${HomeSection.body.photo}` }} -->
			<img :src="`${useRuntimeConfig().app.baseURL}${HomeSection.body.photo}`" alt="">
			<section class="event-datetime-countdown" v-if="eventCountdown">
				<div class="event-datetime">{{ useDatetimeFormater(Global.body.eventDatetime) }}</div>
				<div class="event-countdown">{{ eventCountdown }}</div>
			</section>
		</section>
	</section>
</template>

<style scoped>
	.container {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 4rem;
		padding: 2rem;

		@media(min-width: 600px) {
			padding: 5rem;
		}
		@media(min-width: 1400px) {
			flex-direction: row;
		}

		.text-button {
			display: flex;
			flex-direction: column;
			align-items: start;
			gap: 3rem;
			order: 2;

			@media(min-width: 1400px) {
				order: 1;
			}
			
			.text {
				display: flex;
				flex-direction: column;
				gap: 2rem;

				p {}
			}
			.registration-container {
				display: flex;
				flex-direction: column;
				gap: 2rem;

				p {
					.registration-countdown {
						display: inline-block;
						background-color: var(--color01);
						color: #444;
						text-shadow: none;
						padding: .5rem 1rem;
						border-radius: .2rem;
						font-size: 2rem;
					}
				}
				.registration-button {
					align-self: start;
				}
			}
		}
		.event-container {
			display: flex;
			flex-direction: column;
			gap: 1rem;
			align-items: center;

			@media(min-width: 1400px) {
				order: 2;
			}
			img {
				width: clamp(250px, 50vw, 500px);
			}
			.event-datetime-countdown {
				display: flex;
				flex-direction: column;
				gap: 1rem;
				align-items: center;
				
				.event-datetime {
					font-size: 3rem;
					@media(min-width: 600px) {
						font-size: 4rem;
					}
				}
				.event-countdown {
					font-size: 2rem;
				}
			}
		}
	}
</style>
