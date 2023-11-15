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
import ContextMenu, {
  MenuBtn,
  getMenuPos,
  useContextMenu,
} from "../BaseComponents/ContextMenu"
import { MouseEvent } from "react"
import { WebSocketContext } from "@/UI/WebSocketContextWrapper"
import { NotifcationContext } from "@/UI/NotificationProvider"
import NotifData from "@/types/NotifData"
import {
  handleBlock,
  handleFriendRemove,
  handleMute,
  handleUnMute,
  handleUnblock,
  isBlocked,
  isMuted,
  useRightBarSocket,
} from "./Helpers/RightBarHandlers"
import DMService from "@/services/DirectMessageService"
import { useRouter } from "next/router"
import DirectMessage from "@/models/DirectMessage.model"
type Props = {
  className?: string
}

export default function RightBar({ className }: Props) {
  const socket = useContext(WebSocketContext)
  const router = useRouter()
  const [dialogueClosed, setDialogueClosed] = useState(true)
  const [dialogueClosedFriends, setDialogueClosedFriends] = useState(true)
  const menuRef = useRef<HTMLDivElement>(null)
  const [clicked, setClicked, position, setPosition] = useContextMenu(menuRef)
  const [selectedData, setSelectedData] = useState<FriendStatus | null>(null)

  const [friendList, setFriendList] = useRightBarSocket(socket)

  const handleSendMessage = () => {
    if (!selectedData?.friend) return
    DMService.create(selectedData?.friend.id)
      .then(({ data }: { data: DirectMessage }) => {
        router.push(
          {
            pathname: "/game/chat",
            query: {
              type: "DM",
              id: data.id,
            },
          },
          "/game/chat"
        )
      })
      .catch((err) => {})
  }

  const handleContextMenu = (
    e: MouseEvent<HTMLDivElement>,
    data: FriendStatus
  ) => {
    setSelectedData(data)
    setClicked(true)
    setPosition(getMenuPos(e, menuRef))
  }

  return (
    <>
      <ContextMenu MenuRef={menuRef} clicked={clicked} pos={position}>
        <MenuBtn onClick={handleSendMessage} title="Send Message" />
        <MenuBtn onClick={() => alert("yes")} title="Profile" />

        {
          <MenuBtn
            onClick={() => {
              handleFriendRemove(selectedData, socket)
            }}
            title="Unfriend"
          />
        }
      </ContextMenu>
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
        <SearchPersonDialBox
          closeDialogue={() => setDialogueClosedFriends(true)}
        />
      </Dialogue>

      <div
        className={`bg-secondary rounded-lg  pb-2 pt-5  h-full  w-16 ${className}`}
      >
        <div className="flex flex-col justify-between h-full">
          <div className="flex flex-col gap-5 items-center ">
            <Friend />
            <div className="w-[29px] h-[1px] bg-slate-700"></div>
            <div className="flex flex-col gap-2">
              {friendList.map((data) => (
                <Person
                  key={data.friend?.id}
                  onContextMenu={(e) => {
                    handleContextMenu(e, data)
                  }}
                  src={data.friend?.avatarUrl}
                  userName={data.friend?.userName}
                  connected={data.friend?.onlineStatus || false}
                />
              ))}
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
      </div>
    </>
  )
}
