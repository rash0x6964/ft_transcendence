
interface Attachment {
	id:        string;
	messageID: string;
	name:      string;
	url:       string;
	size:      number;
	mimeType:  string;
	type:      "IMAGE" | "VIDEO" | "FILE";
}

interface User {
	id: string;
	userName: string;
	onlineStatus: boolean;
	avatarUrl: string;
}

interface Message {
	senderID: string;
	content: string;
	attachment?: Attachment;
	createdAt: Date;
	updatedAt: Date;
}

interface ChannelUser {
	userID: string;
	channelID: string;
	role: "OWNER" | "ADMINISTRATOR" | "MEMBER";
	status: "FREE" | "MUTED" | "BANNED";
	duration: bigint;

	user?: User
	// channel?: Channel
}

interface Channel {
	id: string;
	imageUrl: string;
	name: string;
	password: string;
	visibility: "PRIVATE" | "PUBLIC" | "PROTECTED";
	channels: ChannelUser[];
	message: Message[];

	reqByOwner?: boolean;
}

interface CreateChannel {
	imageUrl: string;
	name: string;
	password?: string;
	visibility: "PRIVATE" | "PUBLIC" | "PROTECTED";
	channels?: ChannelUser[];
	message?: Message[];
}

interface JoinChannel {
	channelID: string;
  password?: string;
}


export type { Channel, ChannelUser, CreateChannel, JoinChannel };
