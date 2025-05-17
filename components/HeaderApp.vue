<script setup>
	const i18n = useI18n()
	
	const { data: HeaderApp }  = await useAsyncData(() => queryCollection('content').path(`/${i18n.locale.value}/layout/header-app`).first())
	
	const menu = ref()
	const toggle = (event) => {
		menu.value.toggle(event)
	}

	const navigation = computed(() => {
		if (!HeaderApp.value?.body?.menu) return []

		return [
			{
				items: HeaderApp.value.body.menu.map((item) => ({
					...item,
					command: () => {
						navigateTo(`#${item.anchor}`)
					}
				}))
			}
		]
	})

	const isScrolled = ref(false)

	const handleScroll = () => {
		console.log(window.scrollY)
		isScrolled.value = window.scrollY > 10
	}

	onMounted(() => {
		window.addEventListener('scroll', handleScroll)
	})

	onUnmounted(() => {
		window.removeEventListener('scroll', handleScroll)
	})
</script>

<template>
	<header :class="{'header-app': true, 'scrolled': isScrolled}">
		<a href="" class="logo">Turzovský Survivor</a>

		<Button class="hamburger-menu-icon" type="alternate" icon="pi pi-bars" @click="toggle" aria-haspopup="true" aria-controls="overlay_menu" />
		<Menu ref="menu" id="overlay_menu" :model="navigation" :popup="true" />

		<nav>
			<a :href="`#${item.anchor}`" v-for="item in navigation[0].items" :key="item">{{ item.label }}</a>
		</nav>
	</header>
</template>

<style>
	#overlay_menu_0 {
		display: none;
	}
	.p-menu-item-label {
		font-size: 1.4rem;
		color: #444;
	}
</style>

<style scoped>
	.header-app {
		position: absolute;
		padding: 2rem 3rem;
		display: flex;
		flex-direction: row;
		gap: 1rem;
		align-items: center;
		justify-content: space-between;
		width: 100%;
		transition: 250ms;

		&.scrolled {
			position: fixed;
			background-color: rgba(0, 0, 0, 0.8);
			backdrop-filter: blur(4px);
		}

		@media(min-width: 1200px) {
			padding: 2rem 5rem;
		}

		a {
			display: inline-block;
			text-decoration: none;
			font-size: 1.4rem;
			color: var(--color01);
		}
		.logo {}
		.hamburger-menu-icon {
			background: none;
			border: none;

			@media(min-width: 1200px) {
				display: none;
			}
		}
		
		nav {
			display: none;

			@media(min-width: 1200px) {
				display: flex;
			}

			a {
				padding: .4rem 1.5rem;
				border-radius: 5rem;
				transition: 250ms;

				&.active, &:hover {
					background: rgba(255, 255, 255, .3);
				}
			}
		}
	}
</style>
