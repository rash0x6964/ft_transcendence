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
import { Channel, ChannelUser } from "@/models/Channel.model";
import ChannelUserService from "@/services/ChannelUser.service";
import { time } from "console";
import LeaveRoom from "@/components/svgs/leaveRoom";
import EditRoom from "@/components/svgs/editChannel";

type Props = {
  selectedChannel: Channel;
};

export default function ChannelInfo({ selectedChannel }: Props) {
  const isOwner = true;
  const menuRef = useRef<HTMLDivElement>(null);
  const [clicked, setClicked, position, setPosition] = useContextMenu(menuRef);

  const handleContextMenu = (
    e: MouseEvent<HTMLDivElement>,
    PlayerName: string
  ) => {
    setClicked(true);
    setPosition(getMenuPos(e, menuRef));
  };

  let memberList: ChannelUser[] = selectedChannel.channels.filter((item) => {
    return item.role == "MEMBER";
  });
  let adminList: ChannelUser[] = selectedChannel.channels.filter((item) => {
    return item.role == "ADMINISTRATOR";
  });
  let owner: ChannelUser | undefined = selectedChannel.channels.find((item) => {
    return item.role == "OWNER";
  });


  return (
    <div className="gradient-border-2 shadow-lg py-4 rounded-xl  h-full flex flex-col">
      {/* {!isOwner ? (
        <LeaveRoom className="w-6 h-6 self-end mr-4 hover:scale-110 transition-all" />
      ) : (
        <EditRoom className="w-8 h-8 self-end mr-4 hover:scale-110 transition-all" />
      )} */}
      <div className="flex flex-col gap-5 py-10">
        <Avatar src={selectedChannel.imageUrl} className="w-40 h-40 mx-auto" />
        <span className="self-center">{selectedChannel.name}</span>
      </div>
      <div className="flex flex-1 flex-col gap-5 px-3 overflow-y-auto max-h-full">
        <span className="text-gray-400 text-sm">Owner - 👑</span>
        <MemberCard
          onContextMenu={handleContextMenu}
          playerAvatar={owner?.user?.avatarUrl ?? ""}
          playerName={owner?.user?.userName ?? "Unknown"}
          playerState={owner?.status ?? "idle"}
        />
        {adminList.length ? (
          <span className="text-gray-400 text-sm">
            Admins - {adminList.length}
          </span>
        ) : (
          <></>
        )}
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
        {memberList.length ? (
          <span className="text-gray-400 text-sm">
            Member - {memberList.length}
          </span>
        ) : (
          <></>
        )}
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
        <MenuBtn onClick={() => console.log("profile")} title="Profile" />
        <MenuBtn title="Kick" />
        <MenuBtn title="Mute" />
        <MenuBtn title="Ban" />
      </ContextMenu>
    </div>
  );
}
