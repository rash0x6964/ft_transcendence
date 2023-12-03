import Message from "@/models/Message.model"
import { HttpClient } from "./HttpClient"
import Attachment from "@/models/Attachment.model"

class FriendService {
  private endPoint = "/message"

  getMessages(
    id: string,
    isChannel: boolean,
    offset: number = 0,
    limit: number = 20
  ) {
    if (isChannel)
      return HttpClient.get(
        `${this.endPoint}?channelID=${id}&offset=${offset}&limit=${limit}`
      )
    return HttpClient.get(
      `${this.endPoint}?dmID=${id}&offset=${offset}&limit=${limit}`
    )
  }

  sendMessage(
    val: string,
    id: string,
    isChannel: boolean,
    attachment: Attachment | undefined = undefined
  ) {
    let data: any = {
      dmMessage: !isChannel,
      content: val,
      attachment: attachment,
    }
    if (isChannel) data["channelID"] = id
    else data["directmessageID"] = id

    return HttpClient.post(`${this.endPoint}`, data)
  }
}

export default new FriendService()
