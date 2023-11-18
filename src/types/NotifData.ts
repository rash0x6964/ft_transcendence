export default interface NotifData {
	type?: "notif" | "error" | "success" | "notice"
	message: string
	title: string
	imgSrc?: string
	buttonTitle?: string
	createdAt?: number
	buttonEvent?: () => void
}


export const defaultError = {
	type: "error",
	message: "an error occured try again !!!",
	title: "error"
}
