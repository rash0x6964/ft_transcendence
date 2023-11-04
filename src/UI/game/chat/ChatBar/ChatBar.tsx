"use client";
import { useEffect, useState } from "react";
import ChannelSeparator from "./ChannelSeparator";
import ChannelsList from "./ChannelsList";
import FriendsList from "./FriendsList";
import TopBar from "./TopBar";
import DirectMessage from "@/models/DM.model";
import { Channel } from "@/models/Channel.model";
import ChannelSevice from "@/services/Channel.sevice";
import Loader from "@/components/BaseComponents/Loader";

type Props = {
  selectedId: string;
  DMList?: DirectMessage[];
  channelList?: Channel[];
  clickOnDm: (id: string) => void;
  clickOnChannel: (data: Channel) => void;
  createChannelEvent: (data: Channel) => void;
  handleOnChange: (val: string) => void;
  isLoading: {dm: boolean, room:boolean};
};

export default function ChatBar({
  DMList,
  channelList,
  selectedId,
  clickOnDm,
  clickOnChannel,
  createChannelEvent,
  handleOnChange,
  isLoading,
}: Props) {
  // const [DMListSearched, setDMListSearched] = useState<any>([]);
  // const [ChannelListSearched, setChannelSearched] = useState<any>([]);
  // const [val, setVal] = useState("");
  // const [isLoading, setIsLoading] = useState(false);

  // useEffect(() => {
  //   if (val == "") {
  //     setIsLoading(false);
  //     // setChannelSearched(channelList)
  //     return;
  //   }
  //   setIsLoading(true);
  //   // const timeout = setTimeout(() => {
  //   //   ChannelSevice.getChannelByName(val)
  //   //     .then((res) => {
  //   //       setChannelSearched(res.data);
  //   //       setIsLoading(false);
  //   //     })
  //   //     .catch((err) => {});
  //   // }, 200);

  //   // return () => {
  //   //   clearTimeout(timeout);
  //   // };
  // }, [val]);

  // useEffect(() => {
  //   setDMListSearched(DMList);
  //   setChannelSearched(channelList);
  // }, [DMList, channelList]);

  // const handleChange = (val: string) => {
  //   setDMListSearched(
  //     DMList?.filter((item) => item.friend?.userName.startsWith(val))
  //   );

  //   setVal(val)
  // };

  return (
    <div className="flex flex-col h-full">
      <TopBar DMList={DMList} onChange={handleOnChange} createChannelEvent={createChannelEvent}/>
      <FriendsList
        selectedId={selectedId}
        handleClick={clickOnDm}
        DMList={DMList}
      />
      <ChannelSeparator />
			{isLoading.room && <Loader className="mx-auto scale-50" />}
      {!isLoading.room && <ChannelsList
        selectedId={selectedId}
        handleClick={clickOnChannel}
        channelList={channelList}
      />}
    </div>
  );
}
