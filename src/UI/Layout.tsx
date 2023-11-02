import MainNavBar from "@/components/MainNavBar/MainNavBar"
import LeftBar from "@/components/LeftBar/LeftBar"
import RightBar from "@/components/RightBar/RightBar"
import React, { PropsWithChildren, useEffect } from "react"
import { Lexend } from "next/font/google"
import AuthProvider from "./AuthProvider"
import WebSocketContextProvider from "./WebSocketContextWrapper"
import Notification from "@/components/BaseComponents/Notification"
import NotificationProvider from "./NotificationProvider"
import ActiveUserProvider from "./ActiveUserProvider"
const lexend = Lexend({ subsets: ["latin"] })
export default function Layout({ children }: PropsWithChildren) {
  return (
    <AuthProvider>
      <ActiveUserProvider>
        <WebSocketContextProvider>
          <main className={lexend.className}>
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
          </main>
        </WebSocketContextProvider>
      </ActiveUserProvider>
    </AuthProvider>
  )
}
