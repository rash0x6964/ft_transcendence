import { HttpClient } from "./HttpClient";




class FriendService {

	private endPoint = "/Users"

	findByName(name: string) {
		return HttpClient.get(`${this.endPoint}/list/${name}`);
	}





}

export default new FriendService()
