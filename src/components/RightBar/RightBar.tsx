import React, { useContext, useRef, useState } from "react"
import Person from "./Person"
import Friend from "../svgs/Friend"
import DialButton from "@/UI/game/chat/ChatBar/DialogueBoxes/DialButton"
import AddUser from "../svgs/AddUser"
import Dialogue from "../Dialogue/Dialogue"
import FriendRequestsDialBox from "@/UI/game/chat/ChatBar/DialogueBoxes/FriendRequestsDialBox"
import FriendCheck from "../svgs/FriendCheck"
import SearchPersonDialBox from "@/UI/game/chat/ChatBar/DialogueBoxes/SearchPersonDialBox"
import FriendService from "@/services/Friend.service"
import FriendStatus from "@/models/FriendStatus.model"

import { MouseEvent } from "react"
import { WebSocketContext } from "@/UI/WebSocketContextWrapper"
import { NotifcationContext } from "@/UI/NotificationProvider"
import NotifData from "@/types/NotifData"
import { useRightBarSocket } from "./Helpers/RightBarHandlers"

type Props = {
  className?: string
}

export default function RightBar({ className }: Props) {
  const socket = useContext(WebSocketContext)
  const [dialogueClosed, setDialogueClosed] = useState(true)
  const [dialogueClosedFriends, setDialogueClosedFriends] = useState(true)

  const [friendList] = useRightBarSocket(socket)

  return (
    <>
      <Dialogue
        onBackDropClick={() => setDialogueClosed(true)}
        closed={dialogueClosed}
      >
        <FriendRequestsDialBox />
      </Dialogue>

      <Dialogue
        onBackDropClick={() => setDialogueClosedFriends(true)}
        closed={dialogueClosedFriends}
      >
        <SearchPersonDialBox />
      </Dialogue>

      <div
        className={`bg-secondary rounded-lg  pb-2 pt-5  h-full  w-16 ${className}`}
      >
        <div className="flex flex-col  h-full gap-5 items-center">
          <Friend />
          <div className="w-[29px] h-[1px] bg-slate-700"></div>
          <div className="flex-1">
            <div className="flex-col flex max-h-[70vh] gap-2 overflow-x-visible overflow-y-scroll  ">
              {friendList.map((data) => (
                <Person key={data.friend?.id} friendStatusData={data} />
              ))}
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center gap-2 ">
          <DialButton
            onClick={() => setDialogueClosed(false)}
            className="w-fit mx-auto"
          >
            <FriendCheck width={16} height={16} />
          </DialButton>
          <div className="w-[29px] h-[1px] bg-slate-700 "></div>
          <DialButton
            onClick={() => setDialogueClosedFriends(false)}
            className="w-fit mx-auto"
          >
            <AddUser width={16} height={16} />
          </DialButton>
        </div>
      </div>
    </>
  )
}
