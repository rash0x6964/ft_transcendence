import { HttpClient } from "./HttpClient";

let endPoint = "/friendRequest"



class FriendRequestService {
	get() {
		return HttpClient.get(endPoint + "/received");
	}

	delete(receiverID: string, senderID: string) {
		return HttpClient.delete(`${endPoint}?receiverID=${receiverID}&senderID=${senderID}`);
	}

	accept({ senderID, receiverID }: { senderID: string, receiverID: string }) {
		return HttpClient.post(`${endPoint}/accept`, {
			senderID,
			receiverID
		})
	}

	send(receiverID:string) {
		return HttpClient.post(`${endPoint}`, {
			receiverID
		})
	}
}

export default new FriendRequestService()







