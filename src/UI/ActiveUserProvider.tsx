import ProfileData from "@/models/ProfileData.model"
import profileService from "@/services/ProfileService"
import {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react"
import { WebSocketContext } from "./WebSocketContextWrapper"

export const ProfileContext = createContext<any>({})
export default function ActiveUserProvider({ children }: PropsWithChildren) {
  const [profileData, setProfileData] = useState<ProfileData | null>(null)
  const socket = useContext(WebSocketContext)

  const fetchProfileData = async () => {
    try {
      const _profileData = await profileService.getCurrentProfileData()
      console.log("yes")

      setProfileData(_profileData)
    } catch (error) {
      console.log("Couldn't fetch profile data")
    }
  }

  useEffect(() => {
    if (!socket) return

    socket?.on("gameEnd", fetchProfileData)
    fetchProfileData()

    return () => {
      socket?.off("gameEnd", fetchProfileData)
    }
  }, [])
  if (!profileData)
    return (
      <div className="h-screen w-screen  bg-gradient-to-r from-10% to-80% from-backdrop to-mirage flex flex-col justify-center">
        <span className="loaderLobby mx-auto"></span>
      </div>
    )
  return (
    <ProfileContext.Provider value={{ profileData, setProfileData }}>
      {children}
    </ProfileContext.Provider>
  )
}
