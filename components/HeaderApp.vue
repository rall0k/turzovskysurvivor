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
				items: HeaderApp.value.body.menu.map((item) => ({
					...sections[item].value.body,
					command: () => {
						router.replace({ hash: `#${sections[item].value.body.anchor}` })
						window.location.href = `${window.location.origin}#${sections[item].value.body.anchor}`
					}
				}))
			}
		]
	})

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

	const onScroll = () => {
		const sections = [ 'survivor', 'turzovskysurvivor', 'registration', 'contact' ]
		for (const id of sections) {
			const el = document.getElementById(id)
			if (!el) continue
			const rect = el.getBoundingClientRect()
			// kontrolujeme, či je časť sekcie blízko hornej časti viewportu
			if (rect.top <= 110 && rect.bottom >= 110) {
				activeSection.value = id
				history.replaceState(null, null, `${useRuntimeConfig().app.baseURL}#${id}`)
				break
			}
			else {
				activeSection.value = null
				history.replaceState(null, null, `${useRuntimeConfig().app.baseURL}#`)
			}
		}
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
		<a href="#home" class="logo">
			 <i class="fa-brands fa-gripfire"></i>
			 {{ Global.body.name }}
		</a>

		<Button class="hamburger-menu-icon" type="alternate" icon="pi pi-bars" @click="toggle" aria-haspopup="true" aria-controls="overlay_menu" />
		<Menu ref="menu" id="overlay_menu" :model="navigation" :popup="true" />

		<nav>
			<a :href="`${useRuntimeConfig().app.baseURL}#${item.anchor}`" :class="{ 'active': item.anchor == activeSection }" v-for="item in navigation[0].items" :key="item">{{ item.label }}</a>
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

		a {
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
		}
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
				gap: .3rem;
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
