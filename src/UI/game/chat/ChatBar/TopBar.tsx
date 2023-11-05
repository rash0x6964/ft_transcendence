import Input from "@/components/BaseComponents/Input"
import Search from "@/components/svgs/Search"
import CreateChanelIcn from "@/components/svgs/CreateChanelIcn"
import { SetStateAction, useState } from "react"
import Dialogue from "@/components/Dialogue/Dialogue"
import CreateChannelDialBox from "./DialogueBoxes/CreateChannelDialBox"
import DirectMessage from "@/models/DirectMessage.model"
import { Channel } from "@/models/Channel.model"

type Props = {
  DMList?: DirectMessage[]
  onChange?: (val: string) => void
  createChannelEvent: (data: Channel) => void
}

export default function TopBar({
  DMList,
  onChange,
  createChannelEvent,
}: Props) {
  const [search, setSearch] = useState("")

  const [dialogueState, setDialogueState] = useState(true)
  const createChannel = () => {
    setDialogueState(false)
  }

  const saveChannel = () => {
    setDialogueState(true)
  }

  return (
    <div className="flex gap-2 mb-4">
      <Input
        placeholder="Search"
        icon={<Search />}
        className="w-80 h-14 bg-big-stone"
        onChange={(e: any) => {
          setSearch(e.target.value)
          onChange && onChange(e.target.value)
        }}
        value={search}
      />
      <div
        className="flex items-center justify-center bg-big-stone rounded-lg h-14 w-14"
        onClick={createChannel}
      >
        <CreateChanelIcn />
      </div>

      <Dialogue
        onBackDropClick={() => setDialogueState(true)}
        closed={dialogueState}
      >
        <CreateChannelDialBox
          handler={saveChannel}
          createChannelEvent={createChannelEvent}
        />
      </Dialogue>
    </div>
  )
}
