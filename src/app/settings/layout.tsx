import "../globals.css"
import type { Metadata } from "next"
import { Lexend } from "next/font/google"
import NavButton from "./NavButton"
import Cross from "./icons/Cross"
import Game from "./icons/Game"
import Security from "./icons/Security"
import Profile from "./icons/Profile"

const lexend = Lexend({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  
  return (
    <html lang="en">
      <body className={lexend.className + " flex flex-col items-center"}>
        <div className="w-screen h-screen absolute bg-gradient-to-br from-40% bg-gradient-t from-backdrop to-mirage -z-10 "></div>
        <div className="flex justify-end w-full p-10">
          <Cross  />
        </div>
        <div className="flex  flex-col md:flex-row justify-center">
          <div className="flex gap-2 w-52 flex-col mx-3">
            <NavButton title="Profile" path="profile" icon={<Profile />} />
            <NavButton
              title="Sign in & Security"
              path="security"
              icon={<Security />}
            />
            <NavButton title="Game Prefrences" path="game" icon={<Game />} />
          </div>
          <div className="w-[823px]">{children}</div>
        </div>
      </body>
    </html>
  )
}
