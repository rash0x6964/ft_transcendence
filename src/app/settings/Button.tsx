import React from "react"
import Profile from "./icons/Profile"

type Props = {
  title?: string
  selected?: boolean
}

export default function Button({ title = "Profile", selected = false }: Props) {
  return (
    <div className={"flex py-3 rounded-xl pl-3" + (selected ? " bg-selected" : " bg-secondary") }>
      <Profile />
      <p className="pl-3">{title}</p>
    </div>
  )
}
