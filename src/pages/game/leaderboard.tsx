import Podium from "@/UI/game/leaderboard/Podium"
import TableHead from "@/UI/game/leaderboard/TableHead"
import TableRow from "@/UI/game/leaderboard/TableRow"
import { NextPageWithLayout } from "../_app"
import { ReactElement, useEffect, useState } from "react"
import Layout from "@/UI/Layout"
import HeadTitle from "@/components/BaseComponents/HeadTitle"
import profileService from "@/services/ProfileService"
import ProfileLeaderboardData from "@/models/ProfileLeaderboardData.model"

const Page: NextPageWithLayout = () => {
  const [leaderboard, setLeaderboard] = useState<ProfileLeaderboardData[]>([])

  useEffect(() => {
    const fetchData = async () => {
      const _leaderboard = await profileService.getLeaderboard()
      setLeaderboard(_leaderboard)
    }

    fetchData()
  }, [])

  return (
    <div className="mx-auto flex flex-col gap-5 container pt-24">
      <HeadTitle>Pong Fury | Leadeboard</HeadTitle>

      <div className="flex gap-5 justify-around mb-8">
        <div></div>
        {leaderboard.map((element, index) => {
          if (index < 3)
            return (
              <Podium
                playerAvatar={element.avatarUrl}
                playerName={element.username}
                position={index + 1}
                rp={element.profile.rating}
              />
            )
        })}
        <div className="order-5"></div>
      </div>

      <div className="flex flex-col ">
        <TableHead className="h-14 w-fill flex   pl-8 pr-16   text-sm text-slate-600 " />
        <div className="flex flex-col gap-3">
          {leaderboard.map((element, index) => {
            return (
              <TableRow
                key={element.id}
                playerAvatar={element.avatarUrl}
                playerName={element.username}
                rank={index + 4}
                rp={element.profile.rating}
                winrate={element.winrate}
                nbGame={element.games}
              />
            )
          })}
        </div>
      </div>
    </div>
  )
}

Page.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>
}

export default Page
