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
	console.log("in")
    setJwtCookie(infoCookie)
    deleteInfoCookie()
    router.replace("/")
  }
  const linkAccount = () => {
	console.log("link")

    deleteProviderCookie()
    addProvider({ providerInfoToken: providerCookie })
      .then((res) => {})
      .catch((err) => {
        console.log(err)
      })
  }

  const signUp = () => {
	console.log("up")

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
      if (providerCookie) linkAccount()
      else deleteInfoCookie()
      router.replace("/settings/security")
    }
  }, [])

  return <>hello logic</>
}

export default Page
