import "./globals.css"
import type { Metadata } from "next"
import { Lexend } from "next/font/google"
import MainNavBar from "@/components/MainNavBar/MainNavBar"
import LeftBar from "@/components/LeftBar/LeftBar"
import RightBar from "@/components/RightBar/RightBar"
const lexend = Lexend({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Pong Fury",
  description: "Generated by create next app",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={lexend.className}>
        <div className="w-screen fixed h-screen  bg-gradient-to-r from-10% to-80% from-backdrop to-mirage -z-10 "></div>

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
      </body>
    </html>
  )
}
