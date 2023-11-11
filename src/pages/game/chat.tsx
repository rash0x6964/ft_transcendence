import Layout from "@/UI/Layout"
import Chat from "@/UI/game/chat/Chat"
import ChannelInfo from "@/UI/game/chat/Chat/ChannelInfo/ChannelInfo"
import ChatBar from "@/UI/game/chat/ChatBar/ChatBar"
import FriendInfo from "@/UI/game/chat/FriendInfo/FriendInfo"
import HeadTitle from "@/components/BaseComponents/HeadTitle"
import Dialogue from "@/components/Dialogue/Dialogue"
import { Channel } from "@/models/Channel.model"
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

const Page: NextPageWithLayout = () => {
  const socket = useContext(WebSocketContext)
  const [channelList, setChannelList] = useState<Channel[]>([])
  const [DMList, setDMList] = useState<DirectMessage[]>([])
  const [selected, setSelected] = useState<DirectMessage | Channel>()
  const [dialogueState, setDialogueState] = useState(true)
  const [refresh, setRefresh] = useState(true)
  const router = useRouter()

  const [channelTryingToJoin, setChannelTryingToJoin] = useState<
    Channel | undefined
  >(undefined)

  const [isLoading, setIsLoading] = useState<{ dm: boolean; room: boolean }>({
    dm: false,
    room: false,
  })
  const [searchFor, setSearchFor] = useState("")

  const isChannel = () => {
    return (selected as Channel)?.visibility != undefined
  }

  useEffect(() => {
    if (channelList.length) setSelected(channelList[0])
    else if (DMList.length) setSelected(DMList[0])
  }, [refresh])

  useEffect(() => {
    let timeout: any
    setIsLoading({ dm: true, room: true })
    if (searchFor == "") {
      timeout = setTimeout(() => {
        DMService.getDMList()
          .then(({ data }: { data: DirectMessage[] }) => {
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

      data.channel['isMemeber'] = true;
      data.channel['owner'] = data.role;

      setChannelList((prevChannelList) => {
        return prevChannelList.concat(data.channel)
      })
    }

    const _bannedFromChannel = (data: any) => {
      setChannelList((prevChannelList) => {
        return prevChannelList.filter((item) => {
          return item.id != data.channelID
        })
      })
    }

    socket?.on("channelUpdated", _updateSelectedChannel)
    socket?.on("roomRemoved", _deleteChannelEvent)
    socket?.on("youGetUnbanned", _ubannedFromChannel)
    socket?.on("youGetBanned", _bannedFromChannel)

    return () => {
      socket?.off("channelUpdated", _updateSelectedChannel)
      socket?.off("roomRemoved", _deleteChannelEvent)
      socket?.off("youGetUnbanned", _ubannedFromChannel)
      socket?.off("youGetBanned", _bannedFromChannel)
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
    setSearchFor("")
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

  return (
    <div className="w-full  h-full flex gap-2">
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
        <Chat channelData={selected} />
      </div>
      <div className=" h-full w-96">
        {isChannel() && (
          <>
            <ChannelInfo
              onEdit={() => setChannelConfDialog(false)}
              selectedChannel={selected as Channel}
              event={roomLeaved}
            />
            <Dialogue closed={channelConfDialog}>
              <ChannelSetting
                close={() => setChannelConfDialog(true)}
                channel={selected as Channel}
              />
            </Dialogue>
          </>
        )}
        {!isChannel() && (
          <FriendInfo
            dm={selected as DirectMessage}
            takeAction={{
              block: onBlock,
              unblock: unBlock,
              mute: onMute,
              unmute: unmute,
            }}
          />
        )}
      </div>

      <Dialogue
        onBackDropClick={() => setDialogueState(true)}
        closed={dialogueState}
      >
        <JoinChannelDialBox
          channelInfo={channelTryingToJoin as Channel}
          event={roomJoined}
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
