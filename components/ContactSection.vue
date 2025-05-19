<script setup>
	const i18n = useI18n()
	const { data: ContactSection }  = await useAsyncData(() => queryCollection('content').path(`/${i18n.locale.value}/sections/contact`).first())
</script>

<template>
	<section class="container" :id="ContactSection.body.anchor" :style="`background: radial-gradient(circle, ${ContactSection.body.colors.background.center}, ${ContactSection.body.colors.background.edge})`">
		<section class="wrap">
			<h1 data-aos="fade-left" data-aos-duration="1500">{{ ContactSection.body.title }}</h1>
			<p class="text" data-aos="fade-right" data-aos-duration="1500">{{ ContactSection.body.text }}</p>
			<section class="contact" data-aos="fade-right" data-aos-duration="1500">
				<section v-for="item in ContactSection.body.contact" :key="item">
					<a :href="`mailto:${item.mail}`" class="item" v-if="item.mail">
						<span :class="item.icon"></span>
						<span>{{ item.mail }}</span>
					</a>
					<a :href="`${item.url}`" target="__blank" class="item" v-else-if="item.url">
						<span :class="item.icon"></span>
						<span>{{ item.label }}</span>
					</a>
					<a :href="`tel:${item.phone}`" class="item" v-else-if="item.phone">
						<span :class="item.icon"></span>
						<span>{{ item.phone }}</span>
					</a>
				</section>
			</section>
		</section>
	</section>
</template>

<style scoped>
	.wrap {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 2rem;

		h1 {}
		.text {
			text-align: center;
		}
		.contact {
			display: flex;
			flex-direction: column;
			gap: 2rem;

			@media(min-width: 770px) {
				flex-direction: row;
			}
			
			& > section {
				display: flex;
				gap: 1rem;
				
				.pi {
					font-size: 2rem;
				}
				a {
					text-decoration: none;
					color: var(--color01);
				}
				.item {
					display: flex;
					align-items: center;
					gap: 1rem;
				}
			}
		}
	}
</style>
