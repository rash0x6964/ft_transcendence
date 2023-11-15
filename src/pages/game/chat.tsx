import Layout from "@/UI/Layout"
import InnerChat from "@/UI/game/chat/InnerChat"
import ChannelInfo from "@/UI/game/chat/Chat/ChannelInfo/ChannelInfo"
import ChatBar from "@/UI/game/chat/ChatBar/ChatBar"
import FriendInfo from "@/UI/game/chat/FriendInfo/FriendInfo"
import HeadTitle from "@/components/BaseComponents/HeadTitle"
import Dialogue from "@/components/Dialogue/Dialogue"
import { Channel, ChannelUser } from "@/models/Channel.model"
import DirectMessage from "@/models/DirectMessage.model"
import ChannelService from "@/services/Channel.sevice"
import { ReactElement, useContext, useEffect, useState } from "react"
import { NextPageWithLayout } from "../_app"
import { useRouter } from "next/router"
import DMService from "@/services/DirectMessageService"
import JoinChannelDialBox from "@/UI/game/chat/ChatBar/DialogueBoxes/JoinChannelDialBox"
import ChannelSevice from "@/services/Channel.sevice"
import ChannelSetting from "@/UI/game/chat/Chat/ChannelSetting"
import { WebSocketContext } from "@/UI/WebSocketContextWrapper"
import Message from "@/models/Message.model"

const Page: NextPageWithLayout = () => {
  const socket = useContext(WebSocketContext)
  const [channelList, setChannelList] = useState<Channel[]>([])
  const [DMList, setDMList] = useState<DirectMessage[]>([])
  const [selected, setSelected] = useState<DirectMessage | Channel>()
  const [dialogueState, setDialogueState] = useState(true)
  const [refresh, setRefresh] = useState(true)
  const [showInfo, setShowInfo] = useState(true)
  const [channelTryingToJoin, setChannelTryingToJoin] = useState<
    Channel | undefined
  >(undefined)

  const [searchFor, setSearchFor] = useState("")
  const [isLoading, setIsLoading] = useState<{ dm: boolean; room: boolean }>({
    dm: false,
    room: false,
  })

  const [blockedUsers, setBlockerUsers] = useState<string[]>([])

  const initBlockedUser = (dms: DirectMessage[]) => {
    setBlockerUsers(
      dms
        .filter((Dm) => {
          let value = Dm.isSender ? "SENDER" : "RECEIVER"
          return Dm.blockStatus == value || Dm.blockStatus == "BOTH"
        })
        .map((data) => {
          return data.isSender ? data.receiverID : data.senderID
        })
    )
  }

  const router = useRouter()

  const isChannel = () => {
    return (selected as Channel)?.visibility != undefined
  }

  useEffect(() => {
    if (channelList.length) setSelected(channelList[0])
    else if (DMList.length) setSelected(DMList[0])
  }, [refresh])

  useEffect(() => {
    if (router.query?.type == "DM" && router.query?.id)
      setSelected(DMList.find((x) => x.id == router.query?.id))
    if (router.query?.type == "invite" && router.query?.id) {
      ChannelService.getChannelById(router.query?.id as string)
        .then(({ data }) => {
          setChannelTryingToJoin(data)
          setDialogueState(false)
        })
        .catch((err) => {})
    }
  }, [router])

  useEffect(() => {
    let timeout: any
    setIsLoading({ dm: true, room: true })
    if (searchFor == "") {
      timeout = setTimeout(() => {
        DMService.getDMList()
          .then(({ data }: { data: DirectMessage[] }) => {
            initBlockedUser(data)
            setDMList(data)
            setIsLoading((obj) => {
              return { ...obj, dm: false }
            })
            if (router.query?.type == "DM")
              setSelected(data.find((x) => x.id == router.query?.id))
            else if (data.length > 0) setSelected(data[0])
          })
          .catch((err) => {
            setIsLoading((obj) => {
              return { ...obj, dm: false }
            })
            //error
          })

        ChannelService.getChannelList()
          .then(({ data }: { data: Channel[] }) => {
            setChannelList(data)
            setIsLoading((obj) => {
              return { ...obj, room: false }
            })
            if (router.query?.type == "channel")
              setSelected(data.find((x) => x.id == router.query?.id))
            else if (data.length > 0 && selected != undefined)
              setSelected(data[0])
          })
          .catch((err) => {
            setIsLoading((obj) => {
              return { ...obj, room: false }
            })
            //error
          })
      }, 300)
    } else {
      timeout = setTimeout(() => {
        setDMList(
          DMList?.filter((item) => item.friend?.userName.startsWith(searchFor))
        )
        setIsLoading((obj) => {
          return { ...obj, dm: false }
        })
        ChannelSevice.getChannelByName(searchFor)
          .then((res) => {
            setChannelList(res.data)
            setIsLoading((obj) => {
              return { ...obj, room: false }
            })
          })
          .catch((err) => {
            setIsLoading((obj) => {
              return { ...obj, room: false }
            })
          })
      }, 1000)
    }

    return () => {
      clearTimeout(timeout)
    }
  }, [searchFor])

  useEffect(() => {
    const _updateSelectedChannel = (data: any) => {
      setChannelList((prevChannelList) => {
        return prevChannelList.map((item) => {
          if (item.id == data.id) {
            item = { ...item, ...data }
            if ((selected as Channel) && item.id == (selected as Channel).id) {
              setSelected(item)
            }
          }
          return item
        })
      })
    }

    const _deleteChannelEvent = (data: any) => {
      setChannelList((prevChannelList) => {
        return prevChannelList.filter((item) => {
          return item.id != data.id
        })
      })
      setRefresh((prevState) => !prevState)
      setChannelConfDialog(true)
    }

    const _ubannedFromChannel = (data: any) => {
      data.channel["isMemeber"] = true
      data.channel["role"] = data.role

      setChannelList((prevChannelList) => {
        return prevChannelList.concat(data.channel)
      })
    }

    const _outOfChannel = (data: any) => {
      setChannelList((prevChannelList) => {
        return prevChannelList.filter((item) => {
          return item.id != data.channelID
        })
      })
    }

    const _getMuted = (data: ChannelUser) => {
      setChannelList((prevChannelList) => {
        return prevChannelList.map((item: Channel) => {
          if (item.id == data.channelID) {
            item = { ...item, muteDuration: data.duration }
            if ((selected as Channel) && item.id == (selected as Channel).id) {
              setSelected(item)
            }
          }
          return item
        })
      })
    }

    const _connect = (userId: string) => {
      setDMList((users) => {
        return users.map((user) => {
          if (user.friend?.id == userId) user.friend.onlineStatus = true
          return user
        })
      })
    }

    const _disconnect = (userId: string) => {
      setDMList((users) => {
        return users.map((user) => {
          if (user.friend?.id == userId) user.friend.onlineStatus = false
          return user
        })
      })
    }

    const _directMessage = (data: DirectMessage) => {
      if (DMList.map((x) => x.friend?.id).includes(data.friend?.id)) return
      setDMList((prevState) => prevState.concat(data))
    }

    const privateMsg = (data: Message) => {
      setDMList((prevDmList) => {
        return prevDmList.map((DM) => {
          if (DM.id == data.directmessageID) {
            DM["message"] = data
            console.log(DM)
          }
          return DM
        })
      })
    }

    const channelMsg = (data: Message) => {
      setChannelList((prevChannelList) => {
        return prevChannelList.map((channel) => {
          if (channel.id == data.channelID) {
            channel["message"] = [data]
          }
          return channel
        })
      })
    }

    const _blocked_DM = (data: DirectMessage) => {
      setDMList((prevDmList) => {
        return prevDmList.map((dm) => {
          if (dm.id == data.id) dm.blockStatus = data.blockStatus
          return dm
        })
      })
    }

    const _unblocked_DM = (data: DirectMessage) => {
      setDMList((prevDmList) => {
        return prevDmList.map((dm) => {
          if (dm.id == data.id) dm.blockStatus = data.blockStatus
          return dm
        })
      })
    }

    socket?.on("channelUpdated", _updateSelectedChannel)
    socket?.on("roomRemoved", _deleteChannelEvent)
    socket?.on("youGetUnbanned", _ubannedFromChannel)
    socket?.on("youGetBanned", _outOfChannel)
    socket?.on("youGetKicked", _outOfChannel)
    socket?.on("youGetMuted", _getMuted)
    socket?.on("disconnected", _disconnect)
    socket?.on("connected", _connect)
    socket?.on("directMessage", _directMessage)
    socket?.on("channelMessage", channelMsg)

    socket?.on("privateMessage", privateMsg)

    socket?.on("youGotBlocked_DM", _blocked_DM)
    socket?.on("youGotUnblocked_DM", _unblocked_DM)

    return () => {
      socket?.off("channelUpdated", _updateSelectedChannel)
      socket?.off("roomRemoved", _deleteChannelEvent)
      socket?.off("youGetUnbanned", _ubannedFromChannel)
      socket?.off("youGetBanned", _outOfChannel)
      socket?.off("youGetKicked", _outOfChannel)
      socket?.off("youGetMuted", _getMuted)
      socket?.off("disconnected", _disconnect)
      socket?.off("connected", _connect)
      socket?.off("directMessage", _directMessage)
      socket?.off("channelMessage", channelMsg)

      socket?.off("privateMessage", privateMsg)

      socket?.off("youGotBlocked_DM", _blocked_DM)
      socket?.off("youGotUnblocked_DM", _unblocked_DM)
    }
  }, [selected])

  const clickOnChannel = (data: Channel) => {
    const obj = channelList.find((item) => item.id == data.id)
    if (obj?.isMemeber == true) {
      setSelected(obj)
    } else {
      setChannelTryingToJoin(obj)
      setDialogueState(false)
    }
  }

  const clickOnDm = (id: string) => {
    const obj = DMList.find((item) => item.id == id)
    setSelected(obj)
  }

  const roomCreated = (data: Channel) => {
    setChannelList((prevChannelList) => prevChannelList.concat(data))
    setSelected(data)
  }

  const roomJoined = (data: Channel) => {
    // setSearchFor("")
    setSelected(data)
    setDialogueState(true)
  }

  const roomLeaved = (channel_id: string) => {
    setChannelList((prevChannelList) =>
      prevChannelList.filter((item) => item.id != channel_id)
    )
    setRefresh((prevState) => !prevState)
  }

  const handleChange = (val: string) => {
    setSearchFor(val.trim())
  }

  const onBlock = () => {
    let dm: DirectMessage = selected as DirectMessage
    const currentUser =
      dm.friend?.id == dm.senderID ? dm.receiverID : dm.senderID
    const blockValue: "BOTH" | "NONE" | "SENDER" | "RECEIVER" =
      dm.senderID == currentUser ? "SENDER" : "RECEIVER"
    if (dm.blockStatus == blockValue || dm.blockStatus == "BOTH") {
      console.log("User already blocked")
      return
    }
    if (dm.blockStatus == "NONE") dm.blockStatus = blockValue
    else if (dm.blockStatus != blockValue) dm.blockStatus = "BOTH"
    setSelected((obj) => {
      return { ...(obj as DirectMessage), blockStatus: dm.blockStatus }
    })
    socket?.emit("DM_blockUser", { data: dm })
  }

  const unBlock = () => {
    let dm: DirectMessage = selected as DirectMessage
    const currentUser =
      dm.friend?.id == dm.senderID ? dm.receiverID : dm.senderID
    const blockValue: "BOTH" | "NONE" | "SENDER" | "RECEIVER" =
      dm.senderID == currentUser ? "RECEIVER" : "SENDER"
    if (dm.blockStatus == "NONE" || dm.blockStatus == blockValue) {
      console.log("User is not Blocked")
      return
    }
    if (dm.blockStatus == "BOTH") dm.blockStatus = blockValue
    else if (dm.blockStatus != blockValue) dm.blockStatus = "NONE"
    setSelected((obj) => {
      return { ...(obj as DirectMessage), blockStatus: dm.blockStatus }
    })
    socket?.emit("DM_unblockUser", { data: dm })
  }

  const onMute = () => {
    let dm: DirectMessage = selected as DirectMessage
    const currentUser =
      dm.friend?.id == dm.senderID ? dm.receiverID : dm.senderID
    const muteValue: "BOTH" | "NONE" | "SENDER" | "RECEIVER" =
      dm.senderID == currentUser ? "SENDER" : "RECEIVER"
    if (dm.muteStatus == muteValue || dm.muteStatus == "BOTH") {
      console.log("User already muted")
      return
    }
    if (dm.muteStatus == "NONE") dm.muteStatus = muteValue
    else if (dm.muteStatus != muteValue) dm.muteStatus = "BOTH"
    setSelected((obj) => {
      return { ...(obj as DirectMessage), blockStatus: dm.blockStatus }
    })
  }

  const unmute = () => {
    let dm: DirectMessage = selected as DirectMessage
    const currentUser =
      dm.friend?.id == dm.senderID ? dm.receiverID : dm.senderID
    const muteValue: "BOTH" | "NONE" | "SENDER" | "RECEIVER" =
      dm.senderID == currentUser ? "RECEIVER" : "SENDER"
    if (dm.muteStatus == "NONE" || dm.muteStatus == muteValue) {
      console.log("User is not muted")
      return
    }
    if (dm.muteStatus == "BOTH") dm.muteStatus = muteValue
    else if (dm.muteStatus != muteValue) dm.muteStatus = "NONE"
    setSelected((obj) => {
      return { ...(obj as DirectMessage), blockStatus: dm.blockStatus }
    })
  }

  const [channelConfDialog, setChannelConfDialog] = useState(true)
  //   if (isLoading.dm || isLoading.room)
  //     return (
  //       <div className="h-screen w-screen   bg-gradient-to-r from-10% to-80% from-backdrop to-mirage flex flex-col justify-center">
  //         <span className="loaderLobby mx-auto"></span>
  //       </div>
  //     )
  return (
    <div className="w-full animate__animated animate__fadeIn h-full flex gap-2">
      <HeadTitle>Pong Fury | Chat</HeadTitle>

      <div className="h-full w-96">
        <ChatBar
          DMList={DMList}
          channelList={channelList}
          selectedId={selected?.id ?? ""}
          clickOnDm={clickOnDm}
          clickOnChannel={clickOnChannel}
          handleOnChange={handleChange}
          createChannelEvent={roomCreated}
          isLoading={isLoading}
        />
      </div>
      <div className="flex-1 flex flex-col   h-full">
        <InnerChat
          blockedUsers={blockedUsers}
          isChannel={isChannel()}
          onInfoClick={() => setShowInfo((prev) => !prev)}
          channelData={selected}
        />
      </div>
      {isChannel() && showInfo && (
        <div className=" h-full w-96">
          <ChannelInfo
            onEdit={() => setChannelConfDialog(false)}
            selectedChannel={selected as Channel}
            onLeave={roomLeaved}
          />
          <Dialogue closed={channelConfDialog}>
            <ChannelSetting
              close={() => setChannelConfDialog(true)}
              channel={selected as Channel}
            />
          </Dialogue>
        </div>
      )}
      {!isChannel() && showInfo && (
        <div className=" h-full w-96">
          <FriendInfo
            dm={selected as DirectMessage}
            takeAction={{
              block: onBlock,
              unblock: unBlock,
              mute: onMute,
              unmute: unmute,
            }}
          />
        </div>
      )}

      <Dialogue
        onBackDropClick={() => setDialogueState(true)}
        closed={dialogueState}
      >
        <JoinChannelDialBox
          channelInfo={channelTryingToJoin as Channel}
          onJoin={roomJoined}
        />
      </Dialogue>

      {/* channel settings */}
    </div>
  )
}

Page.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>
}

export default Page
