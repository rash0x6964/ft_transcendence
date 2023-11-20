import EndGame from "@/UI/game/lobby/EndGame"
import { ReactElement, useEffect, useState } from "react"
import { NextPageWithLayout } from "../_app"
import Layout from "@/UI/Layout"
import { useRouter } from "next/router"
import EndGameData from "@/types/EndGameData"

const Page: NextPageWithLayout = () => {
  let [endGameData, setEndGameData] = useState<EndGameData | null>(null)
  const router = useRouter()

  useEffect(() => {
    const data = window.sessionStorage.getItem("endGameData")

    if (!data) router.push("/game/lobby")
    setEndGameData(JSON.parse(data!))
  }, [])

  return <>{endGameData ? <EndGame data={endGameData} /> : null}</>
}

Page.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>
}

export default Page
