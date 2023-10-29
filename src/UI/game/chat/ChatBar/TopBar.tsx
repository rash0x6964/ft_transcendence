import Input from "@/components/BaseComponents/Input";
import Search from "@/components/svgs/Search";
import CreateChanelIcn from "@/components/svgs/CreateChanelIcn";
import { useState } from "react";
import Dialogue from "@/components/Dialogue/Dialogue";
import CreateChannelDialBox from "./DialogueBoxes/CreateChannelDialBox";

export default function TopBar() {

	const [dialogueState, setDialogueState] = useState(true);
	const createChannel = () => {
		setDialogueState(false);
	};

	return (
		<div className="flex gap-2 mb-4">
			<Input
				placeholder="Search"
				icon={<Search />}
				className="w-80 h-14 bg-big-stone"
			/>
			<div
				className="flex items-center justify-center bg-big-stone rounded-lg h-14 w-14"
				onClick={createChannel}
			>
				<CreateChanelIcn />
			</div>

			<Dialogue
				onBackDropClick={() => setDialogueState(true)}
				closed={dialogueState}
			>
				<CreateChannelDialBox />
			</Dialogue>
		</div>
	);
}
