export default interface NotifData {
	type?: "notif" | "error" | "success"
	message: string
	title: string
	imgSrc?: string
	buttonTitle?: string
	buttonEvent?: () => void
}
