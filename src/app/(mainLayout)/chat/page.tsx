import React from "react"
import ChatBar from "./components/ChatBar/ChatBar"
import Chat from "./components/Chat"
import FriendInfo from "./components/FriendInfo/FriendInfo"
import ChannelInfo from "./components/Chat/ChannelInfo/ChannelInfo"
import Dialogue from "@/components/Dialogue/Dialogue"
import FriendRequestsDialBox from "./components/ChatBar/DialogueBoxes/FriendRequestsDialBox"
import CreateChannelDialBox from "./components/ChatBar/DialogueBoxes/CreateChannelDialBox"
import EditChannelDialBox from "./components/ChatBar/DialogueBoxes/EditChannelDialBox"

export default function Page() {
  return (
    <div className="w-full h-full flex gap-2">
      <div className="h-full w-96">
        <ChatBar />
      </div>
      <div className="flex-1 flex flex-col  h-full">
        <Chat />
      </div>
      <div className=" h-full w-96">
        <ChannelInfo />
      </div>
      <Dialogue closed={false}>
        {/* <CreateChannelDialBox /> */}
        {/* <FriendRequestsDialBox /> */}
        <EditChannelDialBox />
      </Dialogue>
    </div>
  )
}
