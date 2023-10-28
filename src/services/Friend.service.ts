import { HttpClient } from "./HttpClient";




class FriendService {

	private endPoint = "/friendStatus"

	getFriendList() {
		return HttpClient.get(`${this.endPoint}/list`);
	}


	removeFriend({ senderID, receiverID }: { senderID: string, receiverID: string }) {
		return HttpClient.delete(`${this.endPoint}?receiverID=${receiverID}&senderID=${senderID}`);
	}

}

export default new FriendService()
