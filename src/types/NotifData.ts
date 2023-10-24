export default interface NotifData {
	type?: "notif" | "error"
	message: string
	title: string
	imgSrc?: string
	buttonTitle?: string
	buttonEvent?: () => void
}
