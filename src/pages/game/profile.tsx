import Achievements from "@/UI/game/profile/(achievements)/Achievements"
import PlayerInfoBar from "@/UI/game/profile/(topSide)/PlayerInfoBar"
import MatchHistory from "@/UI/game/profile/(matches)/MatchHistory"
import { NextPageWithLayout } from "../_app"
import { ReactElement } from "react"
import Layout from "@/UI/Layout"
import HeadTitle from "@/components/BaseComponents/HeadTitle"
import BannerProfile from "@/UI/game/profile/(topSide)/BannerProfile"

const Page: NextPageWithLayout = () => {
  return (
    <div className="flex flex-col h-full">
      <HeadTitle>Profile | KiNCH3RO</HeadTitle>

      <div className="relative">
        <BannerProfile />
        <PlayerInfoBar />
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
