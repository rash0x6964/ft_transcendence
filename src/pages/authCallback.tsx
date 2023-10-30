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
    cookieService.setJwtCookie(infoCookie)
    cookieService.deleteInfoCookie()
    router.replace("/")
  }

  const linkAccount = () => {
    cookieService.deleteProviderCookie()
    userService
      .addProvider({ providerInfoToken: providerCookie })
      .then((res) => {})
      .catch((err) => {
        console.log(err)
      })
  }

  const signUp = () => {
    cookieService.deleteProviderCookie()
    userService
      .createByProvider({ providerInfoToken: providerCookie })
      .then((res) => {
        cookieService.setJwtCookie(res.access_token)
      })
      .catch((err) => console.log(err))
    router.replace("/")
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

  return <>hello logic</>
}

export default Page
