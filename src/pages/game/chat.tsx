import ChannelInfo from "@/UI/game/chat/Chat/ChannelInfo/ChannelInfo";
import ChatBar from "@/UI/game/chat/ChatBar/ChatBar";
import Dialogue from "@/components/Dialogue/Dialogue";
import Chat from "@/UI/game/chat/Chat";
import { NextPageWithLayout } from "../_app";
import { ReactElement } from "react";
import Layout from "@/UI/Layout";


const Page: NextPageWithLayout = () => {

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
      <Dialogue closed={true}>
        {/* <CreateChannelDialBox /> */}
        {/* <FriendRequestsDialBox /> */}
        {/* <EditChannelDialBox /> */}
        {/* <SearchPersonDialBox /> */}
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
