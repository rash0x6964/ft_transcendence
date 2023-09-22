'use client'
import React from "react"
import { useState } from "react"
import Sound from "../svgs/Sound"
import Notif from "../svgs/Notif"
import GameController from "../svgs/GameController"
import Menu from "../svgs/Menu"
import Chat from "../svgs/Chat"
import LeaderBoard from "../svgs/LeaderBoard"
import Button from "./Button"
import Link from "next/link"


type Props = {
	className?: string
}


export default function LeftBar({ className }: Props) {
	let links = [
		{
			icon: <Menu />,
			href: "/menu"
		},
		{
			icon: <GameController />,
			href: "/lobby"
		},
		{
			icon: <Chat />,
			href: "/chat"
		},
		{
			icon: <LeaderBoard />,
			href: "/leaderboard"
		}
	]
	return (
		<div className={className}>
			<div className="flex flex-col gap-6">
				{links.map((link) => <Button href={link.href} icon={link.icon} />)}

			</div>
			<div className="flex flex-col gap-y-4">
				<Notif className="mx-auto cursor-pointer" />
				<div className="mx-auto w-[40px] h-[1px] bg-slate-700 "></div>
				<Sound className="mx-auto cursor-pointer" />
			</div>
		</div>
	)
}
