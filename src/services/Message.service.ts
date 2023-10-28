import Message from "@/models/Message.model";
import { HttpClient } from "./HttpClient";
import Attachment from "@/models/Attachment.model";




class FriendService {

	private endPoint = "/message"

	getChannelMessage(channelID: string) {
		return HttpClient.get(`${this.endPoint}?channelID=${channelID}`);
	}

	getDmMessages(DmID: string) {
		return HttpClient.get(`${this.endPoint}?dmID=${DmID}`);
	}

	sendDmMessage(val: string, dmID: string, attachment: Attachment | undefined = undefined) {


		let data =
		{
			content: val,
			dmMessage: true,
			directmessageID: dmID,
			attachment: attachment

		}


		return HttpClient.post(`${this.endPoint}`, data);
	}

	sendChannelMessage(val: string, channelID: string, attachment: Attachment | undefined = undefined) {


		let data =
		{
			dmMessage: false,
			content: val,
			channelID: channelID,
			attachment: attachment

		}


		return HttpClient.post(`${this.endPoint}`, data);
	}


}

export default new FriendService()
