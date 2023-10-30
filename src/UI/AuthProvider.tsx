import { PropsWithChildren, useEffect } from "react"
import { usePathname } from "next/navigation"
import cookieService from "@/services/CookiesService"
import { useRouter } from "next/router"

export default function AuthProvider({ children }: PropsWithChildren) {
  const publicRoutes: string[] = ["/signin", "/signup", "authCallback"]
  const curentPath = usePathname()
  const router = useRouter()

  if (!cookieService.getJwtCookie() && !publicRoutes.includes(curentPath))
    router.push("/signin")
  return <>{children} </>
}
