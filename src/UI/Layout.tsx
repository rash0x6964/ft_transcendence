import MainNavBar from "@/components/MainNavBar/MainNavBar"
import LeftBar from "@/components/LeftBar/LeftBar"
import RightBar from "@/components/RightBar/RightBar"
import React, { PropsWithChildren, useEffect } from "react"
import { Lexend } from "next/font/google"

const lexend = Lexend({ subsets: ["latin"] })
export default function Layout({ children }: PropsWithChildren) {

	return (
		<main className={lexend.className}>
			<div className="w-screen fixed h-screen  bg-gradient-to-r from-10% to-80% from-backdrop to-mirage -z-10 "></div>

			<div className="  h-screen w-screen flex flex-col ">
				<MainNavBar className=" w-screen" coins={8000} />
				<div className="flex-1 flex justify-between mb-4">

					<LeftBar className=" h-full w-fit    bg-secondary mx-2 py-6 drop-shadow-lg  mb-4 rounded-lg flex flex-col  justify-between" />
					<div className=" flex-1 relative">
					{/* <div className="w-screen fixed top-0 left-0 h-screen z-50 bg-red-500"></div> */}
						<div className="absolute w-full h-full max-h-full overflow-y-auto">
							{children}
						</div>
					</div>
					<RightBar className="  drop-shadow-lg   h-full     mx-2 mb-4  " />
				</div>
			</div>
		</main>

	)
}
