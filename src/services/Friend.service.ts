import { HttpClient } from "./HttpClient";




class FriendService {

	private endPoint = "/friendStatus"

	getFriendList() {
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

	removeFriend({ senderID, receiverID }: { senderID: string, receiverID: string }) {
		return HttpClient.delete(`${this.endPoint}?receiverID=${receiverID}&senderID=${senderID}`);
	}

}

export default new FriendService()
