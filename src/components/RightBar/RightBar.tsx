import React from "react"
import Person from "./Person"
import FriendIcon from "../svgs/Friend"
import Friend from "../svgs/Friend"

type Props = {
  className?: string
}

export default function RightBar({ className }: Props) {
  return (
    <div className={className}>
      <Friend />
	  <div className="w-[29px] h-[1px] bg-slate-700"></div>
      <Person userName="rash" state="hidden" />
    </div>
  )
}
