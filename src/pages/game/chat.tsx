import ChannelInfo from "@/UI/game/chat/Chat/ChannelInfo/ChannelInfo";
import ChatBar from "@/UI/game/chat/ChatBar/ChatBar";
import Dialogue from "@/components/Dialogue/Dialogue";
import Chat from "@/UI/game/chat/Chat";
import { NextPageWithLayout } from "../_app";
import { ReactElement, useEffect, useState } from "react";
import Layout from "@/UI/Layout";
import HeadTitle from "@/components/BaseComponents/HeadTitle";
import FriendRequestsDialBox from "@/UI/game/chat/ChatBar/DialogueBoxes/FriendRequestsDialBox";
import CreateChannelDialBox from "@/UI/game/chat/ChatBar/DialogueBoxes/CreateChannelDialBox";
import EditChannelDialBox from "@/UI/game/chat/ChatBar/DialogueBoxes/EditChannelDialBox";
import JoinChannelDialBox from "@/UI/game/chat/ChatBar/DialogueBoxes/JoinChannelDialBox";
import SearchPersonDialBox from "@/UI/game/chat/ChatBar/DialogueBoxes/SearchPersonDialBox";
import DirectMessage from "@/models/DM.model";
import DMService from "@/services/DMService";
import { Channel } from "@/models/Channel.model";
import ChannelSevice from "@/services/Channel.sevice";
import FriendInfo from "@/UI/game/chat/FriendInfo/FriendInfo";

const Page: NextPageWithLayout = () => {
	const [channelList, setChannelList] = useState<Channel[]>([]);
	const [DMList, setDMList] = useState<DirectMessage[]>([]);
	const [selected, setSelected] = useState<DirectMessage | Channel>();

	const isChannel = () => {
		return (selected as Channel)?.visibility != undefined;
	};

	useEffect(() => {
		DMService.getDMList()
			.then(({ data }: { data: DirectMessage[] }) => {
				console.log(data);
				setDMList(data);
				if (data.length > 0)
					setSelected(data[0]);

			})
			.catch((err) => {
				//error
			});

		ChannelSevice.getChannelList()
			.then(({ data }: { data: Channel[] }) => {
				setChannelList(data);
				if (data.length > 0 && !selected)
					setSelected(data[0]);
			})
			.catch((err) => {
				//error
			});
	}, []);

	const clickOnChannel = (id: string) => {
		const obj = channelList.find((item) => item.id == id);
		setSelected(obj);
	};
	const clickOnDm = (id: string) => {
		const obj = DMList.find((item) => item.id == id);
		setSelected(obj);
	};

	return (
		<div className="w-full  h-full flex gap-2">
			<HeadTitle>Pong Fury | Chat</HeadTitle>

			<div className="h-full w-96">
				<ChatBar
					DMList={DMList}
					channelList={channelList}
					selectedId={selected?.id ?? ""}
					clickOnDm={clickOnDm}
					clickOnChannel={clickOnChannel}
				/>
			</div>
			<div className="flex-1 flex flex-col   h-full">
				<Chat channelData={selected} />
			</div>
			<div className=" h-full w-96">
				{isChannel() && <ChannelInfo />}
				{!isChannel() && <FriendInfo />}
			</div>

			<Dialogue closed={true}>
				{/* <CreateChannelDialBox /> */}
				{/* <EditChannelDialBox /> */}
				{/* <JoinChannelDialBox /> */}
			</Dialogue>
		</div>
	);
};

Page.getLayout = function getLayout(page: ReactElement) {
	return <Layout>{page}</Layout>;
};

export default Page;
