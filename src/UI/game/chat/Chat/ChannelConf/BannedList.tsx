import { WebSocketContext } from "@/UI/WebSocketContextWrapper"
import Avatar from "@/components/BaseComponents/Avatar"
import UnblockAtList from "@/components/svgs/UnblockAtList"
import { ChannelUser } from "@/models/Channel.model"
import ChannelUserService from "@/services/ChannelUser.service"
import React, { useContext, useEffect, useState } from "react"
import cookieService from "@/services/CookiesService"

export default function BannedList({ channelId }: { channelId: string }) {
  const [bannedList, setBannedList] = useState<ChannelUser[]>([])
  const socket = useContext(WebSocketContext)

  useEffect(() => {
    ChannelUserService.getChannelBlockedMember(channelId)
      .then((res) => {
        setBannedList(res.data)
      })
      .catch((err) => {
        // console.log('err', err)
      })
  }, [])

  const unblock = (id: string) => {
    let data: any = {
      userID: id,
      channelID: channelId,
      status: "FREE",
    }

    ChannelUserService.free(data)
      .then((res) => {
        setBannedList(bannedList.filter((x) => x.userID != id))
        socket?.emit("getUnbanned", {
          token: cookieService.getJwtCookie(),
          data: res.data,
        })
      })
      .catch((err) => {
        // console.log(err)
      })
  }

  return (
    <div className="">
      <div className="flex flex-col gap-3 bg-secondary rounded-xl gradient-border-2 px-5 pb-5 pt-5">
        <p>Banned members</p>
        <br />
        {bannedList.length > 0 ? (
          <div className=" grid grid-cols-6 w-fill pl-7 pr-16 text-sm text-slate-600">
            <span className="col-span-3 pr-60">Member</span>
            <span className=" col-span-1">Join Date</span>
            <span className="col-span-1">Member Since</span>
            {/* <span className="self-center">Unblock</span> */}
          </div>
        ) : (
          <p className="text-center opacity-25">No one banned</p>
        )}

        {bannedList.map((item, index) => {
          // if (index > 2)
          const to_year =
            new Date(Date.now()).getFullYear() -
            new Date(item.joinedAt).getFullYear()

          return (
            <div key={item.userID} className="h-14 w-fill bg-secondary   rounded-lg flex pl-7 pr-16 text-sm ">
              <div className="grid grid-cols-6  flex-1">
                {/* Member */}
                <div className="self-center col-span-3 flex gap-3">
                  <Avatar
                    key={item.userID}
                    className="w-8 h-8"
                    src={item.user?.avatarUrl}
                    alt={item.user?.userName}
                  />
                  <span className="self-center">{item.user?.userName}</span>
                </div>

                {/* Join Date */}
                <div className="self-center col-span-1 flex gap-3">
                  <span className="self-center">
                    {`${new Date(item.joinedAt).getFullYear()}/${new Date(
                      item.joinedAt
                    ).getMonth()}/${new Date(item.joinedAt).getDay()}`}
                  </span>
                </div>

                {/* Member Since */}
                <div className="self-center col-span-1 flex gap-3">
                  <span>{to_year} Years ago</span>
                </div>

                {/* Unblock */}
                <div className="self-center col-span-1 flex gap-3">
                  {/* <button className="p-3"> */}
                  <button
                    className="p-3 self-end ml-auto rounded-md bg-slate-800"
                    onClick={() => {
                      unblock && unblock(item.userID)
                    }}
                  >
                    <UnblockAtList key={item.userID} width={16} height={16} />
                  </button>
                  {/* </button> */}
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
