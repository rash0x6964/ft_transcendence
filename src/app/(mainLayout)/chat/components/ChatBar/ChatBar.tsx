"use client"
import { useState } from "react"
import ChannelSeparator from "./ChannelSeparator"
import ChannelsList from "./ChannelsList"
import FriendsList from "./FriendsList"
import TopBar from "./TopBar"

export default function ChatBar() {
  const [selectedId, setSelectedId] = useState(1)
  const handleClick = (id: number) => setSelectedId(id)
  return (
    <div className="flex flex-col h-full">
      <TopBar />
      <FriendsList selectedId={selectedId} handleClick={handleClick} />
      <ChannelSeparator />
      <ChannelsList selectedId={selectedId} handleClick={handleClick} />
    </div>
  )
}
