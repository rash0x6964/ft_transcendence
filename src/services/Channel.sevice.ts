import { HttpClient } from "./HttpClient";

class ChannelService {

	private endPoint = "/channel"

	getChannelList() {
		return HttpClient.get(`${this.endPoint}/list`);
	}

	getChannelByName(name: string) {
		return HttpClient.get(`${this.endPoint}/filter?name=${name}`);
	}
}

export default new ChannelService()
