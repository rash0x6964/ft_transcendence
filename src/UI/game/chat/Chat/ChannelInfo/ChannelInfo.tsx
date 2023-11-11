"use client"
import React, { useContext, useEffect, useRef, useState } from "react"
import Avatar from "@/components/BaseComponents/Avatar"
import MemberCard from "./MemberCard"
import ContextMenu, {
  useContextMenu,
} from "@/components/BaseComponents/ContextMenu"
import { MouseEvent } from "react"
import { MenuBtn } from "@/components/BaseComponents/ContextMenu"
import { getMenuPos } from "@/components/BaseComponents/ContextMenu"
import { Channel, ChannelUser } from "@/models/Channel.model"
import ChannelUserService from "@/services/ChannelUser.service"
import LeaveRoom from "@/components/svgs/leaveRoom"
import EditRoom from "@/components/svgs/editChannel"
import { NotifcationContext } from "@/UI/NotificationProvider"
import Dialogue from "@/components/Dialogue/Dialogue"
import { WebSocketContext } from "@/UI/WebSocketContextWrapper"
import cookieService from "@/services/CookiesService"

type Props = {
  onEdit: () => void
  selectedChannel: Channel
  event: (id: string) => void
}

export default function ChannelInfo({ selectedChannel, event, onEdit }: Props) {
  const socket = useContext(WebSocketContext)
  const notify = useContext(NotifcationContext)

  const menuRef = useRef<HTMLDivElement>(null)
  const [clicked, setClicked, position, setPosition] = useContextMenu(menuRef)

  const [memberList, setMemberList] = useState<ChannelUser[]>([])
  const [adminList, setAdminList] = useState<ChannelUser[]>([])
  const [owner, setOwner] = useState<ChannelUser | undefined>(undefined)

  const [dialogueState, setDialogueState] = useState(true)
  const [dialogueMuteState, setDialogueMuteState] = useState(true)
  const [selectedData, setSelectedData] = useState<ChannelUser | undefined>(
    undefined
  )

  useEffect(() => {
    ChannelUserService.getChannelMemberUser(selectedChannel.id)
      .then(({ data }: { data: any }) => {
        setMemberList(
          data.filter((item: any) => {
            return item.role == "MEMBER"
          })
        )

        setAdminList(
          data.filter((item: any) => {
            return item.role == "ADMINISTRATOR"
          })
        )

        setOwner(
          data.find((item: any) => {
            return item.role == "OWNER"
          })
        )
      })
      .catch((err) => {})
  }, [selectedChannel])

  useEffect(() => {
    const _join = (data: any) => {
      setMemberList((prevMemberList) => {
        return prevMemberList.concat(data)
      })
    }
    const _left = (id: string) => {
      setMemberList((prevMemberList) => {
        return prevMemberList.filter((item) => item.userID != id)
      })
    }
    const _unbanned = (data: any) => {
      if (data.role == "MEMBER")
        setMemberList((prevMemberList) => {
          return prevMemberList.concat(data)
        })
      else if (data.role == "ADMINISTRATOR")
        setAdminList((prevAdminList) => {
          return prevAdminList.concat(data)
        })
    }
    const _banned = (data: any) => {
      if (data.role == "MEMBER")
        setMemberList((prevMemberList) => {
          return prevMemberList.filter((item) => item.userID != data.userID)
        })
      else if (data.role == "ADMINISTRATOR")
        setAdminList((prevAdminList) => {
          return prevAdminList.filter((item) => item.userID != data.userID)
        })
    }

    socket?.on("new member joind", _join)
    socket?.on("a member left", _left)
    socket?.on("aMemberUnbanned", _unbanned)
    socket?.on("aMemberBanned", _banned)
    socket?.on("aMemberKicked", _banned)

    return () => {
      socket?.off("new member joind", _join)
      socket?.off("a member left", _left)
      socket?.off("aMemberUnbanned", _unbanned)
      socket?.off("aMemberBanned", _banned)
      socket?.off("aMemberKicked", _banned)
    }
  }, [])

  const acceptLeaving = (e: any) => {
    ChannelUserService.leaveChannel(selectedChannel.id)
      .then((res) => {
        socket?.emit("channel left", {
          token: cookieService.getJwtCookie(),
          data: owner,
        })

        notify({
          message: "You left the channel successfully",
          title: "Leave Channel",
          type: "success",
        })
        event(selectedChannel.id)
        setDialogueState(true)
      })
      .catch((err) => {
        setDialogueState(true)
      })
  }

  const handleContextMenu = (
    e: MouseEvent<HTMLDivElement>,
    data: ChannelUser | undefined
  ) => {
    setSelectedData(data)
    setClicked(true)
    setPosition(getMenuPos(e, menuRef))
  }

  const handleKick = () => {
    let data: any = {
      userID: selectedData?.userID,
      channelID: selectedData?.channelID,
      role: selectedData?.role
    }

    ChannelUserService.kickUserFromChannel(
      selectedData?.channelID,
      selectedData?.userID
    )
      .then((res) => {
        socket?.emit("getKicked", {
          token: cookieService.getJwtCookie(),
          data: data,
        })
      })
      .catch((err) => {
        // console.log(err)
      })
  }

  const handleBan = () => {
    let data: any = {
      userID: selectedData?.userID,
      status: "BANNED",
    }

    ChannelUserService.blockUserAtChannel(data)
      .then((res) => {
        socket?.emit("getBanned", {
          token: cookieService.getJwtCookie(),
          data: res.data,
        })
      })
      .catch((err) => {
        // console.log(err)
      })
  }

  return (
    <div className="gradient-border-2 shadow-lg py-4 rounded-xl  h-full flex flex-col">
      {selectedChannel && selectedChannel.owner != "OWNER" ? (
        <LeaveRoom
          className="w-6 h-6 self-end mr-4 hover:scale-110 transition-all"
          onClick={() => setDialogueState(false)}
        />
      ) : (
        <EditRoom
          className="w-8 h-8 self-end mr-4 hover:scale-110 transition-all"
          onClick={onEdit}
        />
      )}
      <div className="flex flex-col gap-5 py-10">
        <Avatar src={selectedChannel.imageUrl} className="w-40 h-40 mx-auto" />
        <span className="self-center">{selectedChannel.name}</span>
      </div>
      <div className="flex flex-1 flex-col gap-5 px-3 overflow-y-auto max-h-full">
        <span className="text-gray-400 text-sm">Owner - 👑</span>
        <MemberCard
          playerAvatar={owner?.user?.avatarUrl ?? ""}
          playerName={owner?.user?.userName ?? "Unknown"}
          playerState={owner?.status ?? "idle"}
          data={owner}
        />
        {adminList.length ? (
          <span className="text-gray-400 text-sm">
            Admins - {adminList.length}
          </span>
        ) : (
          <></>
        )}
        {adminList.map((item) => {
          return (
            <MemberCard
              key={item.userID}
              onContextMenu={handleContextMenu}
              playerAvatar={item.user?.avatarUrl ?? ""}
              playerName={item.user?.userName ?? "Unknown"}
              playerState={item.status}
              data={item}
            />
          )
        })}
        {memberList.length ? (
          <span className="text-gray-400 text-sm">
            Member - {memberList.length}
          </span>
        ) : (
          <></>
        )}
        {memberList.map((item) => {
          return (
            <MemberCard
              key={item.userID}
              onContextMenu={handleContextMenu}
              playerAvatar={item.user?.avatarUrl ?? ""}
              playerName={item.user?.userName ?? "Unknown"}
              playerState={item.status}
              data={item}
            />
          )
        })}
      </div>
      <ContextMenu MenuRef={menuRef} clicked={clicked} pos={position}>
        {/* <MenuBtn onClick={() => console.log('menuRef', menuRef)} title="Profile" /> */}
        <MenuBtn title="Kick" onClick={handleKick} />
        <MenuBtn title="Mute" onClick={() => setDialogueMuteState(false)}/>
        <MenuBtn title="Ban" onClick={handleBan} />
      </ContextMenu>
      <Dialogue
        onBackDropClick={() => setDialogueState(true)}
        closed={dialogueState}
      >
        <div className="gradient-border-2 p-7 rounded-xl w-[470px] h-[198px] flex flex-col justify-between">
          <p className="font-light text-white ">Leaving Channel</p>
          <p className="font-light mb-9">
            are you sure you want to leave{" "}
            <span className="text-primary">{selectedChannel.name}</span> ??
          </p>
          <button
            className=" bg-red-500 py-2 px-5 rounded-md w-fit self-end"
            onClick={acceptLeaving}
          >
            Accept
          </button>
        </div>
      </Dialogue>
      <Dialogue
        onBackDropClick={() => setDialogueMuteState(true)}
        closed={dialogueMuteState}
      >
        <div className="gradient-border-2 p-7 rounded-xl w-[470px] h-[198px] flex flex-col">
          <p className="font-light w-full py-2 text-white text-center hover:bg-primary-500 hover:text-slate-700 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 ">1 s</p>
          <p className="font-light text-white self-center">10 min</p>
          <p className="font-light text-white self-center">15 min</p>
        </div>
      </Dialogue>
    </div>
  )
}
