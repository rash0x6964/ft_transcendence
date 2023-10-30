"use client";
import React, { useEffect, useRef, useState } from "react";
import Avatar from "@/components/BaseComponents/Avatar";
import MemberCard from "./MemberCard";
import ContextMenu, {
  useContextMenu,
} from "@/components/BaseComponents/ContextMenu";
import { MouseEvent } from "react";
import { MenuBtn } from "@/components/BaseComponents/ContextMenu";
import { getMenuPos } from "@/components/BaseComponents/ContextMenu";
import { ChannelUser } from "@/models/Channel.model";
import ChannelUserService from "@/services/ChannelUser.service";
import { time } from "console";

type Props = {
  channelID: string;
};

export default function ChannelInfo({ channelID }: Props) {
  const menuRef = useRef<HTMLDivElement>(null);
  const [clicked, setClicked, position, setPosition] = useContextMenu(menuRef);
  const [channelInfo, setChannelInfo] = useState<ChannelUser[]>([]);

  const handleContextMenu = (
    e: MouseEvent<HTMLDivElement>,
    PlayerName: string
  ) => {
    setClicked(true);
    setPosition(getMenuPos(e, menuRef));
  };

  useEffect(() => {
    ChannelUserService.getChannelMemberUser(channelID)
      .then((response: any) => {
        setChannelInfo(response.data);
      })
      .catch((err) => {
      });
  }, [channelID]);

  let memberList: ChannelUser[] = channelInfo.filter((item) => {
    return item.role == "MEMBER";
  });
  let adminList: ChannelUser[] = channelInfo.filter((item) => {
    return item.role == "ADMINISTRATOR";
  });
  let owner: ChannelUser | undefined = channelInfo.find((item) => {
    return item.role == "OWNER";
  });

  return (
    <div className="gradient-border-2 shadow-lg pt-16 rounded-xl  h-full flex flex-col gap-10">
      <div className="flex flex-col gap-10">
        <Avatar
          src={owner?.channel?.imageUrl}
          className="w-40 h-40 mx-auto"
        />
        <span className="self-center">{owner?.channel?.name}</span>
      </div>
      <div className="flex flex-1 flex-col gap-5 px-3 overflow-y-auto max-h-full">
        <span>Owner - 👑</span>
        <MemberCard
          onContextMenu={handleContextMenu}
          playerAvatar={owner?.user?.avatarUrl ?? ""}
          playerName={owner?.user?.userName ?? "Unknown"}
          playerState={owner?.status ?? "idle"}
        />
        <span>Admins - {adminList.length}</span>
        {adminList.map((item) => {
          return (
            <MemberCard
              key={item.userID}
              onContextMenu={handleContextMenu}
              playerAvatar={item.user?.avatarUrl ?? ""}
              playerName={item.user?.userName ?? "Unknown"}
              playerState={item.status}
            />
          );
        })}
        <span>Member - {memberList.length}</span>
        {memberList.map((item) => {
          return (
            <MemberCard
              key={item.userID}
              onContextMenu={handleContextMenu}
              playerAvatar={item.user?.avatarUrl ?? ""}
              playerName={item.user?.userName ?? "Unknown"}
              playerState={item.status}
            />
          );
        })}
      </div>
      <ContextMenu MenuRef={menuRef} clicked={clicked} pos={position}>
        <MenuBtn onClick={() => console.log('profile')} title="Profile" />
        <MenuBtn title="Kick" />
        <MenuBtn title="Mute" />
        <MenuBtn title="Ban" />
      </ContextMenu>
    </div>
  );
}
