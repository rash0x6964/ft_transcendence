import React, { useContext, useEffect, useRef } from "react"
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
import { NotifciationsContext } from "@/UI/NotificationProvider"
import StoreIcon from "../svgs/StoreIcon"

type Props = {
  className?: string
}

export default function LeftBar({ className }: Props) {
  const [notifciations] = useContext(NotifciationsContext)

  const boxRef = useRef<HTMLDivElement>(null)
  const notifRef = useRef<HTMLButtonElement>(null)
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
    {
      icon: <StoreIcon />,
      href: "/game/store",
    },
  ]

  useEffect(() => {
    let handler = (e: any) => {
      if (!boxRef.current) return
      if (notifRef.current && notifRef.current.contains(e.target)) return
      if (boxRef.current.contains(e.target)) return
      setShowNotif(false)
    }

    document.addEventListener("mouseup", handler)

    return () => {
      document.removeEventListener("mouseup", handler)
    }
  })

  const [showNotif, setShowNotif] = useState(false)
  return (
    <>
      <AnimatePresence>
        {showNotif && <NotificationBox boxRef={boxRef} />}
      </AnimatePresence>

      <div className={className}>
        <div className="flex flex-col gap-6">
          {links.map((link, i) => (
            <Button key={`link-${i}`} href={link.href} icon={link.icon} />
          ))}
        </div>
        <div className="flex flex-col gap-y-4">
          <button
            ref={notifRef}
            onClick={() => setShowNotif((prev) => !prev)}
            className="mx-auto hover:opacity-60 transition-opacity relative"
          >
            {notifciations.length > 0 && (
              <div className="w-2 h-2 bg-red-500 rounded-full  absolute top-1 left-0"></div>
            )}
            <Notif />
          </button>
        </div>
      </div>
    </>
  )
}
