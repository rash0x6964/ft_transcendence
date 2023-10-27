import React, { useState } from "react";
import ChatInput from "./ChatInput";
import Input from "./ChatInput";
import Sword from "@/components/svgs/Sword";
import AddFile from "@/components/svgs/AddFile";
import Send from "@/components/svgs/Send";
type Props = {
	onChallenge?: () => void;
	onSend?: (value: string) => void;
	onFile?: () => void;
	className?: string;
};
export default function ChatInputs({
	onChallenge,
	onSend,
	onFile,
	className,
}: Props) {
	const [content, setContent] = useState("");

	const handleSend = () => {
		if (content == "")
			return;
		onSend && onSend(content);
		setContent("");
	}
	return (
		<div className={`flex gap-2 ${className}`}>
			<Input
				onChange={(e) => setContent(e.target.value)}
				onKeyEnter={handleSend}
				value={content}
				placeholder="Send something Nice"
				className="flex-1 h-16  drop-shadow-lg    bg-secondary"
			/>
			<button
				onClick={onChallenge}
				className="h-16 w-16 drop-shadow-lg bg-secondary rounded-xl group "
			>
				<Sword
					className="mx-auto group-hover:scale-125 transition-transform"
					width={24}
					height={24}
				/>
			</button>
			<button
				onClick={onFile}
				className="h-16 w-16 drop-shadow-lg bg-secondary rounded-xl group"
			>
				<AddFile
					className="mx-auto group-hover:scale-125 transition-transform"
					width={24}
					height={24}
				/>
			</button>
			<button
				onClick={handleSend}
				className="h-16 w-16 drop-shadow-lg bg-secondary rounded-xl group"
			>
				<Send
					className="mx-auto text-primary group-hover:scale-125 transition-transform"
					width={24}
					height={24}
				/>
			</button>
		</div>
	);
}
