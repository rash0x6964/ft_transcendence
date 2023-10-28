import User from "./User.model";

export default interface FriendStatus {
	isSender?: boolean;
	senderID: string;
	receiverID: string;
	sender?: User
	receiver?: User
	friend?: User
}
