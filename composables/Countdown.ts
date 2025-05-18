export const useCountdown = (target: Date | string | number) => {
	const countdown = ref('')
	const interval = ref<NodeJS.Timer | null>(null)

	const targetDate = new Date(target)

	const updateCountdown = () => {
		const now = new Date()
		const diff = targetDate.getTime() - now.getTime()

		if (diff <= 0) {
			countdown.value = null
			return
		}

		const days = Math.floor(diff / (1000 * 60 * 60 * 24))
		const hours = Math.floor((diff / (1000 * 60 * 60)) % 24)
		const minutes = Math.floor((diff / (1000 * 60)) % 60)
		const seconds = Math.floor((diff / 1000) % 60)

		countdown.value = `${days}d ${hours}h ${minutes}m ${seconds}s`
	}

	onMounted(() => {
		updateCountdown()
		interval.value = setInterval(updateCountdown, 1000)
	})

	onUnmounted(() => {
		if (interval.value) clearInterval(interval.value)
	})

	return {
		countdown,
	}
}
