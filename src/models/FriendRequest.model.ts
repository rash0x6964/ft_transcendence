import User from "./User.model";

export default interface FriendRequests {
	senderID: string;
	receiverID: string;
	sender?: [User]
	receiver?: [User]
}
