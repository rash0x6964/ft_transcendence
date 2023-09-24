"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"

type Props = {
  title?: string
  path: string
  icon: React.ReactNode
}

export default function NavButton({ title = "Profile", path, icon }: Props) {
  let href: string = "/settings/" + path
  let selected: boolean = href == usePathname()
  return (
    <Link
      href={href}
      className={
        "flex py-3 rounded-xl pl-3" +
        (selected ? " bg-selected" : " bg-secondary")
      }
    >
      {icon}
      <p className="pl-3">{title}</p>
    </Link>
  )
}
