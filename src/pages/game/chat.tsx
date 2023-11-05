import Layout from "@/UI/Layout"
import Chat from "@/UI/game/chat/Chat"
import ChannelInfo from "@/UI/game/chat/Chat/ChannelInfo/ChannelInfo"
import ChatBar from "@/UI/game/chat/ChatBar/ChatBar"
import FriendInfo from "@/UI/game/chat/FriendInfo/FriendInfo"
import HeadTitle from "@/components/BaseComponents/HeadTitle"
import Dialogue from "@/components/Dialogue/Dialogue"
import { Channel } from "@/models/Channel.model"
import DirectMessage from "@/models/DM.model"
import ChannelService from "@/services/Channel.sevice"
import { ReactElement, useEffect, useState } from "react"
import { NextPageWithLayout } from "../_app"
import { useRouter } from "next/router"
import DMService from "@/services/DMService"
import JoinChannelDialBox from "@/UI/game/chat/ChatBar/DialogueBoxes/JoinChannelDialBox"
import ChannelSevice from "@/services/Channel.sevice"

const Page: NextPageWithLayout = () => {
  const [channelList, setChannelList] = useState<Channel[]>([])
  const [DMList, setDMList] = useState<DirectMessage[]>([])
  const [selected, setSelected] = useState<DirectMessage | Channel>()
  const [dialogueState, setDialogueState] = useState(true)
  const [refresh, setRefresh] = useState(true)
  // const [isSearch, setIsSearch] = useState(false)
  const router = useRouter()

  const [channelTryingToJoin, setChannelTryingToJoin] = useState<
    Channel | undefined
  >(undefined)

  const [isLoading, setIsLoading] = useState<{ dm: boolean; room: boolean }>({
    dm: false,
    room: false,
  })
  // const [searching, setSearching] = useState(false);
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
    // setIsLoading({ dm: false, room: true })
    if (searchFor == "") {
      timeout = setTimeout(() => {
        DMService.getDMList()
          .then(({ data }: { data: DirectMessage[] }) => {
            setDMList(data)
            if (router.query?.type == "DM")
              setSelected(data.find((x) => x.id == router.query?.id))
            else if (data.length > 0) setSelected(data[0])
            // setIsLoading({ ...isLoading, dm: false })
          })
          .catch((err) => {
            // setIsLoading({ ...isLoading, dm: false })
            //error
          })

        ChannelService.getChannelList()
          .then(({ data }: { data: Channel[] }) => {
            setChannelList(data)
            if (router.query?.type == "channel")
              setSelected(data.find((x) => x.id == router.query?.id))
            else if (data.length > 0 && selected != undefined)
              setSelected(data[0])
            // setIsLoading({ ...isLoading, room: false })
          })
          .catch((err) => {
            // setIsLoading({ ...isLoading, room: false })
            //error
          })
      }, 300)
      // setIsLoading({ dm: true, room: true })
    } else {
      setDMList(
        DMList?.filter((item) => item.friend?.userName.startsWith(searchFor))
      )
      timeout = setTimeout(() => {
        ChannelSevice.getChannelByName(searchFor)
          .then((res) => {
            setChannelList(res.data)
            // setIsLoading({ dm: false, room: false })
          })
          .catch((err) => {
            // setIsLoading({ dm: false, room: false })
          })
      }, 1000)
    }

    return () => {
      clearTimeout(timeout)
    }
  }, [searchFor])

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
    setChannelList(channelList.concat(data))
    setSelected(data)
  }

  const roomJoined = (data: Channel) => {
    setChannelList(channelList.concat(data))
    setSelected(data)
    setDialogueState(true)
  }

  const roomLeaved = (channel_id: string) => {
    setChannelList(channelList.filter((item) => item.id != channel_id))
    setRefresh((prevState) => !prevState)
  }

  // search
  const handleChange = (val: string) => {
    setSearchFor(val)
    // setSearching((searching) => !searching);
  }

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
          <ChannelInfo
            selectedChannel={selected as Channel}
            event={roomLeaved}
          />
        )}
        {!isChannel() && (
          <FriendInfo friend={(selected as DirectMessage)?.friend} />
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
    </div>
  )
}

Page.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>
}

export default Page
