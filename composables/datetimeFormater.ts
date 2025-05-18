export const useDatetimeFormater = (isoDate) => {
	const date = new Date(isoDate)

	if (isNaN(date.getTime())) return 'Neplatný dátum'

	const pad = (n: number) => n.toString().padStart(2, '0')

	const day = pad(date.getDate())
	const month = pad(date.getMonth() + 1)
	const year = date.getFullYear()
	const hours = pad(date.getHours())
	const minutes = pad(date.getMinutes())

	return `${day}.${month}.${year} ${hours}:${minutes}`
}
