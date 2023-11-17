import React from "react"
import { useState } from "react"
import Sound from "../svgs/Sound"
import Notif from "../svgs/Notif"
import GameController from "../svgs/GameController"
import Menu from "../svgs/Menu"
import Chat from "../svgs/Chat"
import LeaderBoard from "../svgs/LeaderBoard"
import Button from "./Button"
import Bell from "../svgs/Bell"
import { motion, AnimatePresence } from "framer-motion"
import Avatar from "../BaseComponents/Avatar"
import DialButton from "@/UI/game/chat/ChatBar/DialogueBoxes/DialButton"
import Check from "../svgs/Check"
import Cross2 from "../svgs/Cross2"
import NotificationBox from "@/UI/game/chat/ChatBar/DialogueBoxes/NotificationBox"

type Props = {
  className?: string
}

export default function LeftBar({ className }: Props) {
  let links = [
    {
      icon: <Menu />,
      href: "/game",
    },
    {
      icon: <GameController />,
      href: "/game/lobby",
    },
    {
      icon: <Chat />,
      href: "/game/chat",
    },
    {
      icon: <LeaderBoard />,
      href: "/game/leaderboard",
    },
  ]

  const [showNotif, setShowNotif] = useState(false)
  return (
    <>
      <AnimatePresence>{showNotif && <NotificationBox />}</AnimatePresence>

      <div className={className}>
        <div className="flex flex-col gap-6">
          {links.map((link, i) => (
            <Button key={`link-${i}`} href={link.href} icon={link.icon} />
          ))}
        </div>
        <div className="flex flex-col gap-y-4">
          <button
            onClick={() => setShowNotif((prev) => !prev)}
            className="mx-auto hover:opacity-60 transition-opacity"
          >
            <Notif />
          </button>
          <div className="mx-auto w-[40px] h-[1px] bg-slate-700 "></div>
          <Sound className="mx-auto cursor-pointer" />
        </div>
      </div>
    </>
  )
}
