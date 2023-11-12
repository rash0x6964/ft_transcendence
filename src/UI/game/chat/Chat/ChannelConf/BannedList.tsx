import { WebSocketContext } from "@/UI/WebSocketContextWrapper"
import Avatar from "@/components/BaseComponents/Avatar"
import Cross from "@/components/svgs/CloseBox"
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

    ChannelUserService.free(data).then((res) => {
      setBannedList(bannedList.filter((x) => x.userID != id))
      socket?.emit('getUnbanned', {
          token: cookieService.getJwtCookie(),
          data: res.data,
        })
    }).catch((err) => {
      // console.log(err)
    })
  }

  return (
    <div className="">
      <div className="flex flex-col ">
        <div className="h-14 w-fill flex pl-8 pr-16 text-sm text-slate-600">
          <div className="flex justify-around">
            <span className="self-center pl-10 pr-52">Member</span>
            <span className="self-center pr-24">Join Date</span>
            <span className="self-center pr-20">Member Since</span>
            <span className="self-center">Unblock</span>
          </div>
        </div>
        <div className="flex flex-col gap-3 bg-secondary rounded-xl gradient-border-2 px-5 pb-5 pt-5">
          {bannedList.map((item, index) => {
            // if (index > 2)
            const to_year =
              new Date(Date.now()).getFullYear() -
              new Date(item.joinedAt).getFullYear()

            return (
              <div className="h-14 w-fill bg-secondary drop-shadow-lg rounded-lg flex pl-7 pr-16 text-sm ">
                <div className="flex  justify-around flex-1">
                  {/* Member */}
                  <div className="self-center flex gap-3">
                    <Avatar
                      key={item.userID}
                      className="w-8 h-8"
                      src={item.user?.avatarUrl}
                      alt={item.user?.userName}
                    />
                    <span className="self-center">{item.user?.userName}</span>
                  </div>

                  {/* Join Date */}
                  <div className="self-center flex gap-3">
                    <span className="self-center">
                      {`${new Date(item.joinedAt).getFullYear()}/${new Date(
                        item.joinedAt
                      ).getMonth()}/${new Date(item.joinedAt).getDay()}`}
                    </span>
                  </div>

                  {/* Member Since */}
                  <div className="self-center flex gap-3">
                    <span>{to_year} Years ago</span>
                  </div>

                  {/* Unblock */}
                  <div className="self-center flex gap-3">
                    {/* <button className="p-3"> */}
                    <button className="p-3 rounded-md bg-slate-800" onClick={() => {unblock && unblock(item.userID)}}>
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
    </div>
  )
}
