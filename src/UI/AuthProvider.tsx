import { PropsWithChildren } from "react"
import { usePathname, useRouter } from "next/navigation"
import { getJwtCookie } from "@/services/CookiesService"

export default function AuthProvider({ children }: PropsWithChildren) {
  const publicRoutes: string[] = ["/signin", "signup"]
  const curentPath = usePathname()
  const router = useRouter()

  if (!getJwtCookie() && !publicRoutes.includes(curentPath))
    router.push("/signin")

  return <>{children} </>
}
