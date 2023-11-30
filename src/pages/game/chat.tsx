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
import FriendRequestService from "@/services/FriendRequest.service"
import FriendService from "@/services/Friend.service"
import Input from "@/components/BaseComponents/Input"
import Search from "@/components/svgs/Search"
import SearchChat from "@/UI/game/chat/Search/SearchChat"
import CreateChannelDialBox from "@/UI/game/chat/ChatBar/DialogueBoxes/CreateChannelDialBox"

const Page: NextPageWithLayout = () => {
  const socket = useContext(WebSocketContext)
  const router = useRouter()
  const [createChannelDial, setCreateChannelDial] = useState(true)

  const [channelList, setChannelList] = useState<Channel[]>([])
  const [DMList, setDMList] = useState<DirectMessage[]>([])
  const [tempChannelList, setTempChannelList] = useState<Channel[]>([])
  const [tempDMList, setTempDMList] = useState<DirectMessage[]>([])
  const [selected, setSelected] = useState<DirectMessage | Channel>()
  const [dialogueState, setDialogueState] = useState(true)
  const [refreshSelection, setRefreshSelection] = useState(true)
  const [_refresh, set_Refresh] = useState(true)
  const [showInfo, setShowInfo] = useState(true)
  const [channelTryingToJoin, setChannelTryingToJoin] = useState<
    Channel | undefined
  >(undefined)
  const [searchFor, setSearchFor] = useState("")
  const [isLoading, setIsLoading] = useState({
    dm: false,
    room: false,
  })

  const [isMounted, setIsMounted] = useState({
    dm: false,
    room: false,
  })
  const [channelConfDialog, setChannelConfDialog] = useState(true)
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

  const isChannel = () => {
    return (selected as Channel)?.visibility != undefined
  }

  useEffect(() => {
    if (searchFor === "") {
      setChannelList((prev) => {
        if (prev.length) setSelected(prev[0])
        return prev
      })
      setDMList((prev) => {
        if (prev.length) setSelected(prev[0])
        return prev
      })
    } else if (searchFor !== "") {
      setTempChannelList((prev) => {
        if (prev.length) setSelected(prev[0])
        return prev
      })
      setTempDMList((prev) => {
        if (prev.length) setSelected(prev[0])
        return prev
      })
    }
  }, [refreshSelection])

  useEffect(() => {
    setDMList(tempDMList)
    setChannelList(tempChannelList)
  }, [_refresh])

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
    setIsLoading({ dm: true, room: true })

    DMService.getDMList()
      .then(({ data }: { data: DirectMessage[] }) => {
        initBlockedUser(data)
        setTempDMList(data)
        setDMList(data)

        setIsMounted((obj) => {
          return { ...obj, dm: true }
        })

        setIsLoading((obj) => {
          return { ...obj, dm: false }
        })

        if (router.query?.type == "DM")
          setSelected(data.find((x) => x.id == router.query?.id))
        else if (data.length > 0) setSelected(data[0])
      })
      .catch((err) => {
        setIsMounted((obj) => {
          return { ...obj, dm: true }
        })
        setIsLoading((obj) => {
          return { ...obj, dm: false }
        })
        //error
      })

    ChannelService.getChannelList()
      .then(({ data }: { data: Channel[] }) => {
        setTempChannelList(data)
        setChannelList(data)

        setIsMounted((obj) => {
          return { ...obj, room: true }
        })
        setIsLoading((obj) => {
          return { ...obj, room: false }
        })

        if (router.query?.type == "channel")
          setSelected(data.find((x) => x.id == router.query?.id))
        else if (data.length > 0 && selected === undefined) setSelected(data[0])
      })
      .catch((err) => {
        setIsMounted((obj) => {
          return { ...obj, dm: true }
        })
        setIsLoading((obj) => {
          return { ...obj, room: false }
        })
        //error
      })
  }, [])

  useEffect(() => {
    let timeout: any

    if (searchFor != "") {
      setIsLoading({ dm: true, room: true })
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
    } else {
      setIsLoading({ dm: false, room: false })
      setDMList(tempDMList)
      setChannelList(tempChannelList)
    }

    return () => {
      clearTimeout(timeout)
    }
  }, [searchFor])

  useEffect(() => {
    const _updateSelectedChannel = (data: any) => {
      setTempChannelList((prevChannelList) => {
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
      set_Refresh((prev) => !prev)
    }

    const _deleteChannelEvent = (data: any) => {
      setTempChannelList((prevChannelList) => {
        return prevChannelList.filter((item) => {
          return item.id != data.id
        })
      })
      set_Refresh((prev) => !prev)
      setRefreshSelection((prevState) => !prevState)
      setChannelConfDialog(true)
    }

    const _ubannedFromChannel = (data: any) => {
      data.channel["isMember"] = true
      data.channel["role"] = data.role

      setTempChannelList((prevChannelList) => {
        return prevChannelList.concat(data.channel)
      })
      set_Refresh((prev) => !prev)
    }

    const _outOfChannel = (data: any) => {
      setTempChannelList((prevChannelList) => {
        return prevChannelList.filter((item) => {
          return item.id != data.channelID
        })
      })
      setSearchFor((text) => {
        if (text.length <= 0) set_Refresh((prev) => !prev)
        return text
      })
      setRefreshSelection((prev) => !prev)
    }

    const _getMuted = (data: ChannelUser) => {
      setTempChannelList((prevChannelList) => {
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
      set_Refresh((prev) => !prev)
    }

    const _connect = (userId: string) => {
      setTempDMList((users) => {
        return users.map((user) => {
          if (user.friend?.id == userId) user.friend.onlineStatus = true
          return user
        })
      })
      set_Refresh((prev) => !prev)
    }

    const _disconnect = (userId: string) => {
      setTempDMList((users) => {
        return users.map((user) => {
          if (user.friend?.id == userId) user.friend.onlineStatus = false
          return user
        })
      })
      set_Refresh((prev) => !prev)
    }

    const _directMessage = (data: DirectMessage) => {
      if (tempDMList.map((x) => x.friend?.id).includes(data.friend?.id)) return
      setTempDMList((prevState) => prevState.concat(data))
      set_Refresh((prev) => !prev)
      setSelected(data)
    }

    const privateMsg = (data: Message) => {
      setTempDMList((prevDmList) => {
        return prevDmList.map((DM) => {
          if (DM.id == data.directmessageID) {
            DM["message"] = data
          }
          return DM
        })
      })
      set_Refresh((prev) => !prev)
    }

    const channelMsg = (data: Message) => {
      setTempChannelList((prevChannelList) => {
        return prevChannelList.map((channel) => {
          if (channel.id == data.channelID) {
            channel["message"] = [data]
          }
          return channel
        })
      })
      set_Refresh((prev) => !prev)
    }

    const _blocked_unblocked_DM = (data: DirectMessage) => {
      setTempDMList((prevDmList) => {
        return prevDmList.map((dm) => {
          if (dm.id == data.id) {
            dm.blockStatus = data.blockStatus
            setSelected(dm)
          }
          return dm
        })
      })
      set_Refresh((prev) => !prev)
    }

    const _unfriend = (data: DirectMessage) => {
      setTempDMList((prevDmList) => {
        return prevDmList.map((dm) => {
          if (dm.id === data.id) {
            dm.isFriend = false
            dm.pending = false
            setSelected(dm)
          }
          return dm
        })
      })
      set_Refresh((prev) => !prev)
    }

    socket?.on("channelUpdated", _updateSelectedChannel)
    socket?.on("roomRemoved", _deleteChannelEvent)
    socket?.on("YouGotUnbanned", _ubannedFromChannel)
    socket?.on("YouGotBanned", _outOfChannel)
    socket?.on("YouGotKicked", _outOfChannel)
    socket?.on("YouGotMuted", _getMuted)
    socket?.on("disconnected", _disconnect)
    socket?.on("connected", _connect)
    socket?.on("directMessage", _directMessage)
    socket?.on("channelMessage", channelMsg)

    socket?.on("privateMessage", privateMsg)

    socket?.on("youGotBlocked_DM", _blocked_unblocked_DM)
    socket?.on("youGotUnblocked_DM", _blocked_unblocked_DM)

    socket?.on("unfriend", _unfriend)

    return () => {
      socket?.off("channelUpdated", _updateSelectedChannel)
      socket?.off("roomRemoved", _deleteChannelEvent)
      socket?.off("YouGotUnbanned", _ubannedFromChannel)
      socket?.off("YouGotBanned", _outOfChannel)
      socket?.off("YouGotKicked", _outOfChannel)
      socket?.off("YouGotMuted", _getMuted)
      socket?.off("disconnected", _disconnect)
      socket?.off("connected", _connect)
      socket?.off("directMessage", _directMessage)
      socket?.off("channelMessage", channelMsg)

      socket?.off("privateMessage", privateMsg)

      socket?.off("youGotBlocked_DM", _blocked_unblocked_DM)
      socket?.off("youGotUnblocked_DM", _blocked_unblocked_DM)

      socket?.off("unfriend", _unfriend)
    }
  }, [selected])

  const clickOnChannel = (data: Channel) => {
    const obj = tempChannelList.find((item) => item.id == data.id)
    if (obj) {
      setSelected(obj)
    } else {
      setChannelTryingToJoin(data)
      setDialogueState(false)
    }
  }

  const clickOnDm = (id: string) => {
    const obj = DMList.find((item) => item.id == id)
    setSelected(obj)
  }

  const roomCreated = (data: Channel) => {
    setTempChannelList((prevChannelList) => prevChannelList.concat(data))
    set_Refresh((prev) => !prev)
    setSelected(data)
  }

  const roomJoined = (data: Channel) => {
    setTempChannelList((prevChannelList) => prevChannelList.concat(data))
    setSelected(data)
    if (searchFor === "") set_Refresh((prev) => !prev)
    setDialogueState(true)
  }

  const roomLeaved = (channel_id: string) => {
    setTempChannelList((prevChannelList) =>
      prevChannelList.filter((item) => item.id != channel_id)
    )
    if (searchFor === "") set_Refresh((prev) => !prev)
    setRefreshSelection((prev) => !prev)
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

  const addFriend = () => {
    FriendRequestService.sendRequest(
      (selected as DirectMessage).friend?.id ?? ""
    )
      .then((res) => {
        setTempDMList((prevDmList) => {
          return prevDmList.map((dm) => {
            if (dm.id === (selected as DirectMessage).id) {
              dm.isFriend = false
              dm.pending = true
              setSelected(dm)
            }
            return dm
          })
        })
        set_Refresh((prev) => !prev)
        socket?.emit("friendReqAction", {
          data: selected as DirectMessage,
        })
      })
      .catch((err) => {})
  }

  const unfriend = () => {
    FriendService.removeFriend({
      senderID: (selected as DirectMessage).senderID,
      receiverID: (selected as DirectMessage).receiverID,
    })
      .then((res) => {
        socket?.emit("unfriend", { data: selected as DirectMessage })
        socket?.emit("friendAction", { data: selected as DirectMessage })
      })
      .catch((err) => {})
  }

  const cancleReq = () => {
    FriendRequestService.deleteRequest({
      senderID: (selected as DirectMessage).senderID,
      receiverID: (selected as DirectMessage).receiverID,
    })
      .then((res) => {
        setSelected((obj) => {
          return { ...(obj as DirectMessage), pending: false, isFriend: false }
        })
      })
      .catch((err) => {})
  }

  const mounted = () => {
    return isMounted.dm && isMounted.room
  }

  const showSearch = () => {
    return (
      !(DMList.length > 0 || channelList.length > 0 || searchFor.length > 0) &&
      mounted()
    )
  }

  const showChat = () => {
    return (
      (DMList.length > 0 || channelList.length > 0 || searchFor.length > 0) &&
      mounted()
    )
  }

  //   if (isLoading.dm || isLoading.room)
  //     return (
  //       <div className="h-screen w-screen   bg-gradient-to-r from-10% to-80% from-backdrop to-mirage flex flex-col justify-center">
  //         <span className="loaderLobby mx-auto"></span>
  //       </div>
  //     )

  return (
    <>
      <div className="w-full h-full ">
        <HeadTitle>Pong Fury | Chat</HeadTitle>
        {!mounted() && (
          <div className="w-full h-full flex flex-col justify-center  animate__animated animate__fadeIn">
            <span className="loaderLobby mx-auto"></span>
          </div>
        )}
        {showSearch() && (
          <SearchChat
            onCreateChannel={() => setCreateChannelDial(false)}
            clickOnChannel={clickOnChannel}
          />
        )}
        {showChat() && (
          <div className="w-full h-full flex gap-2  animate__animated animate__fadeIn">
            <div className="h-full w-96">
              <ChatBar
                DMList={DMList}
                channelList={channelList}
                selectedId={selected?.id ?? ""}
                clickOnDm={clickOnDm}
                clickOnChannel={clickOnChannel}
                handleOnChange={handleChange}
                onCreateChannel={() => setCreateChannelDial(false)}
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
                    addFriend: addFriend,
                    removFriend: unfriend,
                    cancleReq: cancleReq,
                  }}
                />
              </div>
            )}
          </div>
        )}

        {/* channel settings */}
      </div>
      <Dialogue closed={channelConfDialog}>
        <ChannelSetting
          close={() => setChannelConfDialog(true)}
          channel={selected as Channel}
        />
      </Dialogue>
      <Dialogue
        onBackDropClick={() => setDialogueState(true)}
        closed={dialogueState}
      >
        <JoinChannelDialBox
          channelInfo={channelTryingToJoin as Channel}
          onJoin={roomJoined}
        />
      </Dialogue>

      <Dialogue
        onBackDropClick={() => setCreateChannelDial(true)}
        closed={createChannelDial}
      >
        <CreateChannelDialBox
          handler={() => setCreateChannelDial(true)}
          createChannelEvent={roomCreated}
        />
      </Dialogue>
    </>
  )
}

Page.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>
}

export default Page
