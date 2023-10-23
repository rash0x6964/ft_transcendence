import { PropsWithChildren, useEffect } from "react"
import { usePathname } from "next/navigation"
import { getJwtCookie } from "@/services/CookiesService"
import { useRouter } from "next/router"

export default function AuthProvider({ children }: PropsWithChildren) {
  const publicRoutes: string[] = ["/signin", "/signup"]
  const curentPath = usePathname()
  const router = useRouter()

  if (!getJwtCookie() && !publicRoutes.includes(curentPath))
    router.push("/signin")
  return <>{children} </>
}
