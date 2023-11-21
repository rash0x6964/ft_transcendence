import ProfileData from "./ProfileData.model"

interface Profile {
	id: string
	level: number
	rating: number
}

export default interface User {
	id: string
	userName: string
	email: string
	fullName: string
	password: boolean
	verifiedAt: Date
	onlineStatus: boolean
	avatarUrl: string
	bannerUrl: string
	createdAt: Date
	updatedAt: Date
	profileID: string
	twoFactorAuthEnabled: any
	profile: Profile
	state: string
}
