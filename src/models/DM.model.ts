import { Message } from "./Channel.model";
import User from "./User.model";

export default interface DirectMessage {
	id: string;
	senderID: string;
	receiverID: string;
	sender?: User;
	receiver?: User;
	message?: Message;

	isSender?:boolean
	friend?:User;
}

