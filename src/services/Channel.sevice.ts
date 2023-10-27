import { HttpClient } from "./HttpClient";

class ChannelService {
	
	private endPoint = "/channel"

	getChannelList() {
		return HttpClient.get(`${this.endPoint}/list`);
	}
}

export default new ChannelService()
