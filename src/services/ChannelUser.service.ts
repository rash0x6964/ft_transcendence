import { leaveChannel } from "@/models/Channel.model";
import { HttpClient } from "./HttpClient";

class ChannelUserService {

	private endPoint = "/channelUser"

	getChannelMemberUser(roomId: string) {
		return HttpClient.get(`${this.endPoint}/${roomId}`);
	}

	leaveChannel(roomId: string) {
		return HttpClient.delete(`${this.endPoint}/${roomId}`,);
	}
}

export default new ChannelUserService()
