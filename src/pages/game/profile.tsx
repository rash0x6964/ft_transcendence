import Achievements from "@/UI/game/profile/(achievements)/Achievements";
import PlayerInfoBar from "@/UI/game/profile/(topSide)/PlayerInfoBar";
import MatchHistory from "@/UI/game/profile/(matches)/MatchHistory";
import { NextPageWithLayout } from "../_app";
import { ReactElement } from "react";
import Layout from "@/UI/Layout";

const Page: NextPageWithLayout = () => {

  return (
    <div className="flex flex-col h-full">
      <div className="relative">
        <div className="m-10">
          <img
            className="rounded-[40px] w-[200%] h-72 -z-10 blur-[3px] object-cover"
            src="https://www.mobafire.com/images/champion/skins/landscape/yasuo-sea-dog-762x.jpg"
            alt="backdrop"
          />
        </div>
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
	return (
		<Layout>
			{page}
		</Layout>
	)
}

export default Page
