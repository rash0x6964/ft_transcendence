import Image from "next/image"
import React from "react"
import Avatar from "../BaseComponents/Avatar"

type Props = {
	userName: string
	connected: boolean
}

export default function Person({ userName, connected }: Props) {
	return (
		<div className="w-9 relative flex flex-col items-center">
			<Avatar
				className="rounded-full border w-9"
				src="https://steamavatar.io/img/147774149680437.jpg"
				alt="Avatar"
			/>

			{connected && <div
				className={
					"bg-green-500 rounded-full w-2 h-2 absolute z-20 right-1 top-7 "
				}
			></div>}

			<span className="text-xs">{userName}</span>
		</div>
	)
}
