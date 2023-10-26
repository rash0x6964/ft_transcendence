import { Message } from "./Channel.model";
import User from "./User.model";

interface Attachment {

}

interface Msg {
	senderID: string,
	content: string,
	attachment: Attachment;
}

export default interface DirectMessage {
	friendID: string;
	isSender: boolean;
	onlineStatus: boolean;
	avatarUrl: string;
	userName: string;
	lastMsg: Msg[];
}

// export default interface DirectMessage {
// 	id: string;
// 	senderID: string;
// 	receiverID: string;
// 	sender?: User;
// 	receiver?: User;
// 	message?: Message;
// 	isSender?:boolean
// 	friend?:User;
// }

