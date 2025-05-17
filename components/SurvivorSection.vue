<script setup>
	const i18n = useI18n()
	
	const { data: SurvivorSection }  = await useAsyncData(() => queryCollection('content').path(`/${i18n.locale.value}/sections/survivor-section`).first())
</script>

<template>
	<section class="container">
		test
	</section>
</template>

<style scoped></style>
