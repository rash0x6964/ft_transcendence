import Achievements from "@/UI/game/profile/(achievements)/Achievements"
import PlayerInfoBar from "@/UI/game/profile/(topSide)/PlayerInfoBar"
import MatchHistory from "@/UI/game/profile/(matches)/MatchHistory"
import { NextPageWithLayout } from "../../_app"
import { ReactElement, useEffect, useState } from "react"
import Layout from "@/UI/Layout"
import HeadTitle from "@/components/BaseComponents/HeadTitle"
import { useRouter } from "next/router"
import profileService from "@/services/ProfileService"
import ProfileData from "@/models/ProfileData.model"
import NotFoundError from "@/components/svgs/NotFoundError"
import MatchesStats from "@/types/MatchesStats"
import Achievement from "@/models/Achievement.model"
import achievementService from "@/services/AchievementService"
import matchService from "@/services/MatchService"
import AchievementUser from "@/types/AchievementUser"
import MatchDisplayData from "@/types/MatchDisplayData"

const Page: NextPageWithLayout = () => {
  const router = useRouter()
  const [profileData, setProfileData] = useState<ProfileData | null>(null)
  const [stats, setStats] = useState<MatchesStats | null>(null)
  const [achievements, setAchievements] = useState<Achievement[]>([])
  const [achievementsUser, setAchievementsUser] = useState<AchievementUser[]>(
    []
  )
  const [matches, setMatches] = useState<MatchDisplayData[]>([])
  const [shouldLoadMore, setShouldLoadMore] = useState(false)

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
        setProfileData(_profileData)

        const promises = [
          achievementService.getAllAchievements(),
          achievementService.getUserAchievementsById(_profileData.id),
          matchService.getStatsById(_profileData.id),
          matchService.getAllMatchesByIdByOffset(_profileData.id, 0),
        ]
        const [allAchievements, _ach, _stats, matchModels] = await Promise.all(
          promises
        )
        setStats(_stats)
        setAchievements(_ach.slice(0, 3))
        const achievs: AchievementUser[] = allAchievements.map(
          (achievement: Achievement) => {
            return {
              ...achievement,
              active: _ach.some(
                (ach: Achievement) => ach.id === achievement.id
              ),
            }
          }
        )
        setAchievementsUser(achievs)

        if (matchModels.length < 20) setShouldLoadMore(false)
        else setShouldLoadMore(true)

        setMatches(await matchService.getMatchProps(_profileData, matchModels))
        setLoading(false)
      } catch (error) {
        setError(true)
        setLoading(false)
      }
    }

    fetchData()
  }, [router, _username])

  const onLoadMore = async () => {
    if (!profileData || shouldLoadMore === false) return

    try {
      const _matchAppend = await matchService.getAllMatchesByIdByOffset(
        profileData.id,
        matches.length
      )
      const _matchAppendModels = await matchService.getMatchProps(
        profileData,
        _matchAppend
      )
      _matchAppend.length === 0 && setShouldLoadMore(false)
      setMatches(matches.concat(_matchAppendModels))
    } catch (error) {
      console.log("Couldn't fetch more matches")
    }
  }

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
      <div className="animate__animated animate__fadeIn flex flex-col h-full px-10">
        <HeadTitle>Profile | {profileData.username}</HeadTitle>

        <div className="w-full  relative rounded-[20px] ">
          <img
            src={profileData.bannerUrl}
            className=" object-cover rounded-[20px] absolute  w-full h-full"
            alt=""
          />
          <div className="w-full h-full rounded-[20px] bg-[#0A0E12]/75 backdrop-blur-[5px] absolute flex justify-around items-center px-12"></div>
          <PlayerInfoBar
            profileData={profileData}
            stats={stats}
            achievements={achievements}
          />
        </div>
        <div className="flex container mx-auto overflow-y-scroll flex-row-reverse">
          <MatchHistory
            matches={matches}
            shouldLoadMore={shouldLoadMore}
            onLoadMore={onLoadMore}
          />
          <Achievements achievements={achievementsUser} />
        </div>
      </div>
    )
}

Page.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>
}

export default Page
