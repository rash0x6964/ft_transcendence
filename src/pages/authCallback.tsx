import cookieService from "@/services/CookiesService"
import userService from "@/services/UsersService"
import { NextPage } from "next"
import { useRouter } from "next/router"
import { useEffect } from "react"

const Page: NextPage = () => {
  const router = useRouter()
  const infoCookie = cookieService.getInfoCookie()
  const userCookie = cookieService.getJwtCookie()
  const providerCookie = cookieService.getProvdierCookie()

  const signIn = () => {
    if (cookieService.get2FACookie()) {
      router.replace("/signin")
    } else {
      cookieService.setJwtCookie(infoCookie!)
      cookieService.deleteInfoCookie()
      router.replace("/game")
    }
  }

  const linkAccount = () => {
    cookieService.deleteProviderCookie()
    userService
      .addProvider({ providerInfoToken: providerCookie! })
      .then((res) => {})
      .catch((err) => {
        console.log(err)
      })
  }

  const signUp = () => {
    cookieService.deleteProviderCookie()
    userService
      .createByProvider({ providerInfoToken: providerCookie! })
      .then((res) => {
        cookieService.setJwtCookie(res.access_token)
        router.replace("/settings/profile")
      })
      .catch((err) => router.replace("/signup"))
  }

  useEffect(() => {
    if (!userCookie) {
      if (infoCookie) {
        signIn()
      } else if (providerCookie) {
        signUp()
      } else router.replace("/signup")
    } else {
      if (providerCookie) linkAccount()
      else cookieService.deleteInfoCookie()
      router.replace("/settings/security")
    }
  }, [])

  return (
    <div className="h-screen w-screen  bg-gradient-to-r from-10% to-80% from-backdrop to-mirage flex flex-col justify-center">
      <span className="loaderLobby mx-auto"></span>
    </div>
  )
}

export default Page
