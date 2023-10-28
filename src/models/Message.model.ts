import { Channel } from "./Channel.model";
import DirectMessage from "./DM.model";
import User from "./User.model";
import Attachment from "./Attachment.model";

export default interface Message {
	id: string;
	mine: boolean;
	senderID: string;
	sender?: User;
	directmessageID?: string;
	directMessage?: DirectMessage;
	channelID?: string;
	channel?: Channel;
	content: string;
	createdAt: Date;
	updatedAt: Date;
	attachment?: Attachment;
}
