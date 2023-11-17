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
import MemberSection from "./MemberSection"
import AddUser from "@/components/svgs/AddUser"
import env from "@/environment/environment"

type Props = {
  onEdit: () => void
  selectedChannel: Channel
  onLeave: (id: string) => void
}

export default function ChannelInfo({
  selectedChannel,
  onLeave,
  onEdit,
}: Props) {
  const socket = useContext(WebSocketContext)
  const notify = useContext(NotifcationContext)

  const menuRef = useRef<HTMLDivElement>(null)
  const [clicked, setClicked, position, setPosition] = useContextMenu(menuRef)

  const [channelMembers, setChannelMembers] = useState<ChannelUser[]>([])

  const [dialogueState, setDialogueState] = useState(true)
  const [dialogueMuteState, setDialogueMuteState] = useState(true)
  const [selectedData, setSelectedData] = useState<ChannelUser | undefined>(
    undefined
  )

  useEffect(() => {
    ChannelUserService.getChannelMemberUser(selectedChannel.id)
      .then(({ data }: { data: ChannelUser[] }) => {
        setChannelMembers(data)
      })
      .catch((err) => {})
  }, [selectedChannel])

  useEffect(() => {
    const _join = (data: ChannelUser) => {
      if (data.channelID != selectedChannel.id) return
      setChannelMembers((prevMemberList) => {
        return prevMemberList.concat(data)
      })
    }
    const _left = (data: any) => {
      if (data.data.channelID != selectedChannel.id) return
      setChannelMembers((prevMemberList) => {
        return prevMemberList.filter((item) => item.userID != data.sender.id)
      })
    }
    const _unbanned = (data: any) => {
      if (data.channelID != selectedChannel.id) return
      setChannelMembers((prevMemberList) => {
        return prevMemberList.concat(data)
      })
    }
    const _banned = (data: any) => {
      if (data.channelID != selectedChannel.id) return
      setChannelMembers((prevMemberList) => {
        return prevMemberList.filter((item) => item.userID != data.userID)
      })
    }

    const _muted = (data: any) => {
      if (data.channelID != selectedChannel.id) return
      setChannelMembers((prevMemberList) => {
        return prevMemberList.map((item) => {
          if (item.userID == data.userID) item.status = data.status
          return item
        })
      })
    }

    const _connect = (userId: string) => {
      setChannelMembers((users) => {
        return users.map((user) => {
          if (user.user?.id == userId) user.user.onlineStatus = true
          return user
        })
      })
    }

    const _disconnect = (userId: string) => {
      setChannelMembers((users) => {
        return users.map((user) => {
          if (user.user?.id == userId) user.user.onlineStatus = false
          return user
        })
      })
    }

    const _presence = (data: any) => {
      setChannelMembers((users) => {
        return users.map((user) => {
          if (user.user?.id == data.sender.id && user.user?.state)
            user.user.state = data.data
          return user
        })
      })
    }

    const _role = (data: any) => {
      setChannelMembers((users) => {
        return users.map((user) => {
          if (user.userID == data.userID) user.role = data.role
          return user
        })
      })
    }

    socket?.on("newMemberJoind", _join)
    socket?.on("aMemberLeft", _left)
    socket?.on("aMemberUnbanned", _unbanned)
    socket?.on("aMemberBanned", _banned)
    socket?.on("aMemberKicked", _banned)
    socket?.on("aMemberMuted", _muted)
    socket?.on("connected", _connect)
    socket?.on("disconnected", _disconnect)
    socket?.on("presence", _presence)
    socket?.on("SomeOneRoleHasChanged", _role)

    return () => {
      socket?.off("newMemberJoind", _join)
      socket?.off("aMemberLeft", _left)
      socket?.off("aMemberUnbanned", _unbanned)
      socket?.off("aMemberBanned", _banned)
      socket?.off("aMemberKicked", _banned)
      socket?.off("aMemberMuted", _muted)
      socket?.off("connected", _connect)
      socket?.off("disconnected", _disconnect)
      socket?.off("presence", _presence)
      socket?.off("SomeOneRoleHasChanged", _role)
    }
  }, [selectedChannel])

  const acceptLeaving = (e: any) => {
    ChannelUserService.leaveChannel(selectedChannel.id)
      .then((res) => {
        socket?.emit("channelLeft", {
          token: cookieService.getJwtCookie(),
          data: getMembers("OWNER")[0],
        })

        notify({
          message: "You left the channel successfully",
          title: "Leave Channel",
          type: "success",
        })
        onLeave(selectedChannel.id)
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
    if (selectedChannel?.role == "MEMBER") return

    if (selectedChannel.role == data?.role || data?.role == "OWNER") return
    setSelectedData(data)
    setClicked(true)
    setPosition(getMenuPos(e, menuRef))
  }

  const handleKick = () => {
    let data: any = {
      channelID: selectedData?.channelID,
      userID: selectedData?.userID,
      role: selectedData?.role,
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
      channelID: selectedData?.channelID,
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

  const handleMute = (duration: number) => {
    let data: any = {
      channelID: selectedData?.channelID,
      userID: selectedData?.userID,
      duration: duration,
    }

    ChannelUserService.muteUserAtChannel(data)
      .then((res) => {
        socket?.emit("getMuted", {
          token: cookieService.getJwtCookie(),
          data: res.data,
        })
      })
      .catch((err) => {
        console.log(err)
      })
    setDialogueMuteState(true)
  }

  const handleClipBoard = () => {
    navigator.clipboard.writeText(
      window.location.host + `/game/chat/?type=invite&id=${selectedChannel.id}`
    )

    notify({
      title: "clipboard notice",
      message: "channel invite link copied to clipboard",
    })
  }
  const getMembers = (role: "OWNER" | "ADMINISTRATOR" | "MEMBER") => {
    return channelMembers.filter((user) => {
      return user.role == role && user.user?.onlineStatus == true
    })
  }

  const getOfflines = () => {
    return channelMembers.filter((user) => {
      return user.user?.onlineStatus == false
    })
  }

  return (
    <div className="gradient-border-2 shadow-lg py-4 rounded-xl  h-full flex flex-col">
      <ContextMenu MenuRef={menuRef} clicked={clicked} pos={position}>
        {/* <MenuBtn onClick={() => console.log('menuRef', menuRef)} title="Profile" /> */}
        <MenuBtn title="Kick" onClick={handleKick} />
        <MenuBtn title="Mute" onClick={() => setDialogueMuteState(false)} />
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
        <div className="gradient-border-2 p-7 rounded-xl w-[470px] h-fit flex flex-col">
          <button
            className="font-light w-full py-2 text-white text-center hover:text-slate-700 hover:bg-gradient-to-r from-transparent via-primary-500 to-transparent"
            onClick={() => handleMute(1)}
          >
            1 s
          </button>
          <button
            className="font-light w-full py-2 text-white text-center hover:text-slate-700 hover:bg-gradient-to-r from-transparent via-primary-500 to-transparent"
            onClick={() => handleMute(5 * 60)}
          >
            5 min
          </button>
          <button
            className="font-light w-full py-2 text-white text-center hover:text-slate-700 hover:bg-gradient-to-r from-transparent via-primary-500 to-transparent"
            onClick={() => handleMute(10 * 60)}
          >
            10 min
          </button>
          <button
            className="font-light w-full py-2 text-white text-center hover:text-slate-700 hover:bg-gradient-to-r from-transparent via-primary-500 to-transparent"
            onClick={() => handleMute(15 * 60)}
          >
            15 min
          </button>
        </div>
      </Dialogue>

      <div className="flex justify-between mx-4">
        <button
          className="cursor-pointer w-6 h-6   hover:scale-110 transition-all"
          onClick={() => handleClipBoard()}
        >
          <AddUser width={20} height={20} />
        </button>

        {selectedChannel && selectedChannel.role != "OWNER" ? (
          <LeaveRoom
            className="cursor-pointer w-6 h-6   hover:scale-110 transition-all"
            onClick={() => setDialogueState(false)}
          />
        ) : (
          <EditRoom
            className="cursor-pointer w-8 h-8   hover:scale-110 transition-all"
            onClick={onEdit}
          />
        )}
      </div>
      <div className="flex flex-col gap-5 py-10">
        <Avatar src={selectedChannel.imageUrl} className="w-40 h-40 mx-auto" />
        <span className="self-center">{selectedChannel.name}</span>
      </div>
      <div className="flex flex-1 flex-col gap-5 px-3 overflow-y-auto max-h-full">
        <MemberSection
          members={getMembers("OWNER")}
          handleContextMenu={handleContextMenu}
          title="Owner"
        />
        <MemberSection
          members={getMembers("ADMINISTRATOR")}
          handleContextMenu={handleContextMenu}
          title="Admins"
        />

        <MemberSection
          members={getMembers("MEMBER")}
          handleContextMenu={handleContextMenu}
          title="Members"
        />

        <MemberSection
          offline={true}
          members={getOfflines()}
          handleContextMenu={handleContextMenu}
          title="Offline"
        />
      </div>
    </div>
  )
}
