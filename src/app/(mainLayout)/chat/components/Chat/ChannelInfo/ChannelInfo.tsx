"use client"
import React, { CSSProperties, useEffect, useRef, useState } from "react"
import Avatar from "@/components/BaseComponents/Avatar"
import MemberCard from "./MemberCard"
import ContextMenu from "@/components/BaseComponents/ContextMenu"
import { MouseEvent } from "react"
import { MenuBtn } from "@/components/BaseComponents/ContextMenu"

export default function ChannelInfo() {
	const adminsCount = 4
	const [position, setPosition] = useState({ x: 0, y: 0 })
	const [clicked, setClicked] = useState<boolean>(false);
	const menuRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		let handler = (e: Event) => {
			if (!menuRef.current?.contains(e.target as Node)) {
				setClicked(false)
			}
		}
		document.addEventListener("mousedown", handler);
		() => {
			document.removeEventListener("mousedown", handler)
		}
	}, [])
	const handleContextMenu = (e: MouseEvent<HTMLDivElement>, PlayerName: string) => {
		console.log(menuRef);
		setClicked(true);
		let posX = e.clientX;
		let posY = e.clientY;
		if (!menuRef.current)
			return;

		if (posY + menuRef.current?.clientHeight > window.innerHeight)
			posY -= menuRef.current?.clientHeight;
		if (posX + menuRef.current.clientWidth > window.innerWidth)
			posX -= menuRef.current.clientWidth;
		setPosition({ x: posX, y: posY });
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
			<ContextMenu MenuRef={menuRef} style={{ top: position.y, left: position.x }} className={`fixed top-0 left-0 ${!clicked && "hidden"} `} >
				<MenuBtn title="Profile" />
				<MenuBtn title="Kick" />
				<MenuBtn title="Mute" />
				<MenuBtn title="Ban" />
			</ContextMenu>
		</div>
	)
}
