<script setup>
	const i18n = useI18n()

	const { data: Global }  = await useAsyncData(() => queryCollection('content').path(`/${i18n.locale.value}/global`).first())

	const { data: HeaderApp }  = await useAsyncData(() => queryCollection('content').path(`/${i18n.locale.value}/layout/header-app`).first())

	const { data: survivor }  = await useAsyncData(() => queryCollection('content').path(`/${i18n.locale.value}/sections/survivor`).first())
	const { data: turzovskysurvivor }  = await useAsyncData(() => queryCollection('content').path(`/${i18n.locale.value}/sections/turzovsky-survivor`).first())
	const { data: registration }  = await useAsyncData(() => queryCollection('content').path(`/${i18n.locale.value}/sections/registration`).first())
	const { data: contact }  = await useAsyncData(() => queryCollection('content').path(`/${i18n.locale.value}/sections/contact`).first())
	let sections = { survivor, turzovskysurvivor, registration, contact }
	
	const menu = ref()
	const toggle = (event) => {
		menu.value.toggle(event)
	}
	const router = useRouter()

	const navigation = computed(() => {
		if (!HeaderApp.value?.body?.menu) return []

		return [
			{
				items: HeaderApp.value.body.menu.map((item) => {
					const anchor = sections[item]?.value?.body?.anchor || ''
					const label = sections[item]?.value?.body?.label || item

					return {
						label,
						anchor,
						command: () => {
							navigate(anchor)
						}
					}
				})
			}
		]
	})
	const navigate = (anchor) => {
		const el = document.getElementById(anchor)
		if (el) {
			el.scrollIntoView({ behavior: 'smooth' })
			activeSection.value = anchor
			history.replaceState(null, null, `#${anchor}`)
		}
		menu.value.hide()
	}

	const isScrolled = ref(false)

	const handleScroll = () => {
		isScrolled.value = window.scrollY > 10
	}

	onMounted(() => {
		window.addEventListener('scroll', handleScroll)
	})

	onUnmounted(() => {
		window.removeEventListener('scroll', handleScroll)
	})

	const activeSection = ref(null)

	let scrollTimeout = null

	const onScroll = () => {
		if (scrollTimeout) clearTimeout(scrollTimeout)
		scrollTimeout = setTimeout(() => {
			const sectionIds = HeaderApp.value.body.menu
			let found = false

			for (const id of sectionIds) {
				const el = document.getElementById(id)
				if (!el) continue

				const rect = el.getBoundingClientRect()

				// podmienka: časť sekcie musí byť v dohľade
				if (rect.top <= 110 && rect.bottom >= 110) {
					if (activeSection.value !== id) {
						activeSection.value = id
						history.replaceState(null, '', `#${id}`)
					}
					found = true
					break
				}
			}

			// ak sa nenašla žiadna aktívna sekcia
			if (!found && activeSection.value !== null) {
				activeSection.value = null
				history.replaceState(null, '', '#')
			}
		}, 100)
	}

	onMounted(() => {
		window.addEventListener('scroll', onScroll)
		onScroll() // kontrola hneď po načítaní
	})

	onBeforeUnmount(() => {
		window.removeEventListener('scroll', onScroll)
	})
</script>

<template>
	<header :class="{'header-app': true, 'scrolled': isScrolled}">
		<span @click="navigate('home')" class="logo menu-item">
			 <i class="fa-brands fa-gripfire"></i>
			 {{ Global.body.name }}
		</span>

		<!-- <Button class="hamburger-menu-icon" type="alternate" icon="pi pi-bars" @click="toggle" aria-haspopup="true" aria-controls="overlay_menu" /> -->
		<span class="hamburger-menu-icon pi pi-bars" @click="toggle" aria-haspopup="true" aria-controls="overlay_menu"></span>
		<Menu ref="menu" id="overlay_menu" :model="navigation" :popup="true" />

		<nav>
			<span @click="navigate(item.anchor)" :class="{ 'active': item.anchor == activeSection, 'menu-item': true }" v-for="item in navigation[0].items" :key="item">{{ item.label }}</span>
		</nav>
	</header>
</template>

<style>
	#overlay_menu_0 {
		display: none;
	}
	.p-menu-item-label {
		text-shadow: none;
		font-size: 1.4rem;
		color: #444;
	}
	.p-button {
		&:hover {
			background: none;
			border: none;
		}
	}
</style>

<style scoped>
	@keyframes flame {
		0%   { color: #ff6b6b; }   /* svetločervená */
		25%  { color: #ff922b; }   /* oranžová */
		50%  { color: #ffd43b; }   /* žltá */
		75%  { color: #ff922b; }   /* späť oranžová */
		100% { color: #ff6b6b; }   /* späť svetločervená */
	}
	.header-app {
		z-index: 20;
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

		.menu-item {
			display: inline-block;
			text-decoration: none;
			font-size: 1.4rem;
			color: var(--color01);
		}
		.logo {
			display: flex;
			align-items: center;
			gap: .5rem;
			
			.fa-gripfire {
				font-size: 2rem;
				animation: flame 3s infinite ease-in-out;
			}

			&:hover {
				cursor: pointer;
			}
		}
		.hamburger-menu-icon {
			background: none;
			border: none;
			color: var(--color01);

			&:hover {
				cursor: pointer;
			}

			@media(min-width: 1200px) {
				display: none;
			}
		}
		
		nav {
			display: none;

			@media(min-width: 1200px) {
				display: flex;
				gap: .3rem;
			}

			span {
				padding: .4rem 1.5rem;
				border-radius: 5rem;
				transition: 250ms;

				&.active, &:hover {
					cursor: pointer;
					background: rgba(255, 255, 255, .3);
				}
			}
		}
	}
</style>
