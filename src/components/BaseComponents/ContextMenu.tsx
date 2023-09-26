import React, { Children, PropsWithChildren } from 'react'
import { CSSProperties } from 'react'


type Props =
{
	className?: string
	style?: CSSProperties
	MenuRef:React.LegacyRef<HTMLDivElement>
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

export default function ContextMenu({className,style,MenuRef,children}: Props  & PropsWithChildren) {
	return (
		<div ref={MenuRef}
			style={style}
			className={"flex flex-col p-3 w-fit bg-secondary rounded border border-gray-600 fixed z-50 " + className}	>
			{children}
		</div>
	)
}
