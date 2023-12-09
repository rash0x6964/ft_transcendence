import React from "react"
import Github from "../svgs/Github"
import Intra from "../svgs/Intra"
import Google from "../svgs/Google"
import GoogleAuth from "../svgs/GoogleAuth"
import env from "@/constants/constants"
import Link from "next/link"
type Props = {
  onClick?: () => void
  glow?: Boolean
  className?: string
  provider: "github" | "fortytwo" | "google" | "googleAuth"
  link?: boolean
}

export default function AuthButton({
  onClick,
  glow = false,
  className,
  provider,
  link = false,
}: Props) {
  const loginUrl = `${env.endPoint}/${provider}Authentication/login`
  if (link)
    return (
      <Link href={loginUrl}>
        <div
          onClick={onClick}
          className={`rounded-md px-10 py-3  duration-300 bg-backdrop hover:bg-secondary-900  ${className}`}
        >
          {provider === "google" && <Google />}
          {provider === "fortytwo" && <Intra />}
          {provider === "github" && <Github />}
        </div>
      </Link>
    )
  else
    return (
      <div
        onClick={onClick}
        className={`rounded-md px-10 py-3  duration-300 bg-backdrop hover:bg-secondary-900  ${className}`}
      >
        {provider === "google" && <Google />}
        {provider === "fortytwo" && <Intra />}
        {provider === "github" && <Github />}
        {provider === "googleAuth" && <GoogleAuth />}
      </div>
    )
}
