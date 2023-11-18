import Message from "./Message.model"
import User from "./User.model"

export default interface DirectMessage {
  id: string
  senderID: string
  receiverID: string
  sender?: User
  receiver?: User
  message?: Message
  blockStatus: "BOTH" | "NONE" | "SENDER" | "RECEIVER"
  muteStatus: "BOTH" | "NONE" | "SENDER" | "RECEIVER"
  isSender?: boolean
  friend?: User

  isFriend?: boolean
  pending?: boolean
}
