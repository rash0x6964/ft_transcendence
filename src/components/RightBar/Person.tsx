import Image from "next/image"
import React from "react"
import Avatar from "../BaseComponents/Avatar"
import { MouseEvent } from "react"
type Props = {
	userName?: string
	connected: boolean,
	src?: string,
	onContextMenu:(e:MouseEvent<HTMLDivElement>) => void
}


export default function Person({onContextMenu, src, userName, connected }: Props) {

	const handleMouseEvent = (e: MouseEvent<HTMLDivElement>) => {
		e.preventDefault();
		onContextMenu(e);
	};
	return (
		<div onContextMenu={handleMouseEvent} className="w-9 relative flex flex-col items-center">
			<Avatar
				className="rounded-full border-2 w-9"
				src={src || ""}
				alt={userName}
			/>

			{connected && <div
				className={
					"bg-green-500 rounded-full w-2 h-2 absolute z-20 right-1 top-7 "
				}
			></div>}

			<span className="text-xs truncate ... max-w-full">{userName}</span>
		</div>
	)
}
