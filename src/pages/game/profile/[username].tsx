import Achievements from "@/UI/game/profile/(achievements)/Achievements"
import PlayerInfoBar from "@/UI/game/profile/(topSide)/PlayerInfoBar"
import MatchHistory from "@/UI/game/profile/(matches)/MatchHistory"
import { NextPageWithLayout } from "../../_app"
import { ReactElement, useEffect, useState } from "react"
import Layout from "@/UI/Layout"
import HeadTitle from "@/components/BaseComponents/HeadTitle"
import BannerProfile from "@/UI/game/profile/(topSide)/BannerProfile"
import { useRouter } from "next/router"

const Page: NextPageWithLayout = () => {
  const [username, setUsername] = useState<string | null>(null)

  const router = useRouter()

  useEffect(() => {
    if (!router.query.username) return

    const username = router.query.username as string

    setUsername(username)
  }, [router])

  if (!username) return <div>loading...</div>
  else
    return (
      <div className="flex flex-col h-full">
        <HeadTitle>Profile | {username}</HeadTitle>

        <div className="relative">
          <BannerProfile />
          <PlayerInfoBar username={username} />
        </div>
        <div className="flex container mx-auto overflow-y-scroll">
          <Achievements />
          <MatchHistory />
        </div>
      </div>
    )
}

Page.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>
}

export default Page
