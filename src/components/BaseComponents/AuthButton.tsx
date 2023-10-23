import React from "react"
import Github from "../svgs/Github"
import Intra from "../svgs/Intra"
import Google from "../svgs/Google"
type Props = {
  onClick?: () => void
  glow?: Boolean
  className?: string
  provider: "github" | "fortytwo" | "google"
  link?: boolean
}

export default function AuthButton({
  onClick,
  glow = false,
  className,
  provider,
  link = false,
}: Props) {
  const loginUrl = `http://localhost:3001/${provider}Authentication/login`
  if (link)
    return (
      <a href={loginUrl}>
        <div
          onClick={onClick}
          className={`rounded-md px-10 py-3  duration-300 bg-backdrop hover:bg-secondary-900  ${className}`}
        >
          {provider === "google" && <Google />}
          {provider === "fortytwo" && <Intra />}
          {provider === "github" && <Github />}
        </div>
      </a>
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
      </div>
    )
}
