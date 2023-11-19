import EndGame from "@/UI/game/lobby/EndGame"
import { ReactElement, useEffect, useState } from "react"
import Lobby from "@/models/Lobby.model"
import { NextPageWithLayout } from "../_app"
import Layout from "@/UI/Layout"
import { useRouter } from "next/router"

const Page: NextPageWithLayout = () => {
  let [lobby, setLobby] = useState<Lobby | null>(null)
  const router = useRouter()
  useEffect(() => {
    const lobbyData = window.localStorage.getItem("lobbyData")
    if (!lobbyData) router.push("/game/lobby")
    setLobby(JSON.parse(lobbyData!))
  }, [])

  return <>{lobby ? <EndGame lobby={lobby} /> : null}</>
}

Page.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>
}

export default Page
