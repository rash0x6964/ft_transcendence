import { leaveChannel } from "@/models/Channel.model";
import { HttpClient } from "./HttpClient";

class ChannelUserService {

	private endPoint = "/channelUser"

	getChannelMemberUser(roomId: string) {
		return HttpClient.get(`${this.endPoint}/${roomId}`);
	}

	getChannelBlockedMember(roomId: string) {
		return HttpClient.get(`${this.endPoint}/blockedList/${roomId}`);
	}

	leaveChannel(roomId: string) {
		return HttpClient.delete(`${this.endPoint}/${roomId}`);
	}

	free(data: any) {
		return HttpClient.patch(`${this.endPoint}/free`, data);
	}

	blockUserAtChannel(data: any) {
		return HttpClient.patch(`${this.endPoint}/free`, data);
	}
}

export default new ChannelUserService()
