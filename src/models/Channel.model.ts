import Message from "./Message.model"
import User from "./User.model"

interface ChannelUser {
	userID: string
	channelID: string
	role: "OWNER" | "ADMINISTRATOR" | "MEMBER"
	status: "FREE" | "MUTED" | "BANNED"
	duration: number
	joinedAt: Date

	user?: User
	channel?: Channel
}

interface Channel {
	id: string
	imageUrl: string
	name: string
	password: string
	visibility: "PRIVATE" | "PUBLIC" | "PROTECTED"
	channels: ChannelUser[]
	message: Message[]

	role?: "OWNER" | "ADMINISTRATOR" | "MEMBER"
	isMemeber?: boolean
	muteDuration?: number
}

interface CreateChannel {
	imageUrl: string
	name: string
	password?: string
	visibility: "PRIVATE" | "PUBLIC" | "PROTECTED"
}

interface JoinChannel {
	channelID: string
	password?: string
}

interface leaveChannel {
	channelID?: string
}

export type { Channel, ChannelUser, CreateChannel, JoinChannel, leaveChannel }
