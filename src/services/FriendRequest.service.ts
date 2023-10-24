import { HttpClient } from "./HttpClient";




class FriendRequestService {

	private endPoint = "/friendRequest"


	getRequests() {
		return HttpClient.get(this.endPoint + "/received");
	}

	deleteRequest({ senderID, receiverID }: { senderID: string, receiverID: string }) {
		return HttpClient.delete(`${this.endPoint}?receiverID=${receiverID}&senderID=${senderID}`);
	}

	acceptRequest({ senderID, receiverID }: { senderID: string, receiverID: string }) {
		return HttpClient.post(`${this.endPoint}/accept`, {
			senderID,
			receiverID
		})
	}

	sendRequest(receiverID: string) {
		return HttpClient.post(`${this.endPoint}`, {
			receiverID
		})
	}
}

export default new FriendRequestService()







