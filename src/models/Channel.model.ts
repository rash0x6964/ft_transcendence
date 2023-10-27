import Message from "./Message.model";


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

export type { Channel, ChannelUser };
