import React, { Children, PropsWithChildren } from "react"
import { useState } from "react"

type Props = {
	closed?: boolean,
	onBackDropClick?: () => void
}

export default function Dialogue({
	onBackDropClick,
	closed = true,
	children,
}: Props & PropsWithChildren) {
	return (
		<div
			className={`h-screen w-screen  z-20 fixed left-0 top-0  flex flex-col justify-center   ${closed ? "hidden" : "block"
				}`}
		>
			<div onClick={onBackDropClick} className=" z-10  fixed bg-backdrop/90 w-screen h-screen flex flex-col justify-center ">

			</div>
			<div className="mx-auto  z-20 ">{!closed && children}</div>


		</div>
	)
}
