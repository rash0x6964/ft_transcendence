import Achievements from "@/UI/game/profile/(achievements)/Achievements"
import PlayerInfoBar from "@/UI/game/profile/(topSide)/PlayerInfoBar"
import MatchHistory from "@/UI/game/profile/(matches)/MatchHistory"
import { NextPageWithLayout } from "../../_app"
import { ReactElement, useContext, useEffect, useState } from "react"
import Layout from "@/UI/Layout"
import HeadTitle from "@/components/BaseComponents/HeadTitle"
import BannerProfile from "@/UI/game/profile/(topSide)/BannerProfile"
import { useRouter } from "next/router"
import profileService from "@/services/ProfileService"
import ProfileData from "@/models/ProfileData.model"
import NotifData from "@/types/NotifData"
import { NotifcationContext } from "@/UI/NotificationProvider"

const Page: NextPageWithLayout = () => {
  const [profileData, setProfileData] = useState<ProfileData | null>(null)

  const router = useRouter()
  const _username = router.query.username as string
  const notify: (data: NotifData) => void = useContext(NotifcationContext)

  useEffect(() => {
    if (!router.query.username) return

    const fetchData = async () => {
      try {
        const _profileData = await profileService.getProfileDataByUsername(
          _username
        )

        setProfileData(_profileData)
      } catch (error) {
        notify({
          message: `Error fetching profile for ${_username}`,
          title: "Profile error",
          type: "error",
        })

        setTimeout(() => {
          router.back()
        }, 1000)
      }
    }

    fetchData()
  }, [router, _username])

  if (!profileData)
    return (
      <div className="flex justify-center ">
        <span className="loader"></span>
      </div>
    )
  else
    return (
      <div className="flex flex-col h-full">
        <HeadTitle>Profile | {profileData.username}</HeadTitle>

        <div className="relative">
          <BannerProfile bannerUrl={profileData.bannerUrl} />
          <PlayerInfoBar profileData={profileData} />
        </div>
        <div className="flex container mx-auto overflow-y-scroll">
          <Achievements profileData={profileData} />
          <MatchHistory profileData={profileData} />
        </div>
      </div>
    )
}

Page.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>
}

export default Page
