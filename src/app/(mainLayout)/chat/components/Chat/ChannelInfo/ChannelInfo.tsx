"use client"
import React, { CSSProperties, useEffect, useRef, useState } from "react"
import Avatar from "@/components/BaseComponents/Avatar"
import MemberCard from "./MemberCard"
import ContextMenu, { useContextMenu } from "@/components/BaseComponents/ContextMenu"
import { MouseEvent } from "react"
import { MenuBtn } from "@/components/BaseComponents/ContextMenu"
import { getMenuPos } from "@/components/BaseComponents/ContextMenu"

export default function ChannelInfo() {
	const adminsCount = 4

	const menuRef = useRef<HTMLDivElement>(null);
	const [position, setPosition] = useState({ x: 0, y: 0 })
	const [clicked, setClicked] = useContextMenu(menuRef);

	const handleContextMenu = (e: MouseEvent<HTMLDivElement>, PlayerName: string) => {
		setClicked(true);
		setPosition(getMenuPos(e, menuRef));
	}

	return (
		<div className="gradient-border-2 shadow-lg pt-16 rounded-xl  h-full flex flex-col gap-10">
			<div className="flex flex-col gap-10">
				<Avatar
					src="https://steamavatar.io/img/1477787730Sbn8H.jpg"
					className="w-40 h-40 mx-auto"
				/>
				<span className="self-center">Paddle Wars</span>
			</div>
			<div className="flex flex-1 flex-col gap-5 px-3 overflow-y-auto max-h-full">
				<span>Admins - {adminsCount}</span>
				<MemberCard onContextMenu={handleContextMenu}
					playerAvatar="https://steamavatar.io/img/1477787737LDq2E.jpg"
					playerName="rash0x6964"
					playerState="In queue"
				/>
				<span>Admins - {adminsCount}</span>
				<MemberCard onContextMenu={handleContextMenu}
					playerAvatar="https://steamavatar.io/img/1477787737LDq2E.jpg"
					playerName="rash0x6964"
					playerState="In queue" />
			</div>
			<ContextMenu MenuRef={menuRef} style={{ top: position.y, left: position.x }} className={` ${!clicked && "hidden"} `} >
				<MenuBtn onClick={()=>alert("yes")} title="Profile" />
				<MenuBtn title="Kick" />
				<MenuBtn title="Mute" />
				<MenuBtn title="Ban" />
			</ContextMenu>
		</div>
	)
}
