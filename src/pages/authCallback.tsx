import {
  deleteInfoCookie,
  deleteProviderCookie,
  getInfoCookie,
  getJwtCookie,
  getProvdierCookie,
  setJwtCookie,
} from "@/services/CookiesService"
import { addProvider, createByProvider } from "@/services/UsersService"
import { NextPage } from "next"
import { useRouter } from "next/router"
import { useEffect } from "react"

const Page: NextPage = () => {
  const router = useRouter()
  const infoCookie = getInfoCookie()
  const userCookie = getJwtCookie()
  const providerCookie = getProvdierCookie()

  const signIn = () => {
    setJwtCookie(infoCookie)
    deleteInfoCookie()
    router.replace("/")
  }
  const linkAccount = () => {
    deleteProviderCookie()
    addProvider({ providerInfoToken: providerCookie })
      .then((res) => {})
      .catch((err) => {
        console.log(err)
      })
    router.replace("/settings/security")
  }

  const signUp = () => {
    deleteProviderCookie()
    createByProvider({ providerInfoToken: providerCookie })
      .then((res) => {
        setJwtCookie(res.access_token)
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
      linkAccount()
    }
  }, [])

  return <>hello logic</>
}

export default Page
