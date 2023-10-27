import { PropsWithChildren, useEffect } from "react"
import { usePathname } from "next/navigation"
import { getInfoCookie, getJwtCookie } from "@/services/CookiesService"
import { useRouter } from "next/router"

export default function AuthProvider({ children }: PropsWithChildren) {
  const publicRoutes: string[] = ["/signin", "/signup", "authCallback"]
  const curentPath = usePathname()
  const router = useRouter()

  if (!getInfoCookie() && curentPath == "authCallback") router.push("/signup")
  else if (!getJwtCookie() && !publicRoutes.includes(curentPath))
    router.push("/signin")
  return <>{children} </>
}
