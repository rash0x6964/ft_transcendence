import React, { useContext, useRef, useState } from "react";
import ChatInput from "./ChatInput";
import Input from "./ChatInput";
import Sword from "@/components/svgs/Sword";
import AddFile from "@/components/svgs/AddFile";
import Send from "@/components/svgs/Send";
import { NotifcationContext } from "@/UI/NotificationProvider";
type Props = {
	uploading: boolean;
	onChallenge?: () => void;
	onSend?: (value: string) => void;
	onFile?: (formData: FormData) => void;
	className?: string;
};
export default function ChatInputs({
	uploading,
	onChallenge,
	onSend,
	onFile,
	className,
}: Props) {
	const [content, setContent] = useState("");
	const fileRef = useRef<HTMLInputElement>(null);
	const notify = useContext(NotifcationContext);

	const handleSend = () => {
		if (content == "")
			return;
		onSend && onSend(content);
		setContent("");
	}

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		let formData = new FormData();

		if (!e.target.files || e.target.files.length <= 0)
			return;
		if (e.target.files[0].size > 1000 * 1000 * 10) {
			notify({
				message: "file is larger then 10 MB",
				type: "notice",
				title: "file upload"
			})
			return;
		}
		formData.append("file", e.target.files[0], e.target.files[0].name);
		console.log(formData);

		onFile && onFile(formData);

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
			{!uploading && <button
				onClick={() => fileRef && fileRef.current?.click()}
				className="h-16 w-16 drop-shadow-lg bg-secondary rounded-xl group"
			>
				<input onChange={handleFileChange} ref={fileRef} className="hidden" type="file" />
				<AddFile
					className="mx-auto group-hover:scale-125 transition-transform"
					width={24}
					height={24}
				/>
			</button>}

			{uploading && <div
				onClick={() => fileRef && fileRef.current?.click()}
				className="h-16 w-16 drop-shadow-lg bg-secondary rounded-xl group flex flex-col justify-center"
			>
				<span className="loader  scale-50 mx-auto"></span>
			</div>}

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
