'use client'
import MainNavBar from "@/components/MainNavBar/MainNavBar"
import LeftBar from "@/components/LeftBar/LeftBar"
import RightBar from "@/components/RightBar/RightBar"
import React, { PropsWithChildren } from "react"


export default function MainView({children}:PropsWithChildren) {
	return (
		<div className="  h-screen w-screen flex flex-col ">
			<MainNavBar className=" w-screen" coins={8000} />
			<div className="flex-1 flex justify-between mb-4">

				<LeftBar className=" h-full w-fit    bg-secondary mx-2 py-6 drop-shadow-lg  mb-4 rounded-lg flex flex-col  justify-between" />
				<div className=" flex-1 relative">
					<div className="absolute w-full h-full max-h-full overflow-y-auto">
						{children}
					</div>
				</div>
				<RightBar className="shadow  h-full drop-shadow-lg   w-16 bg-secondary mx-2 mb-4 rounded-lg flex flex-col items-center gap-5 py-5" />
			</div>
		</div>
	)
}
