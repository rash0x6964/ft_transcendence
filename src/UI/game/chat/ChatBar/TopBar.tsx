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
  onCreateChannel: () => void
}

export default function TopBar({ DMList, onChange, onCreateChannel }: Props) {
  const [search, setSearch] = useState("")

  return (
    <>
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
        <button
          className="flex items-center  justify-center bg-big-stone hover:opacity-50 duration-500 rounded-lg h-14 w-14"
          onClick={onCreateChannel}
        >
          <CreateChanelIcn />
        </button>
      </div>
    </>
  )
}
