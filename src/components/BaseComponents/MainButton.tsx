"use client"

import React, { PropsWithChildren } from "react"
type Props = {
	onClick?: () => void
	glow?: Boolean
	className?: string
}
export default function MainButton({
	onClick,
	glow = false,
	children,
	className,
}: Props & PropsWithChildren) {
	return (
		<button className={" relative  group bg-primary duration-300 hover:bg-primary/70   text-sm font-semibold  text-secondary rounded-md text-center " + className} onClick={onClick}>
			{glow && (
				<div
					className={` -z-10 bg-primary transition-all duration-300  group-hover:blur-[4px] w-full h-full rounded-md absolute top-0 left-0 blur-[0px] `}
				></div>
			)}

			<div className="z-10">
				{children}
			</div>
		</button>
	)
}
