interface Profile {
	id: string,
	rating: number,
}

export default interface User {
	id: string;
	userName: string;
	email: string;
	fullName: string;
	password: string;
	verifiedAt: Date;
	onlineStatus: boolean;
	avatarUrl: string;
	bannerUrl: string;
	createdAt: Date;
	updatedAt: Date;
	profileID: string;

	profile: Profile;
}
