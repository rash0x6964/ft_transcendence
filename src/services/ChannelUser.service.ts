import { HttpClient } from "./HttpClient";

class ChannelUserService {

	private endPoint = "/channelUser"

	getChannelMemberUser(roomId: string) {
		return HttpClient.get(`${this.endPoint}/${roomId}`);
	}
}

export default new ChannelUserService()
