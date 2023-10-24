import ChannelInfo from "@/UI/game/chat/Chat/ChannelInfo/ChannelInfo";
import ChatBar from "@/UI/game/chat/ChatBar/ChatBar";
import Dialogue from "@/components/Dialogue/Dialogue";
import Chat from "@/UI/game/chat/Chat";
import { NextPageWithLayout } from "../_app";
import { ReactElement } from "react";
import Layout from "@/UI/Layout";
import HeadTitle from "@/components/BaseComponents/HeadTitle";
import FriendRequestsDialBox from "@/UI/game/chat/ChatBar/DialogueBoxes/FriendRequestsDialBox";
import CreateChannelDialBox from "@/UI/game/chat/ChatBar/DialogueBoxes/CreateChannelDialBox";
import EditChannelDialBox from "@/UI/game/chat/ChatBar/DialogueBoxes/EditChannelDialBox";
import JoinChannelDialBox from "@/UI/game/chat/ChatBar/DialogueBoxes/JoinChannelDialBox";
import SearchPersonDialBox from "@/UI/game/chat/ChatBar/DialogueBoxes/SearchPersonDialBox";



const Page: NextPageWithLayout = () => {

  return (
    <div className="w-full  h-full flex gap-2">
		<HeadTitle>Pong Fury | Chat</HeadTitle>

      <div className="h-full w-96">
        <ChatBar />
      </div>
      <div className="flex-1 flex flex-col   h-full">
        <Chat />
      </div>
      <div className=" h-full w-96">
        <ChannelInfo />
      </div>
      <Dialogue closed={true}>
        {/* <CreateChannelDialBox /> */}
        {/* <EditChannelDialBox /> */}
        {/* <JoinChannelDialBox /> */}
      </Dialogue>
    </div>
  )
}


Page.getLayout = function getLayout(page: ReactElement) {
	return (
		<Layout>
			{page}
		</Layout>
	)
}


export default Page
