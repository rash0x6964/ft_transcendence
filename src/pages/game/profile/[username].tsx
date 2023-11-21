import Achievements from "@/UI/game/profile/(achievements)/Achievements"
import PlayerInfoBar from "@/UI/game/profile/(topSide)/PlayerInfoBar"
import MatchHistory from "@/UI/game/profile/(matches)/MatchHistory"
import { NextPageWithLayout } from "../../_app"
import { ReactElement, useEffect, useState } from "react"
import Layout from "@/UI/Layout"
import HeadTitle from "@/components/BaseComponents/HeadTitle"
import BannerProfile from "@/UI/game/profile/(topSide)/BannerProfile"
import { useRouter } from "next/router"
import profileService from "@/services/ProfileService"
import ProfileData from "@/models/ProfileData.model"
import NotFoundError from "@/components/svgs/NotFoundError"

const Page: NextPageWithLayout = () => {
  const router = useRouter()
  const [profileData, setProfileData] = useState<ProfileData | null>(null)
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(true)

  const _username = router.query.username as string

  useEffect(() => {
    if (!router.query.username) return

    setError(false)
    const fetchData = async () => {
      try {
        const _profileData = await profileService.getProfileDataByUsername(
          _username
        )
        setLoading(false)
        setProfileData(_profileData)
      } catch (error) {
        setLoading(false)
        setError(true)
      }
    }

    fetchData()
  }, [router, _username])
  if (loading)
    return (
      <div className="w-full h-full flex flex-col justify-center ">
        <span className="loaderLobby mx-auto"></span>
      </div>
    )

  if (error)
    return (
      <div className="animate__animated animate__fadeIn h-full">
        <div className="flex flex-col justify-center items-center h-full">
          <NotFoundError className="m-5" height={80} width={80} />
          <div>
            <div className="text- mb-1">Oops</div>
            <p className="  text-gray-400 text-base font-extralight">
              {`Profile ${_username} was not found`}
            </p>
            <p className="  text-gray-400 text-base font-extralight">
              {`Perhaps the spelling of the name isn't correct?`}
            </p>
          </div>
        </div>
      </div>
    )
  else if (profileData)
    return (
      <div className="animate__animated animate__fadeIn flex flex-col h-full">
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
