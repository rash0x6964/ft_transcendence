import Layout from "@/UI/Layout";
import Chat from "@/UI/game/chat/Chat";
import ChannelInfo from "@/UI/game/chat/Chat/ChannelInfo/ChannelInfo";
import ChatBar from "@/UI/game/chat/ChatBar/ChatBar";
import FriendInfo from "@/UI/game/chat/FriendInfo/FriendInfo";
import HeadTitle from "@/components/BaseComponents/HeadTitle";
import Dialogue from "@/components/Dialogue/Dialogue";
import { Channel } from "@/models/Channel.model";
import DirectMessage from "@/models/DM.model";
import ChannelService from "@/services/Channel.sevice";
import { ReactElement, useEffect, useState } from "react";
import { NextPageWithLayout } from "../_app";
import { useRouter } from "next/router";
import DMService from "@/services/DMService";
import JoinChannelDialBox from "@/UI/game/chat/ChatBar/DialogueBoxes/JoinChannelDialBox";


const Page: NextPageWithLayout = () => {
	const [channelList, setChannelList] = useState<Channel[]>([]);
	const [DMList, setDMList] = useState<DirectMessage[]>([]);
	const [selected, setSelected] = useState<DirectMessage | Channel>();
	const [dialogueState, setDialogueState] = useState(true);
	const router = useRouter();

	const [channelTryingToJoin, setChannelTryingToJoin] = useState({})


	const isChannel = () => {
		return (selected as Channel)?.visibility != undefined;
	};

	useEffect(() => {
		DMService.getDMList()
			.then(({ data }: { data: DirectMessage[] }) => {
				setDMList(data);
				if (router.query?.type == "DM")
					setSelected(data.find(x => x.id == router.query?.id))
				else if (data.length > 0)
					setSelected(data[0]);
			})
			.catch((err) => {
				//error
			});

		ChannelService.getChannelList()
			.then(({ data }: { data: Channel[] }) => {
				setChannelList(data);
				if (router.query?.type == "channel")
					setSelected(data.find(x => x.id == router.query?.id))
				else if (data.length > 0 && selected != undefined)
					setSelected(data[0]);
			})
			.catch((err) => {
				//error
			});
	}, []);

	const clickOnChannel = (id: string) => {
		const obj = channelList.find((item) => item.id == id);
		if (obj) {
			setDialogueState(true);
			setSelected(obj);
		} else {
			ChannelService.getChannelById(id).then((res) => {
				setChannelTryingToJoin(res.data);
				console.log('res: ', res.data);
			}).catch((err) => {

			})
			setDialogueState(false);
		}
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
				{isChannel() && <ChannelInfo channelID={selected?.id ?? ""} />}
				{!isChannel() && (
					<FriendInfo friend={(selected as DirectMessage)?.friend} />
				)}
			</div>

			<Dialogue
				onBackDropClick={() => setDialogueState(true)}
				closed={dialogueState}
			>
				<JoinChannelDialBox channelInfo={channelTryingToJoin} />
			</Dialogue>

			{/* <Dialogue closed={true}>
				<CreateChannelDialBox />
				<EditChannelDialBox />
				<JoinChannelDialBox />
			</Dialogue> */}
		</div>
	);
};

Page.getLayout = function getLayout(page: ReactElement) {
	return <Layout>{page}</Layout>;
};

export default Page;
