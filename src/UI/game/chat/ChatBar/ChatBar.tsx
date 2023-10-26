"use client";
import { useState } from "react";
import ChannelSeparator from "./ChannelSeparator";
import ChannelsList from "./ChannelsList";
import FriendsList from "./FriendsList";
import TopBar from "./TopBar";

type Props = {
  onChannelSelected: (data: string | number) => void;
  onDirMsgSelected: (data: string | number) => void;
};

export default function ChatBar({
  onChannelSelected,
  onDirMsgSelected,
}: Props) {
  const [selectedId, setSelectedId] = useState("");
  const clickOnChannel = (id: string) => {
    setSelectedId(id);
    onChannelSelected(id);
  };
  const clickOnDm = (id: string) => {
    setSelectedId(id);
    onDirMsgSelected(id);
  };

  return (
    <div className="flex flex-col h-full">
      <TopBar />
      <FriendsList selectedId={selectedId} handleClick={clickOnDm} />
      <ChannelSeparator />
      <ChannelsList selectedId={selectedId} handleClick={clickOnChannel} />
    </div>
  );
}
