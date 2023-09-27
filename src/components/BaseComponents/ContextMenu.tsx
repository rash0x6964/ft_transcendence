import React, { Children, PropsWithChildren } from 'react'
import { CSSProperties } from 'react'
import { MouseEvent } from 'react';
import { useState, useEffect } from 'react';
type Props =
	{
		className?: string
		style?: CSSProperties
		MenuRef: React.LegacyRef<HTMLDivElement>
	}

export function MenuBtn({ title, onClick }: { title: string; onClick?: () => void }) {
	return (
		<div
			className="flex cursor-pointer flex-col p-3 bg-secondary rounded duration-300 py-3 w-36 hover:bg-primary hover:text-secondary font-light text-gray-400 text-xs"
			onClick={onClick}
		>
			{title}
		</div>
	)
}

export default function ContextMenu({ className, style, MenuRef, children }: Props & PropsWithChildren) {
	return (
		<div ref={MenuRef}
			style={style}
			className={"fixed top-0 left-0 flex flex-col p-3 w-fit bg-secondary rounded border border-gray-600  z-50 " + className}	>
			{children}
		</div>
	)
}

export function getMenuPos(e: MouseEvent, menuRef: any): { x: number, y: number } {
	let posX: number = e.clientX;
	let posY: number = e.clientY;
	if (!menuRef.current)
		return { x: 0, y: 0 };

	if (posY + menuRef.current?.clientHeight > window.innerHeight)
		posY -= menuRef.current?.clientHeight;
	if (posX + menuRef.current.clientWidth > window.innerWidth)
		posX -= menuRef.current.clientWidth;
	return { x: posX, y: posY }
}


export function useContextMenu(menuRef: any): [isClicked: boolean, setClicked: React.Dispatch<React.SetStateAction<boolean>>] {
	const [isClicked, setClicked] = useState<boolean>(false);
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

	return [isClicked, setClicked];
}
