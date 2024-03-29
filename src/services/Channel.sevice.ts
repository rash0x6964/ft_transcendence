import { Channel, CreateChannel, JoinChannel } from "@/models/Channel.model";
import { HttpClient } from "./HttpClient";

class ChannelService {

	private channelEndPoint = "/channel"
	private channelUserEndPoint = "/channelUser"

	getChannelList() {
		return HttpClient.get(`${this.channelEndPoint}/list`);
	}

	getChannelByName(name: string) {
		return HttpClient.get(`${this.channelEndPoint}/filter?name=${name}`);
	}

	getChannelById(id: string) {
		return HttpClient.get(`${this.channelEndPoint}/${id}`);
	}

	createChannel(body: CreateChannel) {
		return HttpClient.post(`${this.channelEndPoint}`, body)
	}

	joinChannel(body: JoinChannel) {
		return HttpClient.post(`${this.channelUserEndPoint}/joinChannel`, body)
	}

	updateChannel(body: any) {
		return HttpClient.patch(`${this.channelEndPoint}`, body)
	}

	updatePassword(body: any) {
		return HttpClient.patch(`${this.channelEndPoint}/password`, body)
	}

	deleteChannel(channelId: string) {
		return HttpClient.delete(`${this.channelEndPoint}/${channelId}`)
	}

}

export default new ChannelService()
