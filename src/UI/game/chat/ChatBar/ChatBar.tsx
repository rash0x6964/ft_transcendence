"use client";
import { useState } from "react";
import ChannelSeparator from "./ChannelSeparator";
import ChannelsList from "./ChannelsList";
import FriendsList from "./FriendsList";
import TopBar from "./TopBar";
import DirectMessage from "@/models/DM.model";
import { Channel } from "@/models/Channel.model";


type Props = {
  selectedId: string,
  DMList?: DirectMessage[];
  channelList?: Channel[];
  clickOnDm: (id: string) => void;
  clickOnChannel: (id: string) => void;
};

export default function ChatBar({
  DMList,
  channelList,
  selectedId,
  clickOnDm,
  clickOnChannel,
}: Props) {



  return (
    <div className="flex flex-col h-full">
      <TopBar />
      <FriendsList selectedId={selectedId} handleClick={clickOnDm} DMList={DMList}/>
      <ChannelSeparator />
      <ChannelsList selectedId={selectedId} handleClick={clickOnChannel} channelList={channelList}/>
    </div>
  );
}
