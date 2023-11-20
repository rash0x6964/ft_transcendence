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

  return (
    <ProfileContext.Provider value={{ profileData, setProfileData }}>
      {children}
    </ProfileContext.Provider>
  )
}
