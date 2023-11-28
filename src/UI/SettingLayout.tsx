import { Lexend } from "next/font/google"
import NavButton from "./settings/NavButton"
import Cross from "./settings/icons/Cross"
import Game from "./settings/icons/Game"
import Profile from "./settings/icons/Profile"
import Security from "./settings/icons/Security"
import AuthProvider from "./AuthProvider"
import LogoutButton from "./settings/LogoutButton"
const lexend = Lexend({ subsets: ["latin"] })

export default function SettingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <AuthProvider>
      <main className={lexend.className + " flex flex-col items-center"}>
        <div className="w-screen fixed h-screen  bg-gradient-to-br from-10% to-90% from-backdrop to-mirage -z-10"></div>
        <div className="flex justify-end w-full p-10">
          <Cross />
        </div>
        <div className="flex  flex-col md:flex-row justify-center">
          <div className="flex gap-2 w-52 flex-col mx-3">
            <NavButton title="Profile" path="profile" icon={<Profile />} />
            <NavButton
              title="Sign in & Security"
              path="security"
              icon={<Security />}
            />
            <NavButton title="Game Preferences" path="game" icon={<Game />} />
            <LogoutButton />
          </div>
          <div className="w-[823px]">{children}</div>
        </div>
      </main>
    </AuthProvider>
  )
}
