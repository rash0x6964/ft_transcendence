import { NextPageWithLayout } from "../_app"
import { ReactElement, useContext, useEffect } from "react"
import Layout from "@/UI/Layout"
import UrlPipe from "@/UI/game/chat/Chat/Messages/Transformer"
import HeadTitle from "@/components/BaseComponents/HeadTitle"
import { ProfileContext } from "@/UI/ActiveUserProvider"
import { useRouter } from "next/router"
import { redirect } from "next/navigation"
const Page: NextPageWithLayout = () => {
  const { profileData } = useContext(ProfileContext)
  const router = useRouter()
  router.push("/game/profile/" + profileData.username)
  return <></>
}

Page.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>
}

export default Page
