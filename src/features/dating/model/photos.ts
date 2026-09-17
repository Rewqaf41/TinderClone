export async function readPhoto(file: File): Promise<string> {
	if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type))
		throw new Error('Choose a JPG, PNG or WebP photo.')
	if (file.size > 5 * 1024 * 1024) throw new Error('Choose a photo smaller than 5 MB.')
	const url = URL.createObjectURL(file)
	try {
		const image = new Image()
		image.src = url
		await image.decode()
		const scale = Math.min(1, 800 / Math.max(image.width, image.height))
		const canvas = document.createElement('canvas')
		canvas.width = image.width * scale
		canvas.height = image.height * scale
		const context = canvas.getContext('2d')
		if (!context) throw new Error('Photo could not be processed.')
		context.drawImage(image, 0, 0, canvas.width, canvas.height)
		return canvas.toDataURL('image/jpeg', 0.78)
	} finally {
		URL.revokeObjectURL(url)
	}
}
