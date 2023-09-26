"use client"
import React, { CSSProperties, useRef } from "react"
import Avatar from "@/components/BaseComponents/Avatar"
import { useState } from "react"
import { useEffect } from "react"
import MainButton from "@/components/BaseComponents/MainButton"

function MenuBtn({ title, event }: { title: string; event?: () => void }) {
  return (
    <div
      className="flex flex-col p-3 bg-secondary rounded duration-300 py-3 w-36 hover:bg-primary hover:text-secondary font-light text-gray-400 text-xs"
      onClick={event}
    >
      {title}
    </div>
  )
}

function Menu({
  className,
  menuRef,
  style,
}: {
  className?: string
  menuRef: React.RefObject<HTMLInputElement>
  style: CSSProperties
}) {
  return (
    <div
      style={style}
      className={
        "flex flex-col p-3 w-fit bg-secondary rounded border border-gray-600 fixed z-50 " +
        className
      }
      ref={menuRef}
    >
      <MenuBtn title="Profile" />
      <MenuBtn title="Kick" />
      <MenuBtn title="Mute" />
      <MenuBtn title="Ban" />
    </div>
  )
}

type Props = {
  playerAvatar: string
  playerName: string
  playerState: string // enum
}

function Card({ playerAvatar, playerName, playerState }: Props) {
  const [clicked, setClicked] = useState(false)
  const [points, setPoints] = useState({
    x: 0,
    y: 0,
  })

  const menuRef = React.useRef<HTMLInputElement>(null)

  useEffect(() => {
    let handler = (e: MouseEvent) => {
      if (!menuRef.current?.contains(e.target as Node)) {
        setClicked(false)

        //   console.log(menuRef.current)
      }
    }
    document.addEventListener("mousemove", handler)
    ;() => {
      document.removeEventListener("mousemove", handler)
    }
  }, [])

  return (
    <div>
      <div
        className="flex gap-3 px-3 max-w-[309px] min-w-fit"
        onClick={(e) => {
          console.log(e)
          setPoints({
            x: e.pageX,
            y: e.pageY,
          })
          setClicked(!clicked)

          //   console.log(`here i'm i x:${points.x} y:${points.y}  | ${clicked}`)
          console.log(menuRef)
        }}
      >
        <Menu menuRef={menuRef} style={{ top: points.y, left: points.x }} />
        <Avatar
          className="w-10 h-10 cursor-pointer"
          src={playerAvatar}
          alt={playerName}
        />
        <div className="flex flex-col gap-1">
          <span className="self-center text-sm">{playerName}</span>
          <span className="text-[10px] text-primary font-light">
            {playerState}
          </span>
        </div>
      </div>
    </div>
  )
}

export default function ChannelInfo() {
  const adminsCount = 4

  return (
    <div className="gradient-border-2 shadow-lg pt-16 rounded-xl  h-full flex flex-col gap-10">
      <div className="flex flex-col gap-10">
        <Avatar
          src="https://steamavatar.io/img/1477787730Sbn8H.jpg"
          className="w-40 h-40 mx-20"
        />
        <span className="self-center">Paddle Wars</span>
      </div>
      <div className="flex flex-1 flex-col gap-5 px-3 overflow-y-auto max-h-full">
        <span>Admins - {adminsCount}</span>
        <Card
          playerAvatar="https://steamavatar.io/img/1477787737LDq2E.jpg"
          playerName="rash0x6964"
          playerState="In queue"
        />
        {/*
        <span>Online - {adminsCount}</span>
        <Card
          playerAvatar="https://steamavatar.io/img/1477787737LDq2E.jpg"
          playerName="rash0x6964"
          playerState="In queue"
        />
        <Card
          playerAvatar="https://steamavatar.io/img/1477787737LDq2E.jpg"
          playerName="rash0x6964"
          playerState="In queue"
        />
        <Card
          playerAvatar="https://steamavatar.io/img/1477787737LDq2E.jpg"
          playerName="rash0x6964"
          playerState="In queue"
        />
        <Card
          playerAvatar="https://steamavatar.io/img/1477787737LDq2E.jpg"
          playerName="rash0x6964"
          playerState="In queue"
        />
        <span>Offline - {adminsCount}</span>
        <Card
          playerAvatar="https://steamavatar.io/img/1477787737LDq2E.jpg"
          playerName="rash0x6964"
          playerState="In queue"
        />
        <Card
          playerAvatar="https://steamavatar.io/img/1477787737LDq2E.jpg"
          playerName="rash0x6964"
          playerState="In queue"
        />
        <Card
          playerAvatar="https://steamavatar.io/img/1477787737LDq2E.jpg"
          playerName="rash0x6964"
          playerState="In queue"
        />
        <Card
          playerAvatar="https://steamavatar.io/img/1477787737LDq2E.jpg"
          playerName="rash0x6964"
          playerState="In queue"
        /> */}

        {/* <Menu /> */}
      </div>
    </div>
  )
}
