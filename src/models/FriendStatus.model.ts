import User from "./User.model";

export default interface FriendStatus {
	isSender?:boolean;
	senderID: string;
	receiverID: string;
	blockStatus: "BOTH" | "NONE" | "SENDER" | "RECEIVER";
	muteStatus: "BOTH" | "NONE" | "SENDER" | "RECEIVER";
	sender?: User
	receiver?: User
	friend?:User
}
