import DirectMessage from "./DM.model";
import User from "./User.model";

interface Attachment {

}

interface Message {
	id: string,
	sender: User,
	senderID: string,
	directmessage?: DirectMessage,
	directmessageID?: string,
	channel?: Channel,
	channelID?: string,
	content: string,
	attachment?: Attachment,
	createdAt: Date,
	updatedAt: Date,
}

interface ChannelUser {
	userID: string;
	channelID: string;
	role: "OWNER" | "ADMINISTRATOR" | "MEMBER";
	status: "FREE" | "MUTED" | "BANNED";
	duration: bigint;
}

interface Channel {
	id: string;
	imageUrl: string;
	name: string;
	password: string;
	visibility: "PRIVATE" | "PUBLIC" | "PROTECTED";
	channels: ChannelUser[];
	message: Message[];
}

export type { Channel, ChannelUser, Message };
