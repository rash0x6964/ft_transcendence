import Message from "@/models/Message.model";
import { HttpClient } from "./HttpClient";




class FriendService {

	private endPoint = "/message"

	getChannelMessage(channelID: string) {
		return HttpClient.get(`${this.endPoint}?channelID=${channelID}`);
	}

	getDmMessages(DmID: string) {
		return HttpClient.get(`${this.endPoint}?dmID=${DmID}`);
	}

	sendDmMessage(val: string, dmID: string) {


		let data =
		{
			content: val,
			dmMessage: true,
			directmessageID: dmID

		}
		return HttpClient.post(`${this.endPoint}`, data);
	}

}

export default new FriendService()
