import { useEffect, type ReactElement, useRef } from "react"
import { NextPageWithLayout } from "@/pages/_app"
import Layout from "@/UI/Layout"
import Head from "next/head"
import { Audiowide, Lexend } from "next/font/google"
import MainButton from "@/components/BaseComponents/MainButton"

import Logo from "@/components/svgs/Logo"
import Link from "next/link"
import CookiesService from "@/services/CookiesService"
const lexend = Lexend({ subsets: ["latin"] })
const audiowide = Audiowide({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
})
const Page = () => {
  const mainDiv = useRef<HTMLDivElement>(null)

  //   useEffect(() => {
  //     mainDiv.current?.scrollTo(0, 0)
  //     const handler = (e: Event) => {
  //       e.preventDefault()
  //       document
  //         .getElementsByClassName("SECOND")[0]
  //         .scrollIntoView({ behavior: "smooth" })
  //     }
  //     window.addEventListener("wheel", handler)
  //     return () => {
  //       window.removeEventListener("wheel", handler)
  //     }
  //   }, [])
  return (
    <div className={`${lexend.className} min-w-[100vw] `}>
      <div className="w-screen fixed h-screen  bg-gradient-to-r from-10% to-80% from-backdrop to-mirage -z-10 "></div>
      <Link className="absolute left-0 top-0 m-5" href={"/"}>
        <Logo className="text-primary" />{" "}
      </Link>
      {/* first page */}
      <div className="container mx-auto h-screen  flex ">
        <div className="flex gap-36 w-full ">
          <div className="flex-col flex w-1/2 my-auto">
            <div
              className={"animate-pulse text-7xl pb-2 " + audiowide.className}
            >
              PONG FURY
            </div>
            <p className="text-base font-ligh mb-4">
              Contrary to popular belief, Lorem Ipsum is not simply random text.
              Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum"
              by Cicero are also reproduced in their exact original form, used
              since the 1500s is reproduced below for those interested.
            </p>

            <div className="flex gap-2">
              {CookiesService.isLoggedIn() && (
                <Link href="/game">
                  {" "}
                  <MainButton className="px-14 py-4">Play</MainButton>{" "}
                </Link>
              )}

              {!CookiesService.isLoggedIn() && (
                <Link href="/signin">
                  {" "}
                  <MainButton className="w-36 py-4">Sign In</MainButton>{" "}
                </Link>
              )}
              <MainButton className="w-36 py-4">Explore</MainButton>
            </div>
          </div>
          <div className="w-[33vw] h-[40vh] border-4 border-primary relative my-auto ">
            <div className="absolute ml-2 top-[30%] h-fit">
              <div className="w-6  h-[10vh] relative">
                <div className="w-full h-full blur-[4px] bg-primary absolute"></div>
                <div className="w-full h-full ab bg-primary "></div>
              </div>
            </div>
            <div className="absolute mr-2  right-0 top-[60%]">
              <div className="w-6  h-[10vh] relative">
                <div className="w-full h-full blur-[4px] bg-primary absolute"></div>
                <div className="w-full h-full ab bg-primary "></div>
              </div>
            </div>

            <div className="w-8 h-8 bg-primary absolute left-1/2 top-1/2 rounded-full"></div>
            <div className="h-full w-[2px] bg-primary mx-auto"></div>
          </div>{" "}
        </div>
      </div>
    </div>
  )
}

export default Page
