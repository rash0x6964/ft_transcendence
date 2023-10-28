import { HttpClient } from "./HttpClient";

class DMService {

	private endPoint = "/directMessage"

	getDMList() {
		return HttpClient.get(`${this.endPoint}/list`);
	}

	blockUser({ senderID, receiverID }: { senderID: string, receiverID: string }) {
		return HttpClient.patch(`${this.endPoint}/blockUser`, { senderID, receiverID })
	}

	unBlockUser({ senderID, receiverID }: { senderID: string, receiverID: string }) {
		return HttpClient.patch(`${this.endPoint}/unBlockUser`, { senderID, receiverID })
	}

	muteUser({ senderID, receiverID }: { senderID: string, receiverID: string }) {
		return HttpClient.patch(`${this.endPoint}/muteUser`, { senderID, receiverID })
	}

	unMuteUser({ senderID, receiverID }: { senderID: string, receiverID: string }) {
		return HttpClient.patch(`${this.endPoint}/unMuteUser`, { senderID, receiverID })
	}

}

export default new DMService()
