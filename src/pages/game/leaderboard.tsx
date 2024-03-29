import Podium from "@/UI/game/leaderboard/Podium"
import TableHead from "@/UI/game/leaderboard/TableHead"
import TableRow from "@/UI/game/leaderboard/TableRow"
import { NextPageWithLayout } from "../_app"
import { ReactElement, useEffect, useRef, useState } from "react"
import Layout from "@/UI/Layout"
import HeadTitle from "@/components/BaseComponents/HeadTitle"
import profileService from "@/services/ProfileService"
import ProfileLeaderboardData from "@/models/ProfileLeaderboardData.model"
import MainButton from "@/components/BaseComponents/MainButton"

const Page: NextPageWithLayout = () => {
  const [leaderboard, setLeaderboard] = useState<ProfileLeaderboardData[]>([])
  const [shouldLoadMore, setShouldLoadMore] = useState(false)
  const [loading, setLoading] = useState(true)

  const fetchData = async () => {
    try {
      const _leaderboard = await profileService.getLeaderboard()
      setLoading(false)
      if (_leaderboard.length < 10) setShouldLoadMore(false)
      else setShouldLoadMore(true)

      setLeaderboard(_leaderboard)
    } catch (error) {
      setLoading(false)
      console.log("Couldn't fetch leaderboard")
    }
  }
  useEffect(() => {
    fetchData()
  }, [])

  const onLoadMore = async () => {
    if (shouldLoadMore === false) return

    try {
      const _leaderboardAppend = await profileService.getLeaderboardOffset(
        leaderboard.length
      )
      _leaderboardAppend.length === 0 && setShouldLoadMore(false)
      setLeaderboard(leaderboard.concat(_leaderboardAppend))
    } catch (error) {
      console.log("Couldn't load more profiles")
    }
  }

  if (loading)
    return (
      <div className="w-full h-full flex flex-col justify-center ">
        <span className="loaderLobby mx-auto"></span>
      </div>
    )

  return (
    <div className="mx-auto flex flex-col gap-5 container pt-24 animate__animated animate__fadeIn">
      <HeadTitle>Pong Fury | Leadeboard</HeadTitle>

      <div className="flex gap-5 justify-around mb-8">
        <div></div>
        {leaderboard.map((e, index) => {
          if (index < 3)
            return (
              <Podium
			    key={e.id}
                playerAvatar={e.avatarUrl}
                playerName={e.username}
                position={index + 1}
                rp={e.profile.rating}
                count = {leaderboard.length}
              />
            )
        })}
        <div className="order-5"></div>
      </div>

      <div className="flex flex-col max-w-[100vw] overflow-x-scroll ">
        {leaderboard.length > 3 && (
          <TableHead className="h-14  min-w-[44rem]  ml-8 mr-16 text-sm text-slate-600" />
        )}
        <div className="flex flex-col gap-3 min-w-[50rem]  ">
          {leaderboard.map((e, index) => {
            if (index > 2)
              return (
                <TableRow
                  key={e.id}
                  playerAvatar={e.avatarUrl}
                  playerName={e.username}
                  rank={index + 1}
                  rp={e.profile.rating}
                  winrate={e.winrate?.toFixed(2) || "N/A"}
                  nbGame={e.games}
                />
              )
          })}
        </div>
      </div>
      {shouldLoadMore && (
        <MainButton className="py-4" onClick={onLoadMore}>
          Load More
        </MainButton>
      )}
    </div>
  )
}

Page.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>
}

export default Page
