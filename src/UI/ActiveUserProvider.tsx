import ProfileData from "@/models/ProfileData.model"
import profileService from "@/services/ProfileService"
import {
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  createContext,
  useEffect,
  useState,
} from "react"

export const ProfileContext = createContext<any>({})
export default function ActiveUserProvider({ children }: PropsWithChildren) {
  const [profileData, setProfileData] = useState<ProfileData | null>(null)

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const _profileData = await profileService.getCurrentProfileData()

        setProfileData(_profileData)
      } catch (error) {
        console.log("Couldn't fetch profile data")
      }
    }

    fetchProfileData()
  })
  return (
    <ProfileContext.Provider value={{ profileData, setProfileData }}>
      {children}
    </ProfileContext.Provider>
  )
}
