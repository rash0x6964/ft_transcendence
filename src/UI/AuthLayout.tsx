import type { Metadata } from "next"
import { Lexend } from "next/font/google"
import Logo from "@/components/svgs/Logo"
import Link from "next/link"
import { useEffect } from "react"
import { useRouter } from "next/router"
import CookiesService from "@/services/CookiesService"

const lexend = Lexend({ subsets: ["latin"] })

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  useEffect(() => {
    if (CookiesService.getJwtCookie()) router.push("/game")
  }, [])
  return (
    <main className={lexend.className + " flex flex-col items-center"}>
      <Link href={"/"} className="self-start m-4">
        <Logo className="text-primary" />
      </Link>
      <div className="w-screen fixed h-screen  bg-gradient-to-br from-10% to-90% from-backdrop to-mirage -z-10">
        {children}
      </div>
    </main>
  )
}
